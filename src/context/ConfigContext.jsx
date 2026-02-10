import { createContext, useContext, useEffect } from 'react'

const ConfigContext = createContext(null)

const sanitizeCssUrl = (url) => {
  if (!url || typeof url !== 'string') return null
  return url.replace(/['");\s]/g, '')
}

export function ConfigProvider({ config, children }) {
  // CSS変数にカラーを注入
  useEffect(() => {
    if (!config?.colors) return
    const root = document.documentElement
    root.style.setProperty('--color-deep-blue', config.colors.deepBlue)
    root.style.setProperty('--color-ocean-teal', config.colors.oceanTeal)
    root.style.setProperty('--color-light-blue', config.colors.lightBlue)
    root.style.setProperty('--color-amber', config.colors.amber)
    root.style.setProperty('--color-accent', config.colors.accent)
    root.style.setProperty('--color-gold', config.colors.gold)
  }, [config?.colors])

  // カラーオーバーライドをCSS変数に注入
  useEffect(() => {
    if (!config?.colorOverrides) return
    const root = document.documentElement
    const o = config.colorOverrides
    const map = {
      'header-gradient-start': o.headerGradientStart,
      'header-gradient-end': o.headerGradientEnd,
      'card-border': o.cardBorder,
      'card-border-hover': o.cardBorderHover,
      'primary-text': o.primaryText,
      'accent-text': o.accentText,
      'rank1-card': o.rank1Card,
      'background-main': o.backgroundMain,
      'background-mid': o.backgroundMid,
    }
    Object.entries(map).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--color-${key}`, value)
      } else {
        root.style.removeProperty(`--color-${key}`)
      }
    })
  }, [config?.colorOverrides])

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
