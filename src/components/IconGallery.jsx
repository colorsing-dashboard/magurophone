import { useState, useMemo } from 'react'
import { useConfig } from '../context/ConfigContext'
import { isMonthlyFormat } from '../lib/sheets'

const IconGallery = ({ icons, selectedMonth, setSelectedMonth, loading, iconError }) => {
  const config = useConfig()
  const [searchTerm, setSearchTerm] = useState('')

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

          {/* オーバービュー: 全ユーザー + アイコン一覧 */}
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">{config.ui.iconNoImages}</div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => {
                const userIcons = getIconsForUser(user)
                return (
                  <div key={user} className="glass-effect rounded-xl p-4 border border-card-border/30">
                    <h3 className="text-sm font-body text-primary mb-3">{user}</h3>
                    <div className="flex flex-wrap gap-3">
                      {userIcons.map((icon, index) => (
                        <a
                          key={index}
                          href={icon.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-20 h-20 rounded-lg overflow-hidden border border-card-border/30 hover:border-card-hover transition-all group flex-shrink-0"
                        >
                          <img
                            src={icon.thumbnailUrl}
                            alt={`${icon.label}のアイコン`}
                            className="w-full h-full object-contain bg-deep-blue/30 group-hover:scale-105 transition-transform"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null
                              e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80"%3E%3Crect width="80" height="80" fill="%23222"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="11"%3E${encodeURIComponent(config.ui.imageError)}%3C/text%3E%3C/svg%3E`
                            }}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default IconGallery
