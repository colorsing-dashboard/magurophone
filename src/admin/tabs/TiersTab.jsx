import IconRenderer from '../../components/IconRenderer'
import IconPicker from '../components/IconPicker'

const TiersTab = ({ config, updateConfig }) => {
  const tiers = config.benefitTiers || []

  const updateTier = (index, field, value) => {
    const next = tiers.map((t, i) => i === index ? { ...t, [field]: value } : t)
    updateConfig('benefitTiers', next)
  }

  const addTier = () => {
    const existingKeys = new Set(tiers.map(t => t.key))
    let num = tiers.length + 1
    while (existingKeys.has(`tier${num}`)) num++
    const next = [...tiers, {
      key: `tier${num}`,
      icon: '⭐',
      columnIndex: tiers.length + 1,
      displayTemplate: '特典: {value}',
    }]
    updateConfig('benefitTiers', next)
  }

  const removeTier = (index) => {
    if (!confirm(`「${tiers[index].key}」を削除しますか？`)) return
    updateConfig('benefitTiers', tiers.filter((_, i) => i !== index))
  }

  const moveTier = (index, direction) => {
    const next = [...tiers]
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= next.length) return
    ;[next[index], next[newIndex]] = [next[newIndex], next[index]]
    updateConfig('benefitTiers', next)
  }

  return (
    <div>
      <h2 className="text-2xl font-body text-light-blue mb-6">特典ティア設定</h2>
      <p className="text-sm text-gray-400 mb-6">
        特典の段階（ティア）を自由に追加・削除・並び替えできます。
        各ティアはGoogleスプレッドシートの権利者データの列に対応します。
      </p>

      <div className="space-y-4 mb-6">
        {tiers.map((tier, index) => (
          <div key={tier.key} className="glass-effect rounded-xl p-4 border border-light-blue/20">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveTier(index, -1)}
                  disabled={index === 0}
                  className="text-xs px-2 py-0.5 rounded bg-light-blue/10 hover:bg-light-blue/20 text-light-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveTier(index, 1)}
                  disabled={index === tiers.length - 1}
                  className="text-xs px-2 py-0.5 rounded bg-light-blue/10 hover:bg-light-blue/20 text-light-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ▼
                </button>
              </div>
              <IconRenderer icon={tier.icon} size={24} className="text-amber" />
              <span className="text-sm font-body text-amber font-bold">{tier.key}</span>
              <button
                onClick={() => removeTier(index)}
                className="ml-auto text-xs px-2 py-1 rounded bg-tuna-red/10 hover:bg-tuna-red/20 border border-tuna-red/30 text-tuna-red transition-all"
              >
                削除
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">キー（シート上のタイトルと一致させる）</label>
                <input
                  type="text"
                  value={tier.key || ''}
                  onChange={(e) => updateTier(index, 'key', e.target.value)}
                  className="w-full px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg text-white text-sm focus:outline-none focus:border-amber"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">アイコン</label>
                <IconPicker
                  value={tier.icon || ''}
                  onChange={(v) => updateTier(index, 'icon', v)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">列インデックス（権利者データの何列目か、1始まり。0=メニューのみ表示）</label>
                <input
                  type="number"
                  min="0"
                  value={tier.columnIndex ?? 0}
                  onChange={(e) => {
                    const v = parseInt(e.target.value, 10)
                    if (!isNaN(v) && v >= 0) updateTier(index, 'columnIndex', v)
                  }}
                  className="w-full px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg text-white text-sm focus:outline-none focus:border-amber"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">表示テンプレート（{'{value}'} で値を置換）</label>
                <input
                  type="text"
                  value={tier.displayTemplate || ''}
                  onChange={(e) => updateTier(index, 'displayTemplate', e.target.value)}
                  placeholder="特典: {value}曲"
                  className="w-full px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tier.isBoolean || false}
                  onChange={(e) => updateTier(index, 'isBoolean', e.target.checked)}
                  className="accent-amber"
                />
                真偽値型（値の代わりに固定テキストを表示）
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tier.isMembership || false}
                  onChange={(e) => updateTier(index, 'isMembership', e.target.checked)}
                  className="accent-gold"
                />
                メンバーシップ枠（特別スタイル）
              </label>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addTier}
        className="px-4 py-2 bg-amber/20 hover:bg-amber/30 border border-amber/50 rounded-lg transition-all text-amber text-sm font-body"
      >
        + ティアを追加
      </button>
    </div>
  )
}

export default TiersTab
