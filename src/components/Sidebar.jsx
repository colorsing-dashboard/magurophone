import { useConfig } from '../context/ConfigContext'
import IconRenderer from './IconRenderer'

const GRADIENT_DIR = {
  'to-r': 'to right',
  'to-l': 'to left',
  'to-t': 'to top',
  'to-b': 'to bottom',
  'to-br': 'to bottom right',
  'to-bl': 'to bottom left',
  'to-tr': 'to top right',
  'to-tl': 'to top left',
}

const Sidebar = ({ currentView, onViewChange, lastUpdate }) => {
  const config = useConfig()
  const enabledViews = config.views.filter(v => v.enabled)

  return (
    <aside className="hidden md:fixed md:flex md:flex-col md:left-0 md:top-0 md:bottom-0 md:w-64 glass-effect border-r border-card-border/30 z-40 p-6">
      <div className="mb-8">
        {config.brand.titleGradient !== false ? (
          <h1
            className="text-2xl font-display font-black text-transparent bg-clip-text"
            style={{
              backgroundImage: `linear-gradient(${GRADIENT_DIR[config.brand.titleGradientDirection] || 'to right'}, var(--color-ocean-teal), var(--color-light-blue), var(--color-amber))`,
            }}
          >
            {config.brand.sidebarTitle}
          </h1>
        ) : (
          <h1 className="text-2xl font-display font-black text-primary">
            {config.brand.sidebarTitle}
          </h1>
        )}
      </div>

      <nav className="flex-1 space-y-2">
        {enabledViews.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
              currentView === view.id
                ? 'bg-primary/20 border border-primary/50 text-primary'
                : 'hover:bg-primary/10 text-gray-300 hover:text-primary'
            }`}
          >
            <IconRenderer icon={view.icon} size={20} />
            <span className="font-body">{view.label}</span>
          </button>
        ))}
      </nav>

      {lastUpdate && (
        <div className="mt-auto pt-6 border-t border-card-border/20 text-xs text-gray-500">
          {config.ui.lastUpdate}: {lastUpdate.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </aside>
  )
}

export default Sidebar
