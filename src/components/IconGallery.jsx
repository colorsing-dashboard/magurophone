import { useMemo } from 'react'
import { useConfig } from '../context/ConfigContext'
import { isMonthlyFormat } from '../lib/sheets'

const IconGallery = ({ icons, selectedMonth, setSelectedMonth, selectedUser, setSelectedUser, loading, iconError }) => {
  const config = useConfig()

  const isMonthly = useMemo(() => {
    const keys = Object.keys(icons).filter(k => k !== '_orderedKeys')
    return isMonthlyFormat(keys)
  }, [icons])

  const availableMonths = useMemo(() => {
    const keys = Object.keys(icons).filter(k => k !== '_orderedKeys' && icons[k].length > 0)
    if (isMonthly) {
      return keys.sort().reverse()
    }
    // カテゴリモード: スプレッドシートの出現順を保持
    const orderedKeys = icons._orderedKeys || []
    return orderedKeys.filter(k => icons[k] && icons[k].length > 0)
  }, [icons, isMonthly])

  const users = useMemo(() => {
    if (!selectedMonth || !icons[selectedMonth]) return []
    const uniqueUsers = [...new Set(icons[selectedMonth].map(item => item.label))]
    return uniqueUsers.sort((a, b) => a.localeCompare(b, 'ja'))
  }, [selectedMonth, icons])

  const userIcons = useMemo(() => {
    if (!selectedMonth || !icons[selectedMonth] || !selectedUser) return []
    return icons[selectedMonth].filter(item => item.label === selectedUser)
  }, [selectedMonth, selectedUser, icons])

  const handleMonthChange = (month) => {
    setSelectedMonth(month)
    setSelectedUser(null)
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

  const formatKey = (key) => {
    if (!key) return ''
    if (isMonthly && key.length >= 6) {
      const year = key.substring(0, 4)
      const m = parseInt(key.substring(4, 6), 10)
      return `${year}年${m}月`
    }
    return key
  }

  return (
    <div className="space-y-8">
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
          <section>
            <h3 className="text-xl md:text-2xl font-body mb-4 text-primary">{config.ui.userListTitle}</h3>
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {users.map((user) => (
                <button
                  key={user}
                  onClick={() => setSelectedUser(user === selectedUser ? null : user)}
                  className={`glass-effect rounded-lg p-3 transition-all text-center ${
                    selectedUser === user
                      ? 'border-2 border-card-hover text-highlight'
                      : 'border border-card-border/30 hover:border-card-border text-gray-300 hover:text-primary'
                  }`}
                >
                  <div className="text-sm font-body truncate">{user}</div>
                </button>
              ))}
            </div>
          </section>

          {selectedUser && (
            <section>
              <h3 className="text-xl md:text-2xl font-body mb-4 text-highlight">
                {config.ui.userIconTitle.replace('{user}', selectedUser)}
              </h3>
              {userIcons.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {userIcons.map((icon, index) => (
                    <a
                      key={index}
                      href={icon.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-effect rounded-lg overflow-hidden border border-card-border/30 hover:border-card-hover transition-all group aspect-square"
                    >
                      <img
                        src={icon.thumbnailUrl}
                        alt={`${icon.label}のアイコン`}
                        className="w-full h-full object-contain bg-deep-blue/30 group-hover:scale-105 transition-transform"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23222"%3E%3C/rect%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="16"%3E${encodeURIComponent(config.ui.imageError)}%3C/text%3E%3C/svg%3E`
                        }}
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  {config.ui.iconNoImages}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  )
}

export default IconGallery
