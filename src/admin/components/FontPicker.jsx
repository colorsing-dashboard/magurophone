import { useState, useMemo, useRef, useEffect } from 'react'
import { FONT_CATEGORIES, FONT_DATABASE } from '../../lib/fontDatabase'

const FontPicker = ({ onSelect, onClose }) => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [loadedFonts, setLoadedFonts] = useState({})
  const containerRef = useRef(null)

  const filtered = useMemo(() => {
    return FONT_DATABASE.filter(font => {
      if (category !== 'all' && font.category !== category) return false
      if (search && !font.family.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, category])

  const loadFont = (font) => {
    if (loadedFonts[font.family]) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = font.cssUrl
    document.head.appendChild(link)
    setLoadedFonts(prev => ({ ...prev, [font.family]: true }))
  }

  // 表示中のフォントを遅延読み込み
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const family = entry.target.dataset.family
            const font = FONT_DATABASE.find(f => f.family === family)
            if (font) loadFont(font)
          }
        })
      },
      { root: containerRef.current, rootMargin: '100px' }
    )

    const items = containerRef.current?.querySelectorAll('[data-family]')
    items?.forEach(item => observer.observe(item))

    return () => observer.disconnect()
  }, [filtered, loadedFonts])

  return (
    <div className="glass-effect border border-light-blue/30 rounded-xl overflow-hidden">
      {/* ヘッダー */}
      <div className="p-3 border-b border-light-blue/20">
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="フォント名で検索..."
            className="flex-1 px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-xs"
          />
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-gray-400 hover:text-white text-xs"
          >
            閉じる
          </button>
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {FONT_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-2 py-1 rounded text-xs whitespace-nowrap transition-all ${
                category === cat.id
                  ? 'bg-light-blue/20 text-light-blue border border-light-blue/50'
                  : 'text-gray-400 hover:text-light-blue'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* フォント一覧 */}
      <div ref={containerRef} className="max-h-64 overflow-y-auto p-2 space-y-1">
        {filtered.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-xs">該当するフォントがありません</div>
        ) : (
          filtered.map(font => (
            <button
              key={font.family}
              data-family={font.family}
              onClick={() => onSelect(font)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-light-blue/10 transition-all group"
            >
              <span
                className="text-white group-hover:text-amber transition-all text-sm block"
                style={{ fontFamily: loadedFonts[font.family] ? font.cssFamily : 'inherit' }}
              >
                {font.family}
              </span>
              <span className="text-[10px] text-gray-500">
                {FONT_CATEGORIES.find(c => c.id === font.category)?.label}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}

export default FontPicker
