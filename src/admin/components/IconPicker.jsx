import { useState, useMemo } from 'react'
import IconRenderer, { AVAILABLE_ICONS } from '../../components/IconRenderer'

const ICON_GROUPS = {
  'ナビゲーション': ['home', 'users', 'image', 'smartphone', 'shield'],
  '音楽・エンタメ': ['music', 'mic', 'headphones', 'radio', 'volume-2', 'play', 'disc-3'],
  'ゲーム': ['gamepad-2', 'zap', 'star'],
  'コミュニケーション': ['message-circle', 'mail-x', 'heart'],
  'アワード': ['trophy', 'crown', 'award', 'sparkles', 'gift', 'party-popper'],
  'UI': ['alert-triangle', 'refresh-cw', 'tag', 'palette', 'bar-chart-3', 'file-text', 'rocket', 'clock', 'wine'],
}

const IconPicker = ({ value, onChange, label }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [customEmoji, setCustomEmoji] = useState('')

  const filteredGroups = useMemo(() => {
    if (!search) return ICON_GROUPS
    const result = {}
    Object.entries(ICON_GROUPS).forEach(([group, icons]) => {
      const filtered = icons.filter(icon => icon.includes(search.toLowerCase()))
      if (filtered.length > 0) result[group] = filtered
    })
    return result
  }, [search])

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {label && <label className="text-sm font-body text-light-blue">{label}</label>}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg hover:border-amber transition-all text-sm"
        >
          <IconRenderer icon={value} size={16} />
          <span className="text-gray-400 text-xs">変更</span>
        </button>
      </div>

      {open && (
        <div className="absolute z-50 mt-2 w-72 glass-effect border border-light-blue/30 rounded-xl overflow-hidden shadow-lg">
          <div className="p-2 border-b border-light-blue/20">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="アイコン名で検索..."
              className="w-full px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber text-xs"
            />
          </div>

          <div className="max-h-52 overflow-y-auto p-2">
            {Object.entries(filteredGroups).map(([group, icons]) => (
              <div key={group} className="mb-2">
                <div className="text-[10px] text-gray-500 px-1 mb-1">{group}</div>
                <div className="grid grid-cols-6 gap-1">
                  {icons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => { onChange(icon); setOpen(false) }}
                      className={`p-2 rounded-lg transition-all flex items-center justify-center ${
                        value === icon
                          ? 'bg-light-blue/20 border border-light-blue/50'
                          : 'hover:bg-light-blue/10'
                      }`}
                      title={icon}
                    >
                      <IconRenderer icon={icon} size={16} className="text-gray-300" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-2 border-t border-light-blue/20">
            <div className="text-[10px] text-gray-500 mb-1">カスタム絵文字</div>
            <div className="flex gap-1">
              <input
                type="text"
                value={customEmoji}
                onChange={(e) => setCustomEmoji(e.target.value)}
                placeholder="絵文字を入力"
                className="flex-1 px-2 py-1 glass-effect border border-light-blue/30 rounded text-white text-xs focus:outline-none focus:border-amber"
              />
              <button
                type="button"
                onClick={() => { if (customEmoji) { onChange(customEmoji); setCustomEmoji(''); setOpen(false) } }}
                className="px-2 py-1 bg-amber/20 border border-amber/50 rounded text-amber text-xs"
              >
                決定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IconPicker
