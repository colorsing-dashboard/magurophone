# 新規顧客サイト作成手順

## ブランチ構成の前提

```
magurophone/ColorSing_LP
  ├─ main ブランチ  ← おおもと。sync-all.sh はここを参照して全顧客に配布する
  └─ magurophone ブランチ  ← magurophone自身のサイト用。開発・テストもここで行う
                              コード変更後は必ず main にも反映すること
```

**新機能・バグ修正の流れ:**
1. `magurophone` ブランチで開発・動作確認
2. `main` ブランチに反映（`public/customer/config.js` は除く）
3. `bash scripts/sync-all.sh` で全顧客に配布

---

## 事前準備

- GitHub Org `colorsing-dashboard` への管理者アクセス
- Fine-grained PAT（Contents: Read and write）を発行済み
- 顧客から受領: スプレッドシートID、ブランド名、画像、カラー希望

---

## 手順

### 1. 顧客リポジトリを作成

```
GitHub → colorsing-dashboard org → New repository
  リポジトリ名: {username}（例: customer-a）
  Public
  README: なし（空のリポジトリ）
```

### 2. テンプレートからクローンして初期設定

```bash
# テンプレートのルートで実行
REPO=customer-a  # ← 顧客のリポジトリ名に変更

WORK=$(mktemp -d)
git clone "https://github.com/colorsing-dashboard/$REPO.git" "$WORK/$REPO"

# テンプレートのファイルをコピー（public/customer/ は除く）
cp -r src "$WORK/$REPO/"
cp -r public/*.html public/*.js "$WORK/$REPO/public/" 2>/dev/null || true
cp package.json vite.config.js tailwind.config.js postcss.config.js index.html "$WORK/$REPO/" 2>/dev/null || true
cp .github/workflows/deploy.yml "$WORK/$REPO/.github/workflows/"

cd "$WORK/$REPO"
```

### 3. deploy.yml のブランチを main に変更

テンプレートの deploy.yml は `branches: [magurophone]` になっているので必ず変更する。

```bash
sed -i 's/branches: \[magurophone\]/branches: [main]/' .github/workflows/deploy.yml
```

### 4. 初回コミット＆プッシュ

```bash
git add .
git commit -m "feat: ColorSing LP 初期セットアップ"
git push origin main
```

### 5. GitHub Pages を有効化

```
GitHubリポジトリ → Settings → Pages
  → Source: 「GitHub Actions」を選択
```

その後、空コミットでActionsをトリガー（初回のみ）:

```bash
git commit --allow-empty -m "trigger pages" && git push
```

### 6. 管理画面で設定

デプロイが完了したら `https://colorsing-dashboard.github.io/{username}/admin.html` を開く。

| タブ | 設定内容 |
|------|---------|
| ブランディング | ブランド名・フッター・ページタイトル・ヘッダー画像URL |
| カラー | テーマカラー・rank1Card等 |
| Google Sheets | スプレッドシートID |
| ビュー管理 | 使用するビューの有効/無効 |
| 特典ティア | ティア構成・表示テンプレート |
| デプロイ | Owner: colorsing-dashboard / Repo: {username} / Branch: main / Token |

### 7. デプロイ実行

管理画面の「デプロイ実行」ボタンを押す → GitHub Actionsが自動ビルド＆デプロイ。

### 8. customers.json に追記

テンプレートリポジトリの `customers.json` に追記（sync-all.sh の同期対象に含めるため）:

```json
{
  "org": "colorsing-dashboard",
  "repos": ["magurophone", "customer-a"]
}
```

### 9. 顧客にURLを共有

```
https://colorsing-dashboard.github.io/{username}/
```

---

## チェックリスト

- [ ] colorsing-dashboard org にリポジトリ作成
- [ ] テンプレートのコードをコピー
- [ ] deploy.yml のブランチを `main` に変更
- [ ] GitHub Pages を GitHub Actions に設定
- [ ] 管理画面で全タブ設定
- [ ] デプロイ実行・動作確認
- [ ] customers.json に追記
- [ ] 顧客にURL共有

---

## テンプレート同期（コード更新時）

バグ修正・機能追加を全顧客に反映する場合:

```bash
# テンプレートのルートで実行（jq が必要）
bash scripts/sync-all.sh
```

- `public/customer/` は各顧客側を保持（設定・画像は上書きされない）
- `.github/workflows/deploy.yml` も各顧客側を保持
- プッシュにより GitHub Actions が自動トリガー

---

## トラブルシューティング

### GitHub Actions が動かない
→ deploy.yml の `branches:` が `[magurophone]` のまま。`[main]` に変更してプッシュ。

### 管理画面の設定がリセットされた
→ 「GitHubから最新設定を取得」ボタンで復元。
→ リポジトリの `public/customer/config.js` が空なら、管理画面で再入力してデプロイ。

### デプロイボタンが表示されない
→ デプロイタブの接続設定（Owner/Repo/Branch/Token）が未入力。
