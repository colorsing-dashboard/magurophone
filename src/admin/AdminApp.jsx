import { useState, useEffect } from 'react'
import { loadConfig, loadBaseConfig, saveConfig, clearConfig, downloadConfigJS, importConfigFromText } from '../lib/configIO'
import BrandingTab from './tabs/BrandingTab'
import ColorsTab from './tabs/ColorsTab'
import ImagesTab from './tabs/ImagesTab'
import SheetsTab from './tabs/SheetsTab'
import ViewsTab from './tabs/ViewsTab'
import TiersTab from './tabs/TiersTab'
import ContentTab from './tabs/ContentTab'

const TABS = [
  { id: 'branding', label: 'ブランディング', icon: '🏷️' },
  { id: 'colors', label: 'カラー', icon: '🎨' },
  { id: 'images', label: '画像', icon: '🖼️' },
  { id: 'sheets', label: 'Google Sheets', icon: '📊' },
  { id: 'views', label: 'ビュー管理', icon: '📱' },
  { id: 'tiers', label: '特典ティア', icon: '🏆' },
  { id: 'content', label: 'コンテンツ', icon: '📝' },
]

function AdminApp() {
  const [config, setConfig] = useState(() => loadConfig())
  const [activeTab, setActiveTab] = useState('branding')
  const [authenticated, setAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [importError, setImportError] = useState(null)
  const [saveMessage, setSaveMessage] = useState(null)

  // パスワード保護チェック
  const needsAuth = config.admin?.password && !authenticated

  // パスワード認証チェック（sessionStorage）
  useEffect(() => {
    if (!config.admin?.password) {
      setAuthenticated(true)
      return
    }
    const session = sessionStorage.getItem('admin_auth')
    if (session === 'true') {
      setAuthenticated(true)
    }
  }, [config.admin?.password])

  // 設定変更時に自動保存
  const updateConfig = (path, value) => {
    setConfig(prev => {
      const next = { ...prev }
      const keys = path.split('.')
      let current = next

      for (let i = 0; i < keys.length - 1; i++) {
        if (Array.isArray(current[keys[i]])) {
          current[keys[i]] = [...current[keys[i]]]
        } else {
          current[keys[i]] = { ...current[keys[i]] }
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      saveConfig(next)
      showSaveMessage()
      return next
    })
  }

  // 配列全体を更新
  const updateArray = (path, value) => {
    updateConfig(path, value)
  }

  const showSaveMessage = () => {
    setSaveMessage('保存しました')
    setTimeout(() => setSaveMessage(null), 2000)
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwordInput === config.admin.password) {
      setAuthenticated(true)
      sessionStorage.setItem('admin_auth', 'true')
    } else {
      alert('パスワードが違います')
    }
  }

  const handleExport = () => {
    downloadConfigJS(config)
  }

  const handleImport = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImportError(null)

    try {
      const text = await file.text()
      const imported = importConfigFromText(text)
      const merged = { ...config, ...imported }
      setConfig(merged)
      saveConfig(merged)
      showSaveMessage()
    } catch (err) {
      setImportError(err.message)
    }

    e.target.value = ''
  }

  const handleReset = () => {
    if (confirm('設定をconfig.jsの値に戻しますか？管理画面での変更はクリアされます。')) {
      clearConfig()
      const baseConfig = loadBaseConfig()
      setConfig(baseConfig)
      showSaveMessage()
    }
  }

  // パスワード認証画面
  if (needsAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <form onSubmit={handlePasswordSubmit} className="glass-effect rounded-2xl p-8 border border-light-blue/30 max-w-md w-full text-center">
          <h1 className="text-2xl font-body mb-6 text-light-blue">管理画面</h1>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="パスワードを入力"
            className="w-full px-4 py-3 glass-effect border border-light-blue/30 rounded-xl mb-4 text-white placeholder-gray-500 focus:outline-none focus:border-amber"
          />
          <button
            type="submit"
            className="w-full px-6 py-3 bg-light-blue/20 hover:bg-light-blue/30 border border-light-blue/50 rounded-xl transition-all text-light-blue font-body"
          >
            ログイン
          </button>
        </form>
      </div>
    )
  }

  const tabComponents = {
    branding: <BrandingTab config={config} updateConfig={updateConfig} />,
    colors: <ColorsTab config={config} updateConfig={updateConfig} />,
    images: <ImagesTab config={config} updateConfig={updateConfig} />,
    sheets: <SheetsTab config={config} updateConfig={updateConfig} />,
    views: <ViewsTab config={config} updateConfig={updateConfig} updateArray={updateArray} />,
    tiers: <TiersTab config={config} updateConfig={updateConfig} updateArray={updateArray} />,
    content: <ContentTab config={config} updateConfig={updateConfig} updateArray={updateArray} />,
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* サイドバー */}
      <aside className="md:w-64 md:min-h-screen glass-effect border-b md:border-b-0 md:border-r border-light-blue/30 p-4 md:p-6 flex-shrink-0">
        <h1 className="text-xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-ocean-teal via-light-blue to-amber mb-6">
          管理画面
        </h1>

        <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all whitespace-nowrap text-sm ${
                activeTab === tab.id
                  ? 'bg-light-blue/20 border border-light-blue/50 text-light-blue'
                  : 'hover:bg-light-blue/10 text-gray-300 hover:text-light-blue'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="font-body">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* アクションボタン */}
        <div className="hidden md:block mt-8 space-y-3 border-t border-light-blue/20 pt-6">
          <button
            onClick={handleExport}
            className="w-full px-4 py-2 bg-amber/20 hover:bg-amber/30 border border-amber/50 rounded-lg transition-all text-amber text-sm font-body"
          >
            設定をダウンロード
          </button>
          <label className="block w-full px-4 py-2 bg-light-blue/10 hover:bg-light-blue/20 border border-light-blue/30 rounded-lg transition-all text-light-blue text-sm font-body text-center cursor-pointer">
            設定をインポート
            <input type="file" accept=".js,.json" onChange={handleImport} className="hidden" />
          </label>
          <a
            href="./index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-4 py-2 bg-ocean-teal/30 hover:bg-ocean-teal/50 border border-ocean-teal/50 rounded-lg transition-all text-light-blue text-sm font-body text-center"
          >
            プレビューを開く
          </a>
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-tuna-red/10 hover:bg-tuna-red/20 border border-tuna-red/30 rounded-lg transition-all text-tuna-red text-sm font-body"
          >
            デフォルトに戻す
          </button>
        </div>
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
        {/* 保存メッセージ */}
        {saveMessage && (
          <div className="fixed top-4 right-4 z-50 glass-effect px-4 py-2 rounded-lg border border-amber/50 text-amber text-sm animate-shimmer">
            {saveMessage}
          </div>
        )}

        {importError && (
          <div className="mb-4 glass-effect px-4 py-3 rounded-lg border border-tuna-red/50 text-tuna-red text-sm">
            インポートエラー: {importError}
          </div>
        )}

        <div className="max-w-3xl">
          {tabComponents[activeTab]}
        </div>

        {/* モバイル用アクションボタン */}
        <div className="md:hidden mt-8 space-y-3 border-t border-light-blue/20 pt-6 max-w-3xl">
          <button
            onClick={handleExport}
            className="w-full px-4 py-3 bg-amber/20 hover:bg-amber/30 border border-amber/50 rounded-lg transition-all text-amber font-body"
          >
            設定をダウンロード
          </button>
          <label className="block w-full px-4 py-3 bg-light-blue/10 hover:bg-light-blue/20 border border-light-blue/30 rounded-lg transition-all text-light-blue font-body text-center cursor-pointer">
            設定をインポート
            <input type="file" accept=".js,.json" onChange={handleImport} className="hidden" />
          </label>
          <a
            href="./index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-4 py-3 bg-ocean-teal/30 hover:bg-ocean-teal/50 border border-ocean-teal/50 rounded-lg transition-all text-light-blue font-body text-center"
          >
            プレビューを開く
          </a>
        </div>
      </main>
    </div>
  )
}

export default AdminApp
