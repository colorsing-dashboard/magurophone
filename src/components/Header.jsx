import { useEffect } from 'react'
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

const TITLE_POS = {
  center:         'items-center justify-center',
  'top-left':     'items-start justify-start pt-8 pl-8',
  'top-right':    'items-start justify-end pt-8 pr-8',
  'bottom-left':  'items-end justify-start pb-8 pl-8',
  'bottom-right': 'items-end justify-end pb-8 pr-8',
}

const sanitizeCssUrl = (url) => {
  if (!url || typeof url !== 'string') return null
  // CSS url()インジェクション防止: 引用符・括弧・セミコロンを除去
  const sanitized = url.replace(/['");\s]/g, '')
  return sanitized ? `url('${sanitized}')` : null
}

const TITLE_SIZE = {
  small:  { mobile: 'text-2xl', desktop: 'text-4xl' },
  medium: { mobile: 'text-4xl', desktop: 'text-6xl' },
  large:  { mobile: 'text-5xl', desktop: 'text-8xl' },
  xlarge: { mobile: 'text-6xl', desktop: 'text-9xl' },
}

const TitleText = ({ config, glowClass, compact = false }) => {
  const effectiveStyle = config.brand.titleStyle || 'glass'
  const dir = GRADIENT_DIR[config.brand.titleGradientDirection] || 'to right'
  const sizeKey = compact ? 'small' : (config.brand.titleSize || 'large')
  const { mobile, desktop } = TITLE_SIZE[sizeKey] || TITLE_SIZE.large
  const sizeClass = compact ? 'text-2xl md:text-3xl' : `${mobile} md:${desktop}`
  const glassBg = config.brand.titleGlassBg ?? 0.35
  const glassBlur = config.brand.titleGlassBlur ?? 12
  const paddingY = config.brand.titlePaddingY ?? 12

  if (effectiveStyle === 'glass') {
    const textFill = config.brand.titleTextFill || 'white'
    const o = config.colorOverrides || {}
    const gradientStyle = `linear-gradient(${dir}, var(--color-title-gradient-start, var(--color-ocean-teal)), var(--color-title-gradient-mid, var(--color-light-blue)), var(--color-title-gradient-end, var(--color-amber)))`
    const h1Style = textFill === 'gradient'
      ? { backgroundImage: gradientStyle, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }
      : textFill === 'custom'
        ? { color: o.titleColor || '#ffffff' }
        : {}
    const textClass = textFill === 'gradient'
      ? `${sizeClass} font-display font-black tracking-wide bg-clip-text text-transparent drop-shadow-lg ${glowClass} leading-relaxed py-2`
      : `${sizeClass} font-display font-black tracking-wide text-white drop-shadow-lg ${glowClass} leading-relaxed py-2`

    return (
      <div className="mb-4 inline-block">
        <div
          className="px-6 rounded-xl"
          style={{
            backgroundColor: `rgba(0,0,0,${glassBg})`,
            backdropFilter: `blur(${glassBlur}px)`,
            paddingTop: `${paddingY}px`,
            paddingBottom: `${paddingY}px`,
          }}
        >
          <h1 className={textClass} style={h1Style}>
            {config.brand.name}
          </h1>
        </div>
      </div>
    )
  }

  if (effectiveStyle === 'gradient') {
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
          <TitleText config={config} glowClass={glowClass} compact />
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

  const imgFit = config.brand.headerImageFit || 'cover'
  const overlayOpacity = config.brand.headerOverlayOpacity ?? 0.3
  const titlePos = config.brand.titlePosition || 'center'
  const posClass = TITLE_POS[titlePos] || TITLE_POS.center
  const isCenter = titlePos === 'center'
  const heightDesktop = config.brand.headerHeight || '600px'
  const heightMobile = config.brand.headerHeightMobile || '400px'

  useEffect(() => {
    const id = 'header-cs-style'
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('style')
      el.id = id
      document.head.appendChild(el)
    }
    el.textContent = `.header-cs{height:${heightMobile}}@media(min-width:768px){.header-cs{height:${heightDesktop}}}`
  }, [heightDesktop, heightMobile])

  return (
    <div
      className="header-cs w-full relative overflow-hidden"
      style={{
        background: hasHeaderBg
          ? `linear-gradient(to bottom, var(--color-header-gradient-end, var(--color-deep-blue)), var(--color-header-gradient-start, var(--color-ocean-teal)) 50%, var(--color-header-gradient-end, var(--color-deep-blue)))`
          : 'transparent',
      }}
    >
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: sanitizeCssUrl(convertDriveUrl(config.images.headerDesktop, 1600)) || undefined,
          backgroundSize: imgFit,
          backgroundPosition: imgFit === 'contain' ? 'top center' : 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div
        className="absolute inset-0 md:hidden"
        style={{
          backgroundImage: sanitizeCssUrl(convertDriveUrl(config.images.headerMobile, 800)) || undefined,
          backgroundSize: imgFit,
          backgroundPosition: imgFit === 'contain' ? 'top center' : 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEuNSIgZmlsbD0icmdiYSgxMzgsIDE4MCwgMjQ4LCAwLjA1KSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMTM4LCAxODAsIDI0OCwgMC4wOCkiLz48Y2lyY2xlIGN4PSIzNSIgY3k9IjEwIiByPSIxIiBmaWxsPSJyZ2JhKDEzOCwgMTgwLCAyNDgsIDAuMDMpIi8+PC9zdmc+')] opacity-20 animate-float"></div>
      {config.brand.showTitle !== false && (
        <div className={`absolute inset-0 flex ${posClass}`}>
          <div className={`${isCenter ? 'text-center' : ''} px-4`}>
            <TitleText config={config} glowClass={glowClass} />
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
