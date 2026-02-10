import { useState, useMemo, useEffect, useRef } from 'react'
import IconRenderer, { AVAILABLE_ICONS } from '../../components/IconRenderer'

const ICON_GROUPS = {
  'ナビゲーション': ['home', 'search', 'menu', 'arrow-up', 'arrow-down', 'external-link', 'link', 'eye', 'filter', 'layout-grid', 'list', 'check', 'refresh-cw'],
  '音楽・エンタメ': ['music', 'mic', 'headphones', 'radio', 'volume-2', 'play', 'pause', 'skip-forward', 'skip-back', 'disc-3', 'tv', 'clapperboard', 'popcorn', 'drama', 'dices'],
  'ユーザー': ['users', 'user', 'user-plus', 'user-check', 'contact'],
  'コミュニケーション': ['message-circle', 'message-square', 'mail', 'send', 'phone', 'video'],
  'アワード・実績': ['trophy', 'crown', 'award', 'medal', 'star', 'sparkles', 'party-popper', 'gem', 'target', 'flag'],
  'ショッピング・ギフト': ['gift', 'shopping-cart', 'shopping-bag', 'credit-card', 'banknote', 'coins', 'receipt'],
  '食事・ドリンク': ['wine', 'beer', 'coffee', 'cooking-pot', 'utensils-crossed', 'cherry', 'cake', 'ice-cream-cone'],
  '自然・天気': ['sun', 'moon', 'cloud', 'cloud-rain', 'snowflake', 'flower', 'flower-2', 'tree-pine', 'mountain', 'waves'],
  '動物': ['cat', 'dog', 'bird', 'fish', 'bug', 'rabbit', 'squirrel', 'turtle'],
  'ハート・感情': ['heart', 'heart-handshake', 'thumbs-up', 'thumbs-down', 'smile', 'laugh', 'frown', 'angry'],
  '時間': ['clock', 'calendar', 'calendar-days', 'timer', 'hourglass', 'alarm'],
  'ファイル': ['file-text', 'folder', 'book-open', 'bookmark', 'clipboard-list', 'newspaper', 'notebook-pen'],
  '建物・場所': ['building-2', 'store', 'school', 'landmark', 'map-pin', 'globe', 'compass', 'navigation'],
  'テクノロジー': ['smartphone', 'monitor', 'laptop', 'wifi', 'camera', 'qr-code', 'cpu'],
  'セキュリティ': ['shield', 'shield-check', 'lock', 'unlock', 'key', 'fingerprint'],
  'チャート': ['bar-chart-3', 'trending-up', 'trending-down', 'pie-chart', 'activity'],
  'ツール': ['tag', 'palette', 'rocket', 'alert-triangle', 'info', 'help-circle', 'image', 'download', 'upload', 'edit-3', 'wrench', 'scissors'],
  '交通': ['car', 'bike', 'plane', 'ship', 'train'],
  'その他': ['flame', 'zap', 'lightbulb', 'umbrella', 'glasses', 'shirt', 'watch', 'dumbbell', 'hash', 'infinity', 'circle-dollar-sign'],
}

const IconPicker = ({ value, onChange, label }) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [customEmoji, setCustomEmoji] = useState('')
  const pickerRef = useRef(null)

  // クリック外で閉じる
  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

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
    <div className="relative" ref={pickerRef}>
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
        <div className="absolute z-50 mt-2 w-80 glass-effect border border-light-blue/30 rounded-xl overflow-hidden shadow-lg">
          {/* ヘッダー: 検索 + 閉じるボタン */}
          <div className="p-2 border-b border-light-blue/20 flex gap-2 items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="アイコン名で検索..."
              className="flex-1 px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber text-xs"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 hover:bg-light-blue/10 rounded-lg transition-all text-gray-400 hover:text-white"
              title="閉じる"
            >
              <IconRenderer icon="x" size={16} />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto p-2">
            {Object.entries(filteredGroups).map(([group, icons]) => (
              <div key={group} className="mb-2">
                <div className="text-[10px] text-gray-500 px-1 mb-1">{group}</div>
                <div className="grid grid-cols-8 gap-1">
                  {icons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => { onChange(icon); setOpen(false) }}
                      className={`p-1.5 rounded-lg transition-all flex items-center justify-center ${
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
