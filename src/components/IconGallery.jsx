import { useMemo } from 'react'
import { useConfig } from '../context/ConfigContext'

const IconGallery = ({ icons, selectedMonth, setSelectedMonth, selectedUser, setSelectedUser, loading, iconError }) => {
  const config = useConfig()

  const availableMonths = useMemo(() => {
    return Object.keys(icons).filter(month => icons[month].length > 0).sort().reverse()
  }, [icons])

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
        <div className="text-xl text-light-blue animate-shimmer">{config.ui.iconLoading}</div>
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

  const formatMonth = (month) => {
    const year = month.substring(0, 4)
    const m = parseInt(month.substring(4, 6), 10)
    return `${year}年${m}月`
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
                  ? 'bg-light-blue/20 border border-light-blue/50 text-light-blue'
                  : 'glass-effect border border-light-blue/20 text-gray-400 hover:text-light-blue hover:border-light-blue/40'
              }`}
            >
              {formatMonth(month)}
            </button>
          ))}
        </div>
      </div>

      {selectedMonth && (
        <>
          <section>
            <h3 className="text-xl md:text-2xl font-body mb-4 text-light-blue">{config.ui.userListTitle}</h3>
            <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {users.map((user) => (
                <button
                  key={user}
                  onClick={() => setSelectedUser(user === selectedUser ? null : user)}
                  className={`glass-effect rounded-lg p-3 transition-all text-center ${
                    selectedUser === user
                      ? 'border-2 border-amber text-amber'
                      : 'border border-light-blue/30 hover:border-light-blue text-gray-300 hover:text-light-blue'
                  }`}
                >
                  <div className="text-sm font-body truncate">{user}</div>
                </button>
              ))}
            </div>
          </section>

          {selectedUser && (
            <section>
              <h3 className="text-xl md:text-2xl font-body mb-4 text-amber">
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
                      className="glass-effect rounded-lg overflow-hidden border border-light-blue/30 hover:border-amber transition-all group aspect-square"
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
