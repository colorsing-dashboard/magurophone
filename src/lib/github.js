import { generateConfigJS, importConfigFromText } from './configIO'

// Git Refs + Trees API でファイルの blob SHA を取得（Contents API のキャッシュを回避）
async function getFileSHAViaRefs(owner, repo, branch, path, headers) {
  // 1. ブランチの最新コミットSHA
  const refRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${encodeURIComponent(branch)}`,
    { headers, cache: 'no-store' }
  )
  if (refRes.status === 401) throw new Error('認証エラー: トークンが無効です')
  if (refRes.status === 404) throw new Error('リポジトリまたはブランチが見つかりません')
  if (!refRes.ok) throw new Error(`ブランチ取得エラー: ${refRes.status}`)
  const refData = await refRes.json()

  // 2. コミットからツリーSHA
  const commitRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/commits/${refData.object.sha}`,
    { headers, cache: 'no-store' }
  )
  if (!commitRes.ok) throw new Error(`コミット取得エラー: ${commitRes.status}`)
  const commitData = await commitRes.json()

  // 3. ツリーからファイルの blob SHA を検索
  const treeRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${commitData.tree.sha}?recursive=1`,
    { headers, cache: 'no-store' }
  )
  if (!treeRes.ok) throw new Error(`ツリー取得エラー: ${treeRes.status}`)
  const treeData = await treeRes.json()

  const entry = treeData.tree.find(e => e.path === path)
  if (!entry) throw new Error('ファイルが見つかりません: ' + path)
  return entry.sha
}

export async function deployConfigToGitHub(config, { owner, repo, branch, token }) {
  const path = 'public/config.js'
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  // Git Refs/Trees API 経由で正確な SHA を取得（キャッシュ影響なし）
  const sha = await getFileSHAViaRefs(owner, repo, branch, path, headers)

  const content = btoa(unescape(encodeURIComponent(generateConfigJS(config))))

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

  if (putRes.status === 403) throw new Error('権限エラー: トークンに Contents の書き込み権限（Read and write）がありません。トークンを再作成してください')
  if (putRes.status === 409) throw new Error('コンフリクト: 他の変更と競合しています。再試行してください')
  if (putRes.status === 422) throw new Error('バリデーションエラー: ブランチ名またはファイルパスを確認してください')
  if (!putRes.ok) throw new Error(`デプロイエラー: ${putRes.status}`)

  return await putRes.json()
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
  const content = decodeURIComponent(escape(atob(data.content)))
  return importConfigFromText(content)
}
