import { generateConfigJS, importConfigFromText } from './configIO'

// 前回デプロイ成功時の SHA をメモリに保持（API キャッシュ対策）
let lastKnownSHA = null

async function fetchSHA(owner, repo, branch, path, headers) {
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}&t=${Date.now()}`,
    { headers, cache: 'no-store' }
  )

  if (res.status === 401) throw new Error('認証エラー: トークンが無効です')
  if (res.status === 404) throw new Error('リポジトリまたはファイルが見つかりません')
  if (!res.ok) throw new Error(`SHA取得エラー: ${res.status}`)

  const data = await res.json()
  return data.sha
}

export async function deployConfigToGitHub(config, { owner, repo, branch, token }) {
  const path = 'public/config.js'
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const content = btoa(unescape(encodeURIComponent(generateConfigJS(config))))

  // 前回の SHA があればそれを優先、なければ API から取得
  let sha = lastKnownSHA || await fetchSHA(owner, repo, branch, path, headers)

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

  // 409: 保持していた SHA が古い → API から再取得してリトライ
  if (putRes.status === 409) {
    sha = await fetchSHA(owner, repo, branch, path, headers)

    const retryRes = await fetch(
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

    if (retryRes.status === 403) throw new Error('権限エラー: トークンに Contents の書き込み権限（Read and write）がありません。トークンを再作成してください')
    if (retryRes.status === 409) throw new Error('コンフリクト: SHAを再取得しましたが競合が解消しません。しばらく待ってから再試行してください')
    if (retryRes.status === 422) throw new Error('バリデーションエラー: ブランチ名またはファイルパスを確認してください')
    if (!retryRes.ok) throw new Error(`デプロイエラー: ${retryRes.status}`)

    const result = await retryRes.json()
    lastKnownSHA = result.content.sha
    return result
  }

  if (putRes.status === 403) throw new Error('権限エラー: トークンに Contents の書き込み権限（Read and write）がありません。トークンを再作成してください')
  if (putRes.status === 422) throw new Error('バリデーションエラー: ブランチ名またはファイルパスを確認してください')
  if (!putRes.ok) throw new Error(`デプロイエラー: ${putRes.status}`)

  const result = await putRes.json()
  // 成功時の SHA を保持 → 次回デプロイでキャッシュ問題を回避
  lastKnownSHA = result.content.sha
  return result
}

// GitHubから最新のconfig.jsを取得
export async function fetchConfigFromGitHub({ owner, repo, branch, token }) {
  const path = 'public/config.js'
  const res = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}&t=${Date.now()}`,
    { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' }
  )

  if (res.status === 401) throw new Error('認証エラー: トークンが無効です')
  if (res.status === 404) throw new Error('リポジトリまたはファイルが見つかりません')
  if (!res.ok) throw new Error(`取得エラー: ${res.status}`)

  const data = await res.json()
  // 取得時の SHA も保持（次回デプロイ用）
  lastKnownSHA = data.sha
  const content = decodeURIComponent(escape(atob(data.content)))
  return importConfigFromText(content)
}
