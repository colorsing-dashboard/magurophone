# ColorSing LP — Claude作業ガイド

コード変更・push 時に必ず確認するルール集。

---

## リポジトリ構成

```
magurophone/ColorSing_LP  ← テンプレートリポジトリ（ここで作業）
  ├─ main ブランチ        ← おおもと。sync-all.sh はここを参照して全顧客に配布
  └─ magurophone ブランチ ← 開発・テスト用 兼 magurophoneサイトのバックアップ

colorsing-dashboard/magurophone  ← magurophoneの本番サイト（一般顧客と同じ構造）
  └─ main ブランチ                  https://colorsing-dashboard.github.io/magurophone/
```

- **magurophoneの本番**は `colorsing-dashboard` org 側。テンプレートの `magurophone` ブランチは開発環境。
- `public/customer/config.js` は顧客固有ファイルなので **main への反映・sync-all.sh の対象外**。

---

## 更新の正しい手順

```
1. magurophone ブランチで開発・動作確認
2. main ブランチに反映（public/customer/config.js は除く）
3. bash scripts/sync-all.sh で全顧客に配布
```

### コード変更後の push コマンド

```bash
# 1. main にcommit & push（ここで作業することが多い）
git add <files>
git commit -m "..."
git push origin main

# 2. magurophone ブランチにも反映
git checkout magurophone
git merge main --no-edit
git push origin magurophone
git checkout main

# 3. 全顧客に配布
bash scripts/sync-all.sh
```

> **注意**: `git push origin main:magurophone` は magurophone が独自のマージコミットを持つため
> non-fast-forward になることがある。必ず checkout → merge → push の順で行う。

---

## ファイル構成の注意点

| パス | 役割 |
|------|------|
| `public/customer/config.js` | 顧客固有設定。sync-all.sh で **上書きされない** |
| `public/customer/*.png` | 顧客固有画像。sync-all.sh で **上書きされない** |
| `scripts/sync-all.sh` | 全顧客リポに main を配布するスクリプト |
| `customers.json` | 配布対象の顧客リポ名一覧 |
| `src/lib/defaults.js` | デフォルト設定値（config.js 未設定時のフォールバック） |

---

## よくあるミス

- `magurophone` ブランチへの push を `git push origin main:magurophone` で行うと失敗する
  → checkout → merge → push で行う
- `public/customer/config.js` を main に含めると全顧客に配布されてしまう
  → このファイルは commit しない
