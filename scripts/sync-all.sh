#!/bin/bash
# =============================================================================
# テンプレート → 全顧客リポジトリ 一括同期スクリプト
#
# 使い方:
#   1. テンプレートリポジトリのルートで実行
#   2. customers.json に顧客リポ名を追加しておく
#
#   bash scripts/sync-all.sh
#
# 動作:
#   - 各顧客リポをクローン → テンプレートの最新コードをマージ → プッシュ
#   - public/config.js は顧客側を常に保持（上書きしない）
#   - プッシュにより各顧客リポの GitHub Actions が自動トリガー → ビルド＆デプロイ
# =============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TEMPLATE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
CUSTOMERS_FILE="$TEMPLATE_DIR/customers.json"
WORK_DIR=$(mktemp -d)
TEMPLATE_BRANCH="${1:-main}"

# 色付き出力
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()   { echo -e "${GREEN}[OK]${NC} $1"; }
warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[FAIL]${NC} $1"; }

# customers.json の存在チェック
if [ ! -f "$CUSTOMERS_FILE" ]; then
  error "customers.json が見つかりません: $CUSTOMERS_FILE"
  exit 1
fi

# jq の存在チェック
if ! command -v jq &> /dev/null; then
  error "jq が必要です。インストールしてください: https://jqlang.github.io/jq/download/"
  exit 1
fi

ORG=$(jq -r '.org' "$CUSTOMERS_FILE")
REPOS=$(jq -r '.repos[]' "$CUSTOMERS_FILE")

if [ -z "$REPOS" ]; then
  warn "customers.json に顧客リポジトリが登録されていません"
  exit 0
fi

echo "========================================"
echo " テンプレート同期"
echo " Organization: $ORG"
echo " ブランチ: $TEMPLATE_BRANCH"
echo "========================================"
echo ""

SUCCESS=0
FAILED=0
SKIPPED=0

for repo in $REPOS; do
  echo "--- $repo ---"
  REPO_DIR="$WORK_DIR/$repo"

  # 1. 顧客リポをクローン
  if ! git clone "https://github.com/$ORG/$repo.git" "$REPO_DIR" 2>/dev/null; then
    error "$repo: クローン失敗（リポジトリが存在しないか、アクセス権がありません）"
    FAILED=$((FAILED + 1))
    continue
  fi

  cd "$REPO_DIR"

  # 2. テンプレートをリモートとして追加
  git remote add template "$TEMPLATE_DIR"
  git fetch template "$TEMPLATE_BRANCH" 2>/dev/null

  # 3. config.js を保護（マージ前にバックアップ）
  CONFIG_BACKUP=""
  if [ -f "public/config.js" ]; then
    CONFIG_BACKUP=$(cat public/config.js)
  fi

  # 4. テンプレートのコードをマージ
  if ! git merge "template/$TEMPLATE_BRANCH" --no-edit -m "テンプレート同期: $(git -C "$TEMPLATE_DIR" log -1 --pretty=%s)" 2>/dev/null; then
    # コンフリクト発生時
    # config.js のコンフリクトなら顧客側を採用
    if git diff --name-only --diff-filter=U | grep -q "public/config.js"; then
      git checkout --ours public/config.js
      git add public/config.js
    fi

    # 他のコンフリクトがあれば中断
    if [ -n "$(git diff --name-only --diff-filter=U)" ]; then
      error "$repo: コンフリクトが解消できません。手動対応が必要です:"
      git diff --name-only --diff-filter=U
      git merge --abort
      FAILED=$((FAILED + 1))
      cd "$TEMPLATE_DIR"
      continue
    fi

    git commit --no-edit 2>/dev/null
  fi

  # 5. config.js を復元（マージで変更された場合）
  if [ -n "$CONFIG_BACKUP" ]; then
    CURRENT_CONFIG=$(cat public/config.js 2>/dev/null || echo "")
    if [ "$CURRENT_CONFIG" != "$CONFIG_BACKUP" ]; then
      echo "$CONFIG_BACKUP" > public/config.js
      git add public/config.js
      git commit -m "config.js を顧客設定に復元" 2>/dev/null
    fi
  fi

  # 6. 変更があればプッシュ
  if git diff --quiet origin/main..HEAD 2>/dev/null; then
    warn "$repo: 変更なし（スキップ）"
    SKIPPED=$((SKIPPED + 1))
  else
    if git push origin main 2>/dev/null; then
      log "$repo: 同期完了 → GitHub Actions が自動デプロイします"
      SUCCESS=$((SUCCESS + 1))
    else
      error "$repo: プッシュ失敗"
      FAILED=$((FAILED + 1))
    fi
  fi

  cd "$TEMPLATE_DIR"
done

# クリーンアップ
rm -rf "$WORK_DIR"

echo ""
echo "========================================"
echo " 結果: 成功=$SUCCESS  スキップ=$SKIPPED  失敗=$FAILED"
echo "========================================"

if [ $FAILED -gt 0 ]; then
  exit 1
fi
