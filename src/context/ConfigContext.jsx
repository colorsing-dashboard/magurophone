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

  // ヘッダー画像をCSS変数に注入
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
  }, [config?.images])

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
