import { useConfig } from '../context/ConfigContext'
import IconRenderer from './IconRenderer'

const Sidebar = ({ currentView, onViewChange, lastUpdate }) => {
  const config = useConfig()
  const enabledViews = config.views.filter(v => v.enabled)

  return (
    <aside className="hidden md:fixed md:flex md:flex-col md:left-0 md:top-0 md:bottom-0 md:w-64 glass-effect border-r border-light-blue/30 z-40 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-ocean-teal via-light-blue to-amber">
          {config.brand.sidebarTitle}
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {enabledViews.map((view) => (
          <button
            key={view.id}
            onClick={() => onViewChange(view.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
              currentView === view.id
                ? 'bg-light-blue/20 border border-light-blue/50 text-light-blue'
                : 'hover:bg-light-blue/10 text-gray-300 hover:text-light-blue'
            }`}
          >
            <IconRenderer icon={view.icon} size={20} />
            <span className="font-body">{view.label}</span>
          </button>
        ))}
      </nav>

      {lastUpdate && (
        <div className="mt-auto pt-6 border-t border-light-blue/20 text-xs text-gray-500">
          {config.ui.lastUpdate}: {lastUpdate.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
        </div>
      )}
    </aside>
  )
}

export default Sidebar
