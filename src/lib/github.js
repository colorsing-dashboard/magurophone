import { generateConfigJS } from './configIO'

const DEPLOY_STORAGE_KEY = 'deploy_settings'

export function loadDeploySettings() {
  try {
    const stored = localStorage.getItem(DEPLOY_STORAGE_KEY)
    return stored ? JSON.parse(stored) : { owner: '', repo: '', branch: '', token: '' }
  } catch {
    return { owner: '', repo: '', branch: '', token: '' }
  }
}

export function saveDeploySettings(settings) {
  localStorage.setItem(DEPLOY_STORAGE_KEY, JSON.stringify(settings))
}

export async function deployConfigToGitHub(config, { owner, repo, branch, token }) {
  const path = 'public/config.js'
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  // 既存ファイルのSHAを取得
  const getRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`,
    { headers }
  )

  if (getRes.status === 401) throw new Error('認証エラー: トークンが無効です')
  if (getRes.status === 404) throw new Error('リポジトリまたはファイルが見つかりません')
  if (!getRes.ok) throw new Error(`SHA取得エラー: ${getRes.status}`)

  const { sha } = await getRes.json()

  // config.js の内容をBase64エンコード
  const content = btoa(unescape(encodeURIComponent(generateConfigJS(config))))

  // コミット＆プッシュ
  const putRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: '管理画面から設定を更新',
        content,
        sha,
        branch,
      }),
    }
  )

  if (putRes.status === 409) throw new Error('コンフリクト: 他の変更と競合しています。再試行してください')
  if (putRes.status === 422) throw new Error('バリデーションエラー: ブランチ名またはファイルパスを確認してください')
  if (!putRes.ok) throw new Error(`デプロイエラー: ${putRes.status}`)

  return await putRes.json()
}
