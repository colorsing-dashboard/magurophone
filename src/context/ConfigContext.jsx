import { createContext, useContext, useEffect } from 'react'

const ConfigContext = createContext(null)

const sanitizeCssUrl = (url) => {
  if (!url || typeof url !== 'string') return null
  return url.replace(/['");\s]/g, '')
}

export function ConfigProvider({ config, children }) {
  // ベースカラー + オーバーライドをCSS変数に注入
  useEffect(() => {
    if (!config?.colors) return
    const root = document.documentElement
    const o = config.colorOverrides || {}

    // ベースカラー（--base-* → @theme が参照）
    root.style.setProperty('--base-deep-blue', config.colors.deepBlue)
    root.style.setProperty('--base-ocean-teal', config.colors.oceanTeal)
    root.style.setProperty('--base-light-blue', config.colors.lightBlue)
    root.style.setProperty('--base-amber', config.colors.amber)
    root.style.setProperty('--base-accent', config.colors.accent)
    root.style.setProperty('--base-gold', config.colors.gold)

    // エリア別オーバーライド（--override-* → @themeまたはCSS直接参照）
    // 各オーバーライドは対応するエリアのみに影響する
    const overrides = {
      'override-primary-text': o.primaryText,           // → text-primary
      'override-accent-text': o.accentText,             // → text-highlight
      'override-card-border': o.cardBorder,             // → border-card-border
      'override-card-border-hover': o.cardBorderHover,  // → border-card-hover
      'override-background-main': o.backgroundMain,     // → body背景グラデ
      'override-background-mid': o.backgroundMid,       // → body背景グラデ
      'color-header-gradient-start': o.headerGradientStart, // → Header.jsx
      'color-header-gradient-end': o.headerGradientEnd,     // → Header.jsx
      'color-rank1-card': o.rank1Card,                      // → HomeView.jsx
    }
    Object.entries(overrides).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--${key}`, value)
      } else {
        root.style.removeProperty(`--${key}`)
      }
    })
  }, [config?.colors, config?.colorOverrides])

  // ヘッダー画像をCSS変数に注入 + プリロード
  useEffect(() => {
    if (!config?.images) return
    const root = document.documentElement
    const safeMobile = sanitizeCssUrl(config.images.headerMobile)
    if (safeMobile) {
      root.style.setProperty('--header-image-mobile', `url('${safeMobile}')`)
    } else {
      root.style.removeProperty('--header-image-mobile')
    }
    const safeDesktop = sanitizeCssUrl(config.images.headerDesktop)
    if (safeDesktop) {
      root.style.setProperty('--header-image-desktop', `url('${safeDesktop}')`)
    } else {
      root.style.removeProperty('--header-image-desktop')
    }

    // ヘッダー画像をプリロード
    const isMobile = window.matchMedia('(max-width: 767.98px)').matches
    const preloadUrl = isMobile ? config.images.headerMobile : config.images.headerDesktop
    if (preloadUrl) {
      const id = 'preload-header'
      let link = document.getElementById(id)
      if (!link) {
        link = document.createElement('link')
        link.id = id
        link.rel = 'preload'
        link.as = 'image'
        document.head.appendChild(link)
      }
      link.href = preloadUrl
    }
  }, [config?.images])

  // フォントをCSS変数に注入 + Google Fonts動的読み込み
  useEffect(() => {
    if (!config?.fonts) return
    const root = document.documentElement
    if (config.fonts.display) {
      root.style.setProperty('--font-display', config.fonts.display)
    }
    if (config.fonts.body) {
      root.style.setProperty('--font-body', config.fonts.body)
      document.body.style.fontFamily = config.fonts.body
    }

    // タイトルフォントURL
    const loadFontLink = (id, url) => {
      let link = document.getElementById(id)
      if (url) {
        if (link) {
          link.href = url
        } else {
          link = document.createElement('link')
          link.id = id
          link.rel = 'stylesheet'
          link.href = url
          document.head.appendChild(link)
        }
      } else if (link) {
        link.remove()
      }
    }

    // 旧形式(googleFontsUrl)との互換性
    const displayUrl = config.fonts.displayUrl || config.fonts.googleFontsUrl || ''
    loadFontLink('google-fonts-display', displayUrl)
    loadFontLink('google-fonts-body', config.fonts.bodyUrl || '')
  }, [config?.fonts])

  // ページタイトルを設定
  useEffect(() => {
    if (config?.brand?.pageTitle) {
      document.title = config.brand.pageTitle
    }
  }, [config?.brand?.pageTitle])

  // ファビコンを設定
  useEffect(() => {
    if (config?.images?.favicon) {
      const link = document.querySelector("link[rel~='icon']") || document.createElement('link')
      link.rel = 'icon'
      link.href = config.images.favicon
      if (!link.parentNode) {
        document.head.appendChild(link)
      }
    }
  }, [config?.images?.favicon])

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  )
}

export function useConfig() {
  const config = useContext(ConfigContext)
  if (!config) {
    throw new Error('useConfig must be used within ConfigProvider')
  }
  return config
}
