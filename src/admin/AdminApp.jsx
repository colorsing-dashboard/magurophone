import { useState, useEffect, useRef } from 'react'
import { loadConfig, saveConfig, downloadConfigJS, importConfigFromText, deepMerge, saveConfigMeta } from '../lib/configIO'
import DEFAULT_CONFIG from '../lib/defaults'
import IconRenderer from '../components/IconRenderer'
import BrandingTab from './tabs/BrandingTab'
import ColorsTab from './tabs/ColorsTab'

import SheetsTab from './tabs/SheetsTab'
import ViewsTab from './tabs/ViewsTab'
import TiersTab from './tabs/TiersTab'
import ContentTab from './tabs/ContentTab'
import EffectsTab from './tabs/EffectsTab'
import DeployTab from './tabs/DeployTab'

const TABS = [
  { id: 'branding', label: 'ブランディング', short: 'ブランド', icon: 'tag' },
  { id: 'colors',   label: 'カラー',         short: 'カラー',   icon: 'palette' },
  { id: 'sheets',   label: 'Google Sheets',  short: 'シート',   icon: 'bar-chart-3' },
  { id: 'views',    label: 'ビュー管理',     short: 'ビュー',   icon: 'smartphone' },
  { id: 'tiers',    label: '特典ティア',     short: 'ティア',   icon: 'trophy' },
  { id: 'content',  label: 'コンテンツ',     short: 'コンテンツ', icon: 'file-text' },
  { id: 'effects',  label: 'エフェクト',     short: 'エフェクト', icon: 'sparkles' },
  { id: 'deploy',   label: 'デプロイ',       short: 'デプロイ', icon: 'rocket' },
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

  // 設定変更時に即座にlocalStorageに保存
  const updateConfig = (path, value) => {
    setConfig(prev => {
      const next = { ...prev }
      const keys = path.split('.')
      let current = next

      for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] == null) {
          current[keys[i]] = {}
        } else if (Array.isArray(current[keys[i]])) {
          current[keys[i]] = [...current[keys[i]]]
        } else {
          current[keys[i]] = { ...current[keys[i]] }
        }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value

      saveConfig(next)
      saveConfigMeta({ lastModified: Date.now() })

      return next
    })
    setSaveMessage('保存しました')
    setTimeout(() => setSaveMessage(null), 2000)
  }

  // handleSyncFromGitHub 等で直接setConfigした場合の保存
  const isInitialMount = useRef(true)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    saveConfig(config)
    saveConfigMeta({ lastModified: Date.now() })
  }, [config])

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
      setConfig(prev => deepMerge(prev, imported))
    } catch (err) {
      setImportError(err.message)
    }

    e.target.value = ''
  }

  const handleSyncFromGitHub = (remoteConfig) => {
    setConfig(prev => {
      const synced = deepMerge(DEFAULT_CONFIG, remoteConfig)
      if (synced.deploy?.token?.startsWith('rev:')) {
        synced.deploy.token = synced.deploy.token.slice(4).split('').reverse().join('')
      }
      if (prev.deploy?.token && !prev.deploy.token.startsWith('rev:')) {
        synced.deploy = { ...synced.deploy, token: prev.deploy.token }
      }
      return synced
    })
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

  const TAB_COMPONENTS = {
    branding: BrandingTab,
    colors: ColorsTab,
    sheets: SheetsTab,
    views: ViewsTab,
    tiers: TiersTab,
    content: ContentTab,
    effects: EffectsTab,
    deploy: DeployTab,
  }
  const ActiveTab = TAB_COMPONENTS[activeTab]
  const activeTabDef = TABS.find(t => t.id === activeTab)

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* ─── サイドバー / トップナビ ─── */}
      <aside className="sticky top-0 z-40 md:w-52 md:h-screen md:overflow-y-auto glass-effect border-b md:border-b-0 md:border-r border-light-blue/20 flex-shrink-0">

        {/* モバイル: タイトル行 + タブスクロール */}
        <div className="md:hidden">
          <div className="flex items-center gap-3 px-4 py-2 border-b border-light-blue/15">
            <span className="text-sm font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-ocean-teal via-light-blue to-amber whitespace-nowrap">
              管理画面
            </span>
            <span className="text-light-blue/40 text-xs">›</span>
            <span className="text-light-blue text-xs font-bold truncate">{activeTabDef?.label}</span>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-2 py-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-2.5 py-2 rounded-xl transition-all flex-shrink-0 min-w-[52px] ${
                  activeTab === tab.id
                    ? 'bg-light-blue/20 border border-light-blue/40 text-light-blue'
                    : 'text-gray-500 hover:text-gray-300 border border-transparent hover:bg-white/5'
                }`}
              >
                <IconRenderer icon={tab.icon} size={18} />
                <span className="text-[10px] font-body leading-tight text-center">{tab.short}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* PC: サイドバー */}
        <div className="hidden md:flex flex-col h-full">
          <div className="px-5 py-5 border-b border-light-blue/15">
            <h1 className="text-base font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-ocean-teal via-light-blue to-amber">
              管理画面
            </h1>
          </div>

          <nav className="flex flex-col gap-0.5 p-3 flex-1">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all text-sm w-full text-left ${
                  activeTab === tab.id
                    ? 'bg-light-blue/20 border border-light-blue/40 text-light-blue font-bold'
                    : 'hover:bg-white/5 text-gray-400 hover:text-gray-200 border border-transparent'
                }`}
              >
                <IconRenderer icon={tab.icon} size={16} />
                <span className="font-body">{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="px-3 pb-5 pt-4 space-y-2 border-t border-light-blue/20">
            <button
              onClick={handleExport}
              className="w-full px-3 py-2 bg-amber/20 hover:bg-amber/30 border border-amber/50 rounded-lg transition-all text-amber text-xs font-body"
            >
              設定をダウンロード
            </button>
            <label className="block w-full px-3 py-2 bg-light-blue/10 hover:bg-light-blue/20 border border-light-blue/30 rounded-lg transition-all text-light-blue text-xs font-body text-center cursor-pointer">
              設定をインポート
              <input type="file" accept=".js,.json" onChange={handleImport} className="hidden" />
            </label>
            <a
              href="./index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-3 py-2 bg-ocean-teal/30 hover:bg-ocean-teal/50 border border-ocean-teal/50 rounded-lg transition-all text-light-blue text-xs font-body text-center"
            >
              プレビューを開く
            </a>
            <a
              href="./manual.html"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-3 py-2 bg-light-blue/10 hover:bg-light-blue/20 border border-light-blue/30 rounded-lg transition-all text-light-blue text-xs font-body text-center"
            >
              管理マニュアル
            </a>
          </div>
        </div>
      </aside>

      {/* ─── メインコンテンツ ─── */}
      <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
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
          <ActiveTab config={config} updateConfig={updateConfig} onSyncFromGitHub={handleSyncFromGitHub} />
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
          <a
            href="./manual.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-4 py-3 bg-light-blue/10 hover:bg-light-blue/20 border border-light-blue/30 rounded-lg transition-all text-light-blue font-body text-center"
          >
            管理マニュアル
          </a>
        </div>
      </main>
    </div>
  )
}

export default AdminApp
