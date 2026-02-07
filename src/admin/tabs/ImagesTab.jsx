const ImageField = ({ label, value, onChange, description }) => (
  <div className="mb-6">
    <label className="block text-sm font-body text-light-blue mb-1">{label}</label>
    {description && <p className="text-xs text-gray-500 mb-1">{description}</p>}
    <input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder="./image.png"
      className="w-full px-4 py-2 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber transition-all text-sm mb-2"
    />
    {value && (
      <div className="glass-effect rounded-lg border border-light-blue/20 p-2 mt-2">
        <img
          src={value}
          alt={label}
          className="max-h-32 mx-auto object-contain rounded"
          onError={(e) => { e.target.style.display = 'none' }}
        />
      </div>
    )}
  </div>
)

const ImagesTab = ({ config, updateConfig }) => {
  return (
    <div>
      <h2 className="text-2xl font-body text-light-blue mb-6">画像設定</h2>
      <p className="text-sm text-gray-400 mb-6">ヘッダー画像を設定します。画像ファイルを public/ フォルダに配置し、相対パスで指定してください。</p>

      <h3 className="text-lg font-body text-amber mb-4">ヘッダー画像</h3>
      <ImageField
        label="デスクトップ版ヘッダー"
        value={config.images.headerDesktop}
        onChange={(v) => updateConfig('images.headerDesktop', v)}
        description="横幅1200px以上推奨。高さ600pxで表示されます。"
      />
      <ImageField
        label="モバイル版ヘッダー"
        value={config.images.headerMobile}
        onChange={(v) => updateConfig('images.headerMobile', v)}
        description="横幅768px以上推奨。高さ300pxで表示されます。"
      />
    </div>
  )
}

export default ImagesTab
