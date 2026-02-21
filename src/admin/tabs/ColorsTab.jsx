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

// CSS color-mix() の近似計算（ピッカー表示用）
const blendWithWhite = (hex, ratio) => {
  if (!hex || !/^#[0-9a-f]{6}$/i.test(hex)) return '#ffffff'
  const r = Math.round(parseInt(hex.slice(1, 3), 16) * ratio + 255 * (1 - ratio))
  const g = Math.round(parseInt(hex.slice(3, 5), 16) * ratio + 255 * (1 - ratio))
  const b = Math.round(parseInt(hex.slice(5, 7), 16) * ratio + 255 * (1 - ratio))
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

// baseKey: 未設定時のカラーピッカー表示に使うベースカラーのキー名
const AREA_COLOR_FIELDS = [
  { key: 'headerGradientStart', label: 'ヘッダーグラデーション（中央）', baseKey: 'oceanTeal', description: 'ヘッダー背景の中央グラデーション。未設定 → 背景中間色' },
  { key: 'headerGradientEnd',   label: 'ヘッダーグラデーション（両端）', baseKey: 'deepBlue',  description: 'ヘッダー背景の左右端グラデーション。未設定 → 背景メインと同じ' },
  { key: 'primaryText',         label: 'メインテキスト色',               baseKey: 'lightBlue', description: 'セクションタイトル（Ranking・Targets）、カード内ラベル等。未設定 → UIメインカラー' },
  { key: 'accentText',          label: 'アクセントテキスト色',           baseKey: 'amber',     description: '目標の▸矢印・FAQタイトル・質問文・ホバー強調等。未設定 → UIアクセントカラー' },
  { key: 'rank1Card',           label: '1位カード強調色',                baseKey: 'accent',    description: '1位カードのボーダー・ポイント数テキスト。未設定 → 強調色' },
  { key: 'titleColor',          label: 'タイトルテキスト色',             baseKey: 'lightBlue', description: 'ヘッダーのサイト名テキスト（グラデーションOFF時のみ有効）。未設定 → UIメインカラー' },
  { key: 'nameText',            label: 'カード名前テキスト色',           baseKey: 'lightBlue', description: 'ランキング名・特典管理名・枠内アイコンのユーザー名。未設定 → UIメインカラーの白混ぜ20%（薄い同系色）' },
  { key: 'footerText',          label: 'フッターテキスト色',             baseKey: 'amber',     description: 'フッターのメインテキスト。未設定 → UIアクセントカラー' },
  { key: 'contentText',         label: 'コンテンツ本文テキスト色',       baseKey: 'lightBlue', description: '目標の内容・FAQ回答・特典ポップアップのテキスト。未設定 → UIメインカラーの白混ぜ10%（名前より薄い同系色）' },
]

const ColorsTab = ({ config, updateConfig }) => {
  const applyPreset = (preset) => {
    // まず全オーバーライドをクリア（残存防止）
    AREA_COLOR_FIELDS.forEach(({ key }) => {
      updateConfig(`colorOverrides.${key}`, '')
    })
    // ベースカラーを適用
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
        label="背景メイン"
        value={config.colors.deepBlue}
        onChange={(v) => updateConfig('colors.deepBlue', v)}
        description="サイト背景のメインカラー（最暗部）"
      />
      <ColorField
        label="背景グラデーション（中間色）"
        value={config.colors.oceanTeal}
        onChange={(v) => updateConfig('colors.oceanTeal', v)}
        description="背景グラデーションの中間色"
      />
      <ColorField
        label="UIメインカラー"
        value={config.colors.lightBlue}
        onChange={(v) => updateConfig('colors.lightBlue', v)}
        description="テキスト、ボーダー、ボタンなどに使われるメインカラー"
      />
      <ColorField
        label="UIアクセントカラー"
        value={config.colors.amber}
        onChange={(v) => updateConfig('colors.amber', v)}
        description="目標、名前のホバー、ボトルラベルなどのアクセントカラー"
      />
      <ColorField
        label="強調色（1位カード・エラー）"
        value={config.colors.accent}
        onChange={(v) => updateConfig('colors.accent', v)}
        description="1位のランキングカード、エラー表示などの強調色"
      />
      <ColorField
        label="プレミアムカラー"
        value={config.colors.gold}
        onChange={(v) => updateConfig('colors.gold', v)}
        description="メンバーシップなどプレミアム要素のカラー"
      />

      <hr className="border-light-blue/20 my-8" />
      <h3 className="text-lg font-body text-amber mb-2">エリア別カラー（オプション）</h3>
      <p className="text-xs text-gray-500 mb-6">
        未設定の場合、上のベースカラーが適用されます。特定のUI要素だけ色を変えたい場合に設定してください。
      </p>

      {AREA_COLOR_FIELDS.map(({ key, label, description, baseKey }) => {
        const value = config.colorOverrides?.[key] || ''
        // nameText/contentTextはCSS color-mix()と同じ比率でJS側でもブレンドして表示
        const computedDefault =
          key === 'nameText'    ? blendWithWhite(config.colors?.lightBlue, 0.2) :
          key === 'contentText' ? blendWithWhite(config.colors?.lightBlue, 0.1) :
          config.colors?.[baseKey] || '#000000'
        const pickerValue = value || computedDefault
        return (
          <div key={key} className="mb-5">
            <label className="block text-sm font-body text-light-blue mb-1">{label}</label>
            {description && <p className="text-xs text-gray-500 mb-1">{description}</p>}
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={pickerValue}
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
              <div
                className="w-10 h-10 rounded-lg border border-light-blue/30"
                style={{ backgroundColor: pickerValue }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ColorsTab
