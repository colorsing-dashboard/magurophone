import { createContext, useContext, useEffect } from 'react'

const ConfigContext = createContext(null)

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

  // ヘッダー画像をCSS変数に注入 + プリロード
  useEffect(() => {
    if (!config?.images) return
    const root = document.documentElement
    if (config.images.headerMobile) {
      root.style.setProperty('--header-image-mobile', `url('${config.images.headerMobile}')`)
    } else {
      root.style.removeProperty('--header-image-mobile')
    }
    if (config.images.headerDesktop) {
      root.style.setProperty('--header-image-desktop', `url('${config.images.headerDesktop}')`)
    } else {
      root.style.removeProperty('--header-image-desktop')
    }

    // ヘッダー画像をプリロード
    const isMobile = window.matchMedia('(max-width: 767px)').matches
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

    // Google Fonts URLが設定されていれば動的にロード
    if (config.fonts.googleFontsUrl) {
      const id = 'dynamic-google-fonts'
      let link = document.getElementById(id)
      if (link) {
        link.href = config.fonts.googleFontsUrl
      } else {
        link = document.createElement('link')
        link.id = id
        link.rel = 'stylesheet'
        link.href = config.fonts.googleFontsUrl
        document.head.appendChild(link)
      }
    }
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
