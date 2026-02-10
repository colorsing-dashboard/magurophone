const ColorField = ({ label, value, onChange, description }) => (
  <div className="mb-5">
    <label className="block text-sm font-body text-light-blue mb-1">{label}</label>
    {description && <p className="text-xs text-gray-500 mb-1">{description}</p>}
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value || '#000000'}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-10 rounded-lg border border-light-blue/30 cursor-pointer bg-transparent"
      />
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#000000"
        className="flex-1 px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm font-mono"
      />
      <div
        className="w-10 h-10 rounded-lg border border-light-blue/30"
        style={{ backgroundColor: value || '#000000' }}
      />
    </div>
  </div>
)

import { COLOR_PRESETS } from '../../lib/presets'

const ColorsTab = ({ config, updateConfig }) => {
  const applyPreset = (preset) => {
    Object.entries(preset.colors).forEach(([key, value]) => {
      updateConfig(`colors.${key}`, value)
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-body text-light-blue mb-6">カラー設定</h2>
      <p className="text-sm text-gray-400 mb-4">プリセットを選ぶか、個別にカスタマイズできます。</p>

      <div className="flex flex-wrap gap-3 mb-8">
        {COLOR_PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            className="flex items-center gap-2 px-3 py-2 glass-effect border border-light-blue/30 rounded-lg hover:border-amber transition-all text-sm"
          >
            <div className="flex gap-1">
              {[preset.colors.deepBlue, preset.colors.lightBlue, preset.colors.amber, preset.colors.accent].map((c, i) => (
                <div key={i} className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="text-gray-300">{preset.name}</span>
          </button>
        ))}
      </div>

      <ColorField
        label="背景メイン（Deep Blue）"
        value={config.colors.deepBlue}
        onChange={(v) => updateConfig('colors.deepBlue', v)}
        description="サイト背景のメインカラー"
      />
      <ColorField
        label="背景アクセント（Ocean Teal）"
        value={config.colors.oceanTeal}
        onChange={(v) => updateConfig('colors.oceanTeal', v)}
        description="背景グラデーションの中間色"
      />
      <ColorField
        label="UI メインカラー（Light Blue）"
        value={config.colors.lightBlue}
        onChange={(v) => updateConfig('colors.lightBlue', v)}
        description="テキスト、ボーダー、ボタンなどに使われるメインカラー"
      />
      <ColorField
        label="ハイライト（Amber）"
        value={config.colors.amber}
        onChange={(v) => updateConfig('colors.amber', v)}
        description="目標、名前のホバー、ボトルラベルなどのアクセントカラー"
      />
      <ColorField
        label="強調色（Accent）"
        value={config.colors.accent}
        onChange={(v) => updateConfig('colors.accent', v)}
        description="1位のランキングカード、エラー表示などの強調色"
      />
      <ColorField
        label="プレミアム（Gold）"
        value={config.colors.gold}
        onChange={(v) => updateConfig('colors.gold', v)}
        description="メンバーシップなどプレミアム要素のカラー"
      />

      <hr className="border-light-blue/20 my-8" />
      <h3 className="text-lg font-body text-amber mb-2">エリア別カラー（オプション）</h3>
      <p className="text-xs text-gray-500 mb-6">
        未設定の場合、上のベースカラーが適用されます。特定のUI要素だけ色を変えたい場合に設定してください。
      </p>

      {AREA_COLOR_FIELDS.map(({ key, label, description }) => {
        const value = config.colorOverrides?.[key] || ''
        return (
          <div key={key} className="mb-5">
            <label className="block text-sm font-body text-light-blue mb-1">{label}</label>
            {description && <p className="text-xs text-gray-500 mb-1">{description}</p>}
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={value || '#000000'}
                onChange={(e) => updateConfig(`colorOverrides.${key}`, e.target.value)}
                className="w-12 h-10 rounded-lg border border-light-blue/30 cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => updateConfig(`colorOverrides.${key}`, e.target.value)}
                placeholder="未設定（ベースカラー使用）"
                className="flex-1 px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm font-mono"
              />
              {value && (
                <button
                  onClick={() => updateConfig(`colorOverrides.${key}`, '')}
                  className="px-3 py-2 text-xs text-gray-400 hover:text-tuna-red transition-all"
                  title="リセット"
                >
                  クリア
                </button>
              )}
              {value && (
                <div
                  className="w-10 h-10 rounded-lg border border-light-blue/30"
                  style={{ backgroundColor: value }}
                />
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

const AREA_COLOR_FIELDS = [
  { key: 'backgroundMain', label: 'ページ背景（メイン）', description: '未設定 → Deep Blue' },
  { key: 'backgroundMid', label: 'ページ背景（中間）', description: '未設定 → Ocean Teal' },
  { key: 'headerGradientStart', label: 'ヘッダーグラデーション（中央）', description: '未設定 → Ocean Teal' },
  { key: 'headerGradientEnd', label: 'ヘッダーグラデーション（両端）', description: '未設定 → Deep Blue' },
  { key: 'primaryText', label: 'メインテキスト色', description: '未設定 → Light Blue' },
  { key: 'accentText', label: 'アクセントテキスト色', description: '未設定 → Amber' },
  { key: 'cardBorder', label: 'カードボーダー', description: '未設定 → Light Blue' },
  { key: 'cardBorderHover', label: 'カードボーダー（ホバー）', description: '未設定 → Amber' },
  { key: 'rank1Card', label: '1位カード強調色', description: '未設定 → Accent' },
]

export default ColorsTab
