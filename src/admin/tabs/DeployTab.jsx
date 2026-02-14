import { useState, useEffect } from 'react'
import { deployConfigToGitHub, fetchConfigFromGitHub } from '../../lib/github'
import { saveConfigMeta, loadConfigMeta } from '../../lib/configIO'

const formatTime = (ts) => {
  if (!ts) return '---'
  return new Date(ts).toLocaleString('ja-JP', {
    month: 'numeric', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

const DeployTab = ({ config, updateConfig, onSyncFromGitHub }) => {
  const [deploying, setDeploying] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [result, setResult] = useState(null)
  const [meta, setMeta] = useState(() => loadConfigMeta())

  // 開発者ロック（config.js の admin.developerKey で判定）
  const [keyInput, setKeyInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [keyError, setKeyError] = useState(false)

  const developerKey = config?.admin?.developerKey || ''
  const hasKey = !!developerKey

  const deploy = config?.deploy || {}
  const canDeploy = deploy.owner && deploy.repo && deploy.branch && deploy.token

  const handleDeploy = async () => {
    if (!canDeploy) return
    setDeploying(true)
    setResult(null)

    try {
      await deployConfigToGitHub(config, deploy)
      saveConfigMeta({ lastDeployed: Date.now() })
      setMeta(loadConfigMeta())
      setResult({ success: true, message: 'デプロイ成功！GitHub Actionsでビルドが開始されます。' })
    } catch (err) {
      setResult({ success: false, message: err.message })
    } finally {
      setDeploying(false)
    }
  }

  const handleSyncFromGitHub = async () => {
    if (!canDeploy) return
    if (!confirm('GitHubの最新設定でローカルを上書きしますか？')) return
    setSyncing(true)
    setResult(null)

    try {
      const remoteConfig = await fetchConfigFromGitHub(deploy)
      onSyncFromGitHub(remoteConfig)
      saveConfigMeta({ lastModified: Date.now() })
      setMeta(loadConfigMeta())
      setResult({ success: true, message: 'GitHubから設定を同期しました' })
    } catch (err) {
      setResult({ success: false, message: err.message })
    } finally {
      setSyncing(false)
    }
  }

  const handleUnlock = (e) => {
    e.preventDefault()
    if (keyInput === developerKey) {
      setUnlocked(true)
      setKeyError(false)
    } else {
      setKeyError(true)
    }
  }

  useEffect(() => {
    setMeta(loadConfigMeta())
  }, [config])

  return (
    <div>
      <h2 className="text-2xl font-body text-light-blue mb-6">GitHub デプロイ</h2>
      <p className="text-sm text-gray-400 mb-6">
        管理画面の設定をGitHubリポジトリに直接プッシュし、自動デプロイを実行します。
      </p>

      {/* 同期ステータス */}
      <div className="mb-6 glass-effect rounded-lg border border-light-blue/20 p-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div>
            <span className="text-gray-400">ローカル編集: </span>
            <span className="text-light-blue font-body">{formatTime(meta.lastModified)}</span>
          </div>
          <div>
            <span className="text-gray-400">最終デプロイ: </span>
            <span className="text-amber font-body">{formatTime(meta.lastDeployed)}</span>
          </div>
        </div>
        {meta.lastModified && meta.lastDeployed && meta.lastModified > meta.lastDeployed && (
          <p className="text-xs text-amber/70 mt-2">
            * デプロイ後にローカルで編集があります
          </p>
        )}
        {canDeploy && (
          <button
            onClick={handleSyncFromGitHub}
            disabled={syncing}
            className="mt-3 px-4 py-2 bg-ocean-teal/20 hover:bg-ocean-teal/30 border border-ocean-teal/50 rounded-lg transition-all text-light-blue text-sm font-body disabled:opacity-50"
          >
            {syncing ? '同期中...' : 'GitHubから最新設定を取得'}
          </button>
        )}
      </div>

      {/* デプロイボタン（常時表示） */}
      <div className="mb-6">
        {canDeploy ? (
          <button
            onClick={handleDeploy}
            disabled={deploying}
            className="px-8 py-3 bg-amber/20 hover:bg-amber/30 border border-amber/50 rounded-lg transition-all text-amber font-body font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deploying ? 'デプロイ中...' : 'デプロイ実行'}
          </button>
        ) : (
          <div className="glass-effect px-4 py-3 rounded-lg border border-light-blue/20 text-sm text-gray-400">
            接続設定が未完了のため、デプロイできません。開発者に連絡してください。
          </div>
        )}
      </div>

      {result && (
        <div className={`mb-6 glass-effect px-4 py-3 rounded-lg border text-sm ${
          result.success
            ? 'border-green-500/50 text-green-400'
            : 'border-tuna-red/50 text-tuna-red'
        }`}>
          {result.message}
        </div>
      )}

      <hr className="border-light-blue/20 my-8" />

      {/* 接続設定（ロック付き） */}
      <h3 className="text-lg font-body text-amber mb-4">接続設定</h3>

      {hasKey && !unlocked ? (
        <div className="glass-effect rounded-lg border border-light-blue/20 p-6">
          <p className="text-sm text-gray-400 mb-4">
            接続設定の変更には開発者キーが必要です。
          </p>
          <form onSubmit={handleUnlock} className="flex gap-3">
            <input
              type="password"
              value={keyInput}
              onChange={(e) => { setKeyInput(e.target.value); setKeyError(false) }}
              placeholder="開発者キーを入力"
              className="flex-1 px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-light-blue/20 hover:bg-light-blue/30 border border-light-blue/50 rounded-lg transition-all text-light-blue text-sm font-body"
            >
              解除
            </button>
          </form>
          {keyError && (
            <p className="text-xs text-tuna-red mt-2">キーが違います</p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body text-light-blue mb-1">Owner（ユーザー名/組織名）</label>
              <input
                type="text"
                value={deploy.owner || ''}
                onChange={(e) => updateConfig('deploy.owner', e.target.value)}
                placeholder="ユーザー名または組織名"
                className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-body text-light-blue mb-1">リポジトリ名</label>
              <input
                type="text"
                value={deploy.repo || ''}
                onChange={(e) => updateConfig('deploy.repo', e.target.value)}
                placeholder="リポジトリ名"
                className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-body text-light-blue mb-1">ブランチ名</label>
            <input
              type="text"
              value={deploy.branch || ''}
              onChange={(e) => updateConfig('deploy.branch', e.target.value)}
              placeholder="ブランチ名"
              className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-body text-light-blue mb-1">Personal Access Token</label>
            <input
              type="password"
              value={deploy.token || ''}
              onChange={(e) => updateConfig('deploy.token', e.target.value)}
              placeholder="github_pat_..."
              className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm font-mono"
            />
          </div>

          <div className="flex gap-3">
            {unlocked && (
              <button
                onClick={() => { setUnlocked(false); setKeyInput('') }}
                className="px-4 py-2 bg-tuna-red/10 hover:bg-tuna-red/20 border border-tuna-red/30 rounded-lg transition-all text-tuna-red text-sm font-body"
              >
                ロックする
              </button>
            )}
          </div>

          <details className="glass-effect rounded-lg border border-light-blue/20 mt-4">
            <summary className="px-4 py-3 cursor-pointer text-sm font-body text-amber hover:text-amber/80 transition-all">
              Personal Access Token の取得方法
            </summary>
            <div className="px-4 pb-4 text-xs text-gray-400 space-y-2">
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer" className="text-light-blue underline hover:text-amber">
                    こちらのリンク
                  </a>
                  からトークン作成ページを開く
                </li>
                <li>Token name: 任意（例: ColorSing Deploy）</li>
                <li>Expiration: 有効期限を選択</li>
                <li>Repository access: 「Only select repositories」→ 対象リポジトリを選択</li>
                <li>Permissions → Repository permissions → Contents: 「Read and write」</li>
                <li>「Generate token」をクリックし、表示されたトークンをコピー</li>
              </ol>
            </div>
          </details>
        </div>
      )}
    </div>
  )
}

export default DeployTab
