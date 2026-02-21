import { useState, useMemo } from 'react'
import { useConfig } from '../context/ConfigContext'
import { isMonthlyFormat } from '../lib/sheets'

const IconGallery = ({ icons, selectedMonth, setSelectedMonth, loading, iconError }) => {
  const config = useConfig()
  const [searchTerm, setSearchTerm] = useState('')
  const [popupUser, setPopupUser] = useState(null)

  const isMonthly = useMemo(() => {
    const keys = Object.keys(icons).filter(k => k !== '_orderedKeys')
    return isMonthlyFormat(keys)
  }, [icons])

  const availableMonths = useMemo(() => {
    const keys = Object.keys(icons).filter(k => k !== '_orderedKeys' && icons[k].length > 0)
    if (isMonthly) {
      return keys.sort().reverse()
    }
    const orderedKeys = icons._orderedKeys || []
    return orderedKeys.filter(k => icons[k] && icons[k].length > 0)
  }, [icons, isMonthly])

  // 選択中の月/カテゴリの全ユーザー（名前順）
  const allUsers = useMemo(() => {
    if (!selectedMonth || !icons[selectedMonth]) return []
    const uniqueUsers = [...new Set(icons[selectedMonth].map(item => item.label))]
    return uniqueUsers.sort((a, b) => a.localeCompare(b, 'ja'))
  }, [selectedMonth, icons])

  // 検索フィルター適用後のユーザー
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return allUsers
    return allUsers.filter(user => user.toLowerCase().includes(searchTerm.toLowerCase()))
  }, [allUsers, searchTerm])

  const getIconsForUser = (user) => {
    if (!selectedMonth || !icons[selectedMonth]) return []
    return icons[selectedMonth].filter(item => item.label === user)
  }

  const handleMonthChange = (month) => {
    setSelectedMonth(month)
    setSearchTerm('')
    setPopupUser(null)
  }

  const formatKey = (key) => {
    if (!key) return ''
    if (isMonthly && key.length >= 6) {
      const year = key.substring(0, 4)
      const m = parseInt(key.substring(4, 6), 10)
      return `${year}年${m}月`
    }
    return key
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4 animate-pulse">🖼️</div>
        <div className="text-xl text-primary animate-shimmer">{config.ui.iconLoading}</div>
      </div>
    )
  }

  if (iconError) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">⚠️</div>
        <div className="text-xl text-tuna-red">{iconError}</div>
      </div>
    )
  }

  if (availableMonths.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">📭</div>
        <div className="text-xl text-gray-400">{config.ui.iconEmpty}</div>
      </div>
    )
  }

  const popupIcons = popupUser ? getIconsForUser(popupUser) : []

  return (
    <div className="space-y-6">
      {/* 月/カテゴリ タブ */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-2 min-w-max">
          {availableMonths.map((month) => (
            <button
              key={month}
              onClick={() => handleMonthChange(month)}
              className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                selectedMonth === month
                  ? 'bg-primary/20 border border-primary/50 text-primary'
                  : 'glass-effect border border-card-border/20 text-gray-400 hover:text-primary hover:border-card-border/40'
              }`}
            >
              {formatKey(month)}
            </button>
          ))}
        </div>
      </div>

      {selectedMonth && (
        <>
          {/* 検索ボックス */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={config.ui.searchPlaceholder}
            className="w-full max-w-md px-4 py-2 glass-effect border border-card-border/30 rounded-xl focus:outline-none focus:border-card-hover transition-all text-white placeholder-gray-500 text-sm"
          />

          {/* ユーザー名グリッド */}
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">{config.ui.iconNoImages}</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredUsers.map((user) => (
                <button
                  key={user}
                  onClick={() => setPopupUser(user)}
                  className="glass-effect rounded-xl p-4 border border-card-border/20 hover:border-card-hover text-primary text-sm font-body transition-all text-center"
                >
                  {user}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* ユーザーアイコンポップアップ */}
      {popupUser && (
        <div
          onClick={() => setPopupUser(null)}
          className="fixed inset-0 bg-black/70 flex items-start justify-center p-4 z-50 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-effect rounded-2xl p-8 border border-card-border/30 box-glow-soft max-w-2xl w-full relative my-8"
          >
            <button
              onClick={() => setPopupUser(null)}
              className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white transition-colors z-10"
            >
              ×
            </button>

            <h2 className="text-2xl font-body mb-6 text-highlight text-center">
              {config.ui.userIconTitle.replace('{user}', popupUser)}
            </h2>

            {popupIcons.length === 0 ? (
              <div className="text-center py-8 text-gray-400">{config.ui.iconNoImages}</div>
            ) : (
              <div className="flex flex-wrap gap-4 justify-center">
                {popupIcons.map((icon, index) => (
                  <a
                    key={index}
                    href={icon.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-32 h-32 rounded-xl overflow-hidden border border-card-border/30 hover:border-card-hover transition-all group flex-shrink-0"
                  >
                    <img
                      src={icon.thumbnailUrl}
                      alt={`${icon.label}のアイコン`}
                      className="w-full h-full object-contain bg-deep-blue/30 group-hover:scale-105 transition-transform"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect width="128" height="128" fill="%23222"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="11"%3E${encodeURIComponent(config.ui.imageError)}%3C/text%3E%3C/svg%3E`
                      }}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default IconGallery
