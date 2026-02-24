import { useConfig } from '../context/ConfigContext'
import { convertDriveUrl } from '../lib/sheets'

const GRADIENT_DIR = {
  'to-r': 'to right',
  'to-l': 'to left',
  'to-t': 'to top',
  'to-b': 'to bottom',
  'to-br': 'to bottom right',
  'to-bl': 'to bottom left',
  'to-tr': 'to top right',
  'to-tl': 'to top left',
}

const sanitizeCssUrl = (url) => {
  if (!url || typeof url !== 'string') return null
  // CSS url()インジェクション防止: 引用符・括弧・セミコロンを除去
  const sanitized = url.replace(/['");\s]/g, '')
  return sanitized ? `url('${sanitized}')` : null
}

const TitleText = ({ config, sizeClass, glowClass }) => {
  const dir = GRADIENT_DIR[config.brand.titleGradientDirection] || 'to right'
  if (config.brand.titleGradient !== false) {
    return (
      <h1
        className={`${sizeClass} font-display font-black text-transparent bg-clip-text ${glowClass} mb-4 leading-relaxed py-2`}
        style={{
          backgroundImage: `linear-gradient(${dir}, var(--color-title-gradient-start, var(--color-ocean-teal)), var(--color-title-gradient-mid, var(--color-light-blue)), var(--color-title-gradient-end, var(--color-amber)))`,
        }}
      >
        {config.brand.name}
      </h1>
    )
  }
  return (
    <h1
      className={`${sizeClass} font-display font-black ${glowClass} mb-4 leading-relaxed py-2`}
      style={{ color: 'var(--color-title, var(--color-primary))' }}
    >
      {config.brand.name}
    </h1>
  )
}

const Header = ({ lastUpdate, loading, onRefresh }) => {
  const config = useConfig()
  const o = config.colorOverrides || {}
  const hasHeaderBg = o.headerGradientStart || o.headerGradientEnd
  const glowClass = config.brand.titleGlow !== false ? 'text-glow-soft' : ''

  // ヘッダー非表示モード（コンパクト表示）
  if (config.brand.showHeader === false) {
    return (
      <div className="w-full px-6 py-4 flex items-center justify-between gap-4">
        {config.brand.showTitle !== false && (
          <TitleText config={config} sizeClass="text-2xl md:text-3xl" glowClass={glowClass} />
        )}
        <div className="flex items-center gap-3 ml-auto shrink-0">
          {lastUpdate && (
            <div className="hidden md:block text-xs text-sub-text">
              {config.ui.lastUpdate}: {lastUpdate.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
          <button
            onClick={onRefresh}
            disabled={loading}
            className="glass-effect px-4 py-2 rounded-lg border border-card-border/30 hover:border-card-hover transition-all text-sm font-body text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            title="データを再読み込み"
          >
            {loading ? '🔄' : '↻'} {config.ui.refreshButton}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full h-[300px] md:h-[600px] relative overflow-hidden"
      style={{
        background: hasHeaderBg
          ? `linear-gradient(to bottom, var(--color-header-gradient-end, var(--color-deep-blue)), var(--color-header-gradient-start, var(--color-ocean-teal)) 50%, var(--color-header-gradient-end, var(--color-deep-blue)))`
          : 'transparent',
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: sanitizeCssUrl(convertDriveUrl(config.images.headerMobile, 800)) || undefined }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: sanitizeCssUrl(convertDriveUrl(config.images.headerDesktop, 1600)) || undefined }}
      ></div>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEuNSIgZmlsbD0icmdiYSgxMzgsIDE4MCwgMjQ4LCAwLjA1KSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMTM4LCAxODAsIDI0OCwgMC4wOCkiLz48Y2lyY2xlIGN4PSIzNSIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDEzOCwgMTgwLCAyNDgsIDAuMDMpIi8+PC9zdmc+')] opacity-20 animate-float"></div>
      {config.brand.showTitle !== false && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <TitleText config={config} sizeClass="text-4xl md:text-8xl" glowClass={glowClass} />
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 flex items-center gap-3">
        {lastUpdate && (
          <div className="hidden md:block text-xs text-sub-text">
            {config.ui.lastUpdate}: {lastUpdate.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
        <button
          onClick={onRefresh}
          disabled={loading}
          className="glass-effect px-4 py-2 rounded-lg border border-card-border/30 hover:border-card-hover transition-all text-sm font-body text-primary disabled:opacity-50 disabled:cursor-not-allowed"
          title="データを再読み込み"
        >
          {loading ? '🔄' : '↻'} {config.ui.refreshButton}
        </button>
      </div>
    </div>
  )
}

export default Header
