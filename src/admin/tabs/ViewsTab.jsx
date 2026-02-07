const ViewsTab = ({ config, updateConfig, updateArray }) => {
  const views = config.views || []

  const updateView = (index, field, value) => {
    const next = views.map((v, i) => i === index ? { ...v, [field]: value } : v)
    updateArray('views', next)
  }

  const moveView = (index, direction) => {
    const next = [...views]
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= next.length) return
    ;[next[index], next[newIndex]] = [next[newIndex], next[index]]
    updateArray('views', next)
  }

  return (
    <div>
      <h2 className="text-2xl font-body text-light-blue mb-6">ビュー管理</h2>
      <p className="text-sm text-gray-400 mb-6">ナビゲーションに表示するビューの有効/無効、ラベル、アイコン、表示順序を設定します。</p>

      <div className="space-y-4">
        {views.map((view, index) => (
          <div key={view.id} className="glass-effect rounded-xl p-4 border border-light-blue/20">
            <div className="flex items-center gap-3 mb-3">
              {/* 並び替えボタン */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveView(index, -1)}
                  disabled={index === 0}
                  className="text-xs px-2 py-0.5 rounded bg-light-blue/10 hover:bg-light-blue/20 text-light-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveView(index, 1)}
                  disabled={index === views.length - 1}
                  className="text-xs px-2 py-0.5 rounded bg-light-blue/10 hover:bg-light-blue/20 text-light-blue disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ▼
                </button>
              </div>

              {/* ON/OFF トグル */}
              <button
                onClick={() => updateView(index, 'enabled', !view.enabled)}
                className={`px-3 py-1 rounded-lg text-xs font-body transition-all ${
                  view.enabled
                    ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                    : 'bg-gray-500/20 border border-gray-500/50 text-gray-400'
                }`}
              >
                {view.enabled ? 'ON' : 'OFF'}
              </button>

              <span className="text-2xl">{view.icon}</span>
              <span className="text-sm font-body text-light-blue font-bold">{view.id}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">ラベル</label>
                <input
                  type="text"
                  value={view.label || ''}
                  onChange={(e) => updateView(index, 'label', e.target.value)}
                  className="w-full px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg text-white text-sm focus:outline-none focus:border-amber"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">アイコン（絵文字）</label>
                <input
                  type="text"
                  value={view.icon || ''}
                  onChange={(e) => updateView(index, 'icon', e.target.value)}
                  className="w-full px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg text-white text-sm focus:outline-none focus:border-amber"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">セクションタイトル</label>
                <input
                  type="text"
                  value={view.title || ''}
                  onChange={(e) => updateView(index, 'title', e.target.value)}
                  placeholder="省略可"
                  className="w-full px-3 py-1.5 glass-effect border border-light-blue/30 rounded-lg text-white placeholder-gray-600 text-sm focus:outline-none focus:border-amber"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewsTab
