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

const BrandingTab = ({ config, updateConfig }) => {
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
    </div>
  )
}

export default BrandingTab
