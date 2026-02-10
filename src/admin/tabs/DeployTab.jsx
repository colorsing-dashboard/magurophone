import { useState, useEffect } from 'react'
import { loadDeploySettings, saveDeploySettings, deployConfigToGitHub } from '../../lib/github'

const DeployTab = ({ config }) => {
  const [settings, setSettings] = useState(() => loadDeploySettings())
  const [deploying, setDeploying] = useState(false)
  const [result, setResult] = useState(null)
  const [saved, setSaved] = useState(false)

  const updateField = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSaveSettings = () => {
    saveDeploySettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const canDeploy = settings.owner && settings.repo && settings.branch && settings.token

  const handleDeploy = async () => {
    if (!canDeploy) return
    setDeploying(true)
    setResult(null)

    try {
      await deployConfigToGitHub(config, settings)
      setResult({ success: true, message: 'デプロイ成功！GitHub Actionsでビルドが開始されます。' })
    } catch (err) {
      setResult({ success: false, message: err.message })
    } finally {
      setDeploying(false)
    }
  }

  // 初回読み込み時に設定をlocalStorageから復元（タブ切替対応）
  useEffect(() => {
    setSettings(loadDeploySettings())
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-body text-light-blue mb-6">GitHub デプロイ</h2>
      <p className="text-sm text-gray-400 mb-6">
        管理画面の設定をGitHubリポジトリに直接プッシュし、自動デプロイを実行します。
      </p>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body text-light-blue mb-1">Owner（ユーザー名/組織名）</label>
            <input
              type="text"
              value={settings.owner}
              onChange={(e) => updateField('owner', e.target.value)}
              placeholder="magurophone"
              className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-body text-light-blue mb-1">リポジトリ名</label>
            <input
              type="text"
              value={settings.repo}
              onChange={(e) => updateField('repo', e.target.value)}
              placeholder="ColorSing_LP"
              className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-body text-light-blue mb-1">ブランチ名</label>
          <input
            type="text"
            value={settings.branch}
            onChange={(e) => updateField('branch', e.target.value)}
            placeholder="magurophone"
            className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-body text-light-blue mb-1">Personal Access Token</label>
          <input
            type="password"
            value={settings.token}
            onChange={(e) => updateField('token', e.target.value)}
            placeholder="github_pat_..."
            className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm font-mono"
          />
        </div>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleSaveSettings}
          className="px-4 py-2 bg-light-blue/20 hover:bg-light-blue/30 border border-light-blue/50 rounded-lg transition-all text-light-blue text-sm font-body"
        >
          {saved ? '保存しました' : '接続設定を保存'}
        </button>
        <button
          onClick={handleDeploy}
          disabled={!canDeploy || deploying}
          className="px-6 py-2 bg-amber/20 hover:bg-amber/30 border border-amber/50 rounded-lg transition-all text-amber text-sm font-body font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {deploying ? 'デプロイ中...' : 'デプロイ'}
        </button>
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

      <details className="glass-effect rounded-lg border border-light-blue/20">
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
          <p className="text-gray-500 mt-2">※ トークンはこのブラウザのlocalStorageに保存されます。</p>
        </div>
      </details>
    </div>
  )
}

export default DeployTab
