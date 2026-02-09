const Field = ({ label, value, onChange, placeholder, description }) => (
  <div className="mb-5">
    <label className="block text-sm font-body text-light-blue mb-1">{label}</label>
    {description && <p className="text-xs text-gray-500 mb-1">{description}</p>}
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm"
    />
  </div>
)

import { FONT_PRESETS, BODY_FONT_PRESETS } from '../../lib/presets'

const BrandingTab = ({ config, updateConfig }) => {
  const applyDisplayPreset = (preset) => {
    updateConfig('fonts.display', preset.fonts.display)
    updateConfig('fonts.displayUrl', preset.fonts.displayUrl)
  }

  const applyBodyPreset = (preset) => {
    updateConfig('fonts.body', preset.body)
    updateConfig('fonts.bodyUrl', preset.googleFontsUrl || '')
  }

  return (
    <div>
      <h2 className="text-2xl font-body text-light-blue mb-6">ブランディング</h2>
      <p className="text-sm text-gray-400 mb-6">サイト名やフッターのテキストを設定します。</p>

      <Field
        label="サイト名（ヘッダー表示）"
        value={config.brand.name}
        onChange={(v) => updateConfig('brand.name', v)}
        placeholder="BAR MAGUROPHONE"
        description="ヘッダー画像上に大きく表示されるタイトル"
      />
      <Field
        label="サイドバータイトル"
        value={config.brand.sidebarTitle}
        onChange={(v) => updateConfig('brand.sidebarTitle', v)}
        placeholder="MAGUROPHONE"
        description="デスクトップ版サイドバーに表示されるブランド名"
      />
      <Field
        label="ページタイトル"
        value={config.brand.pageTitle}
        onChange={(v) => updateConfig('brand.pageTitle', v)}
        placeholder="深海BAR MAGUROPHONE - 特典管理"
        description="ブラウザタブに表示されるタイトル"
      />

      <hr className="border-light-blue/20 my-8" />
      <h3 className="text-lg font-body text-amber mb-4">フッター設定</h3>

      <Field
        label="フッターメインテキスト"
        value={config.brand.footerText}
        onChange={(v) => updateConfig('brand.footerText', v)}
        placeholder="深海BAR MAGUROPHONE 🐟🎧"
      />
      <Field
        label="フッターサブテキスト"
        value={config.brand.footerSubText}
        onChange={(v) => updateConfig('brand.footerSubText', v)}
        placeholder="単推し・最推し様・メンシプ様募集中です"
      />
      <Field
        label="フッター注記"
        value={config.brand.footerNote}
        onChange={(v) => updateConfig('brand.footerNote', v)}
        placeholder="ファンマ: 🐟🎧"
      />

      <hr className="border-light-blue/20 my-8" />
      <h3 className="text-lg font-body text-amber mb-4">ローディング表示</h3>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="ローディング絵文字"
          value={config.brand.loadingEmoji}
          onChange={(v) => updateConfig('brand.loadingEmoji', v)}
          placeholder="🐟"
        />
        <Field
          label="ローディングテキスト"
          value={config.brand.loadingText}
          onChange={(v) => updateConfig('brand.loadingText', v)}
          placeholder="Loading..."
        />
      </div>

      <hr className="border-light-blue/20 my-8" />
      <h3 className="text-lg font-body text-amber mb-4">タイトルフォント</h3>
      <p className="text-xs text-gray-500 mb-3">ヘッダーやサイドバーのブランド名に使われる装飾フォント</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {FONT_PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyDisplayPreset(preset)}
            className="px-3 py-2 glass-effect border border-light-blue/30 rounded-lg hover:border-amber transition-all text-sm"
          >
            <span className="text-gray-300">{preset.name}</span>
            <span className="text-xs text-gray-500 ml-1">({preset.category})</span>
          </button>
        ))}
      </div>

      <Field
        label="タイトルフォント"
        value={config.fonts?.display}
        onChange={(v) => updateConfig('fonts.display', v)}
        placeholder="'Playfair Display', serif"
      />
      <Field
        label="タイトルフォントURL（Google Fonts）"
        value={config.fonts?.displayUrl}
        onChange={(v) => updateConfig('fonts.displayUrl', v)}
        placeholder="https://fonts.googleapis.com/css2?family=..."
        description="プリセット以外のフォントを使う場合にGoogle FontsのURLを指定"
      />

      <hr className="border-light-blue/20 my-8" />
      <h3 className="text-lg font-body text-amber mb-4">本文フォント</h3>
      <p className="text-xs text-gray-500 mb-3">ボタン、ラベル、説明文など一般テキストに使われるフォント</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {BODY_FONT_PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyBodyPreset(preset)}
            className="px-3 py-2 glass-effect border border-light-blue/30 rounded-lg hover:border-amber transition-all text-sm"
          >
            <span className="text-gray-300">{preset.name}</span>
            <span className="text-xs text-gray-500 ml-1">({preset.category})</span>
          </button>
        ))}
      </div>

      <Field
        label="本文フォント"
        value={config.fonts?.body}
        onChange={(v) => updateConfig('fonts.body', v)}
        placeholder="'Yu Gothic Medium', 'YuGothic', 'Inter', sans-serif"
      />
      <Field
        label="本文フォントURL（Google Fonts）"
        value={config.fonts?.bodyUrl}
        onChange={(v) => updateConfig('fonts.bodyUrl', v)}
        placeholder="https://fonts.googleapis.com/css2?family=..."
        description="プリセット以外のフォントを使う場合にGoogle FontsのURLを指定"
      />
    </div>
  )
}

export default BrandingTab
