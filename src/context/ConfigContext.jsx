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

    // オーバーライド（--override-* → @theme でベースより優先される）
    const overrides = {
      'override-primary-text': o.primaryText,
      'override-accent-text': o.accentText,
      'override-background-main': o.backgroundMain,
      'override-background-mid': o.backgroundMid,
    }
    Object.entries(overrides).forEach(([key, value]) => {
      if (value) {
        root.style.setProperty(`--${key}`, value)
      } else {
        root.style.removeProperty(`--${key}`)
      }
    })

    // ヘッダーグラデーション（Header.jsx が直接参照）
    if (o.headerGradientStart) root.style.setProperty('--color-header-gradient-start', o.headerGradientStart)
    else root.style.removeProperty('--color-header-gradient-start')
    if (o.headerGradientEnd) root.style.setProperty('--color-header-gradient-end', o.headerGradientEnd)
    else root.style.removeProperty('--color-header-gradient-end')

    // 1位カード強調色（HomeView.jsx が直接参照）
    if (o.rank1Card) root.style.setProperty('--color-rank1-card', o.rank1Card)
    else root.style.removeProperty('--color-rank1-card')

    // カードボーダー（Tailwindクラスのlight-blue/amberに連動するが、個別に上書きしたい場合用）
    if (o.cardBorder) root.style.setProperty('--color-card-border', o.cardBorder)
    else root.style.removeProperty('--color-card-border')
    if (o.cardBorderHover) root.style.setProperty('--color-card-border-hover', o.cardBorderHover)
    else root.style.removeProperty('--color-card-border-hover')
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
