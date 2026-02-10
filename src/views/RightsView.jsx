import { useState, useMemo, useCallback } from 'react'
import { useConfig } from '../context/ConfigContext'
import { hasRight, RIGHTS_NAME_INDEX, RIGHTS_SPECIAL_INDEX } from '../components/PersonPopup'
import IconRenderer from '../components/IconRenderer'

const RightsView = ({ rights, onSelectPerson }) => {
  const config = useConfig()
  const [searchTerm, setSearchTerm] = useState('')

  // 権利のアイコンを取得（config.benefitTiers ベースで動的）
  const getRightsIcons = useCallback((person) => {
    const icons = []
    config.benefitTiers.forEach((tier) => {
      if (hasRight(person[tier.columnIndex])) {
        icons.push(tier.icon)
      }
    })
    const specialValue = String(person[RIGHTS_SPECIAL_INDEX] ?? '').trim()
    if (specialValue && specialValue.toUpperCase() !== 'FALSE' && specialValue !== '0') {
      icons.push('✨')
    }
    return icons
  }, [config.benefitTiers])

  // 権利者を50音順にソート
  const sortedRights = useMemo(() => {
    return [...rights].sort((a, b) =>
      String(a[RIGHTS_NAME_INDEX] ?? '').localeCompare(String(b[RIGHTS_NAME_INDEX] ?? ''), 'ja')
    )
  }, [rights])

  // 検索フィルター
  const filteredRights = useMemo(() => {
    return sortedRights.filter(person => {
      const name = String(person[RIGHTS_NAME_INDEX] ?? '').trim()
      if (!name) return false
      if (!name.toLowerCase().includes(searchTerm.toLowerCase())) return false

      const hasAnyRight = config.benefitTiers.some(tier => hasRight(person[tier.columnIndex]))
      const specialValue = String(person[RIGHTS_SPECIAL_INDEX] ?? '').trim()
      const normalizedSpecial = specialValue.toUpperCase()
      const hasSpecial = normalizedSpecial !== '' && normalizedSpecial !== 'FALSE' && normalizedSpecial !== '0'

      return hasAnyRight || hasSpecial
    })
  }, [sortedRights, searchTerm, config.benefitTiers])

  const viewConfig = config.views.find(v => v.id === 'rights') || {}

  return (
    <section>
      <h2 className="text-2xl md:text-4xl font-body mb-4 md:mb-8 text-center text-glow-soft text-amber">
        {viewConfig.title || '🍾 ボトルキープ一覧'}
      </h2>

      <div className="mb-6 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder={config.ui.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-3 glass-effect border border-light-blue/30 rounded-xl focus:outline-none focus:border-amber transition-all text-white placeholder-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRights.map((person) => (
          <div
            key={person[RIGHTS_NAME_INDEX]}
            onClick={() => onSelectPerson(person)}
            className="glass-effect rounded-xl p-4 md:p-6 border border-light-blue/30 hover:border-amber transition-all hover:scale-105 cursor-pointer group h-32 md:h-36 text-center flex flex-col"
          >
            <h3
              className="text-base md:text-xl font-body group-hover:text-amber transition-colors flex items-center justify-center"
              style={{ flexGrow: 1, flexShrink: 1, flexBasis: '0%', minHeight: 0 }}
            >
              {person[RIGHTS_NAME_INDEX]}
            </h3>
            <div
              className="flex items-center justify-center flex-wrap gap-2 text-lg md:text-2xl"
              style={{ flexGrow: 2, flexShrink: 1, flexBasis: '0%', minHeight: 0, paddingTop: '13px', alignContent: 'flex-start', boxSizing: 'border-box' }}
            >
              {getRightsIcons(person).map((icon, i) => (
                <span key={`${icon}-${i}`} className="animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                  <IconRenderer icon={icon} size={24} className="text-amber" />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RightsView
