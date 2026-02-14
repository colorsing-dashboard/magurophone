import { generateConfigJS, importConfigFromText } from './configIO'

export async function deployConfigToGitHub(config, { owner, repo, branch, token }) {
  const path = 'public/config.js'
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
  const fileContent = generateConfigJS(config)

  // 1. ブランチの最新コミットSHAを取得（Git Refs API — キャッシュ影響なし）
  const refRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/${encodeURIComponent(branch)}`,
    { headers, cache: 'no-store' }
  )
  if (refRes.status === 401) throw new Error('認証エラー: トークンが無効です')
  if (refRes.status === 404) throw new Error('リポジトリまたはブランチが見つかりません')
  if (!refRes.ok) throw new Error(`ブランチ取得エラー: ${refRes.status}`)
  const refData = await refRes.json()
  const latestCommitSha = refData.object.sha

  // 2. コミットからベースツリーSHAを取得
  const commitRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/commits/${latestCommitSha}`,
    { headers, cache: 'no-store' }
  )
  if (!commitRes.ok) throw new Error(`コミット取得エラー: ${commitRes.status}`)
  const commitData = await commitRes.json()

  // 3. ファイルを含む新しいツリーを作成
  const treeRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/trees`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: commitData.tree.sha,
        tree: [{
          path,
          mode: '100644',
          type: 'blob',
          content: fileContent,
        }],
      }),
    }
  )
  if (treeRes.status === 403) throw new Error('権限エラー: トークンに Contents の書き込み権限（Read and write）がありません。トークンを再作成してください')
  if (!treeRes.ok) throw new Error(`ツリー作成エラー: ${treeRes.status}`)
  const treeData = await treeRes.json()

  // 4. 新しいコミットを作成
  const newCommitRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/commits`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message: '管理画面から設定を更新',
        tree: treeData.sha,
        parents: [latestCommitSha],
      }),
    }
  )
  if (!newCommitRes.ok) throw new Error(`コミット作成エラー: ${newCommitRes.status}`)
  const newCommitData = await newCommitRes.json()

  // 5. ブランチの参照を新コミットに更新
  const updateRefRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${encodeURIComponent(branch)}`,
    {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ sha: newCommitData.sha }),
    }
  )
  if (!updateRefRes.ok) throw new Error(`ブランチ更新エラー: ${updateRefRes.status}`)

  return await updateRefRes.json()
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
