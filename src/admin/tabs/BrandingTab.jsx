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

import { useState } from 'react'
import { FONT_PRESETS, BODY_FONT_PRESETS } from '../../lib/presets'
import FontPicker from '../components/FontPicker'

const BrandingTab = ({ config, updateConfig }) => {
  const [showDisplayPicker, setShowDisplayPicker] = useState(false)
  const [showBodyPicker, setShowBodyPicker] = useState(false)

  const applyDisplayPreset = (preset) => {
    updateConfig('fonts.display', preset.fonts.display)
    updateConfig('fonts.displayUrl', preset.fonts.displayUrl)
  }

  const applyBodyPreset = (preset) => {
    updateConfig('fonts.body', preset.body)
    updateConfig('fonts.bodyUrl', preset.googleFontsUrl || '')
  }

  const handleDisplayFontSelect = (font) => {
    updateConfig('fonts.display', font.cssFamily)
    updateConfig('fonts.displayUrl', font.cssUrl)
    setShowDisplayPicker(false)
  }

  const handleBodyFontSelect = (font) => {
    updateConfig('fonts.body', font.cssFamily)
    updateConfig('fonts.bodyUrl', font.cssUrl)
    setShowBodyPicker(false)
  }

  return (
    <div>
      <h2 className="text-2xl font-body text-light-blue mb-6">ブランディング</h2>
      <p className="text-sm text-gray-400 mb-6">サイト名やフッターのテキストを設定します。</p>

      <Field
        label="サイト名（ヘッダー表示）"
        value={config.brand.name}
        onChange={(v) => updateConfig('brand.name', v)}
        placeholder="サイト名やブランド名を入力"
        description="ヘッダー画像上に大きく表示されるタイトル"
      />

      <div className="mb-5 flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
          <input
            type="checkbox"
            checked={config.brand.showTitle !== false}
            onChange={(e) => updateConfig('brand.showTitle', e.target.checked)}
            className="accent-amber"
          />
          ヘッダーにタイトルを表示
        </label>
      </div>

      {config.brand.showTitle !== false && (
        <div className="mb-5 space-y-3 ml-4 border-l-2 border-light-blue/20 pl-4">
          <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={config.brand.titleGradient !== false}
              onChange={(e) => updateConfig('brand.titleGradient', e.target.checked)}
              className="accent-amber"
            />
            タイトルにグラデーションを適用
          </label>
          <p className="text-xs text-gray-500">OFFにすると単色（プライマリカラー）で表示されます</p>

          {config.brand.titleGradient !== false && (
            <div>
              <label className="block text-xs text-gray-500 mb-1">グラデーション方向</label>
              <select
                value={config.brand.titleGradientDirection || 'to-r'}
                onChange={(e) => updateConfig('brand.titleGradientDirection', e.target.value)}
                className="px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg text-white text-sm focus:outline-none focus:border-amber bg-transparent"
              >
                <option value="to-r">右へ →</option>
                <option value="to-l">左へ ←</option>
                <option value="to-b">下へ ↓</option>
                <option value="to-t">上へ ↑</option>
                <option value="to-br">右下へ ↘</option>
                <option value="to-bl">左下へ ↙</option>
                <option value="to-tr">右上へ ↗</option>
                <option value="to-tl">左上へ ↖</option>
              </select>
            </div>
          )}
        </div>
      )}

      <Field
        label="サイドバータイトル"
        value={config.brand.sidebarTitle}
        onChange={(v) => updateConfig('brand.sidebarTitle', v)}
        placeholder="短縮名やブランド名を入力"
        description="デスクトップ版サイドバーに表示されるブランド名"
      />
      <Field
        label="ページタイトル"
        value={config.brand.pageTitle}
        onChange={(v) => updateConfig('brand.pageTitle', v)}
        placeholder="サイト名 - 特典管理"
        description="ブラウザタブに表示されるタイトル"
      />

      <hr className="border-light-blue/20 my-8" />
      <h3 className="text-lg font-body text-amber mb-4">フッター設定</h3>

      <Field
        label="フッターメインテキスト"
        value={config.brand.footerText}
        onChange={(v) => updateConfig('brand.footerText', v)}
        placeholder="フッターに表示するメインテキスト"
      />
      <Field
        label="フッターサブテキスト"
        value={config.brand.footerSubText}
        onChange={(v) => updateConfig('brand.footerSubText', v)}
        placeholder="フッターに表示するサブテキスト"
      />
      <Field
        label="フッター注記"
        value={config.brand.footerNote}
        onChange={(v) => updateConfig('brand.footerNote', v)}
        placeholder="フッター下部の補足テキスト"
      />

      <hr className="border-light-blue/20 my-8" />
      <h3 className="text-lg font-body text-amber mb-4">ローディング表示</h3>

      <div className="grid grid-cols-2 gap-4">
        <Field
          label="ローディング絵文字"
          value={config.brand.loadingEmoji}
          onChange={(v) => updateConfig('brand.loadingEmoji', v)}
          placeholder="絵文字を1つ入力"
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

      <button
        onClick={() => setShowDisplayPicker(!showDisplayPicker)}
        className="mb-4 px-4 py-2 bg-light-blue/10 hover:bg-light-blue/20 border border-light-blue/30 rounded-lg transition-all text-light-blue text-xs font-body"
      >
        {showDisplayPicker ? 'フォントブラウザを閉じる' : 'もっと探す（60+フォント）'}
      </button>

      {showDisplayPicker && (
        <div className="mb-4">
          <FontPicker onSelect={handleDisplayFontSelect} onClose={() => setShowDisplayPicker(false)} />
        </div>
      )}

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

      <button
        onClick={() => setShowBodyPicker(!showBodyPicker)}
        className="mb-4 px-4 py-2 bg-light-blue/10 hover:bg-light-blue/20 border border-light-blue/30 rounded-lg transition-all text-light-blue text-xs font-body"
      >
        {showBodyPicker ? 'フォントブラウザを閉じる' : 'もっと探す（60+フォント）'}
      </button>

      {showBodyPicker && (
        <div className="mb-4">
          <FontPicker onSelect={handleBodyFontSelect} onClose={() => setShowBodyPicker(false)} />
        </div>
      )}

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
