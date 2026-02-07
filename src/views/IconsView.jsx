import { useConfig } from '../context/ConfigContext'
import IconGallery from '../components/IconGallery'

const IconsView = ({ icons, selectedMonth, setSelectedMonth, selectedUser, setSelectedUser, loading }) => {
  const config = useConfig()
  const viewConfig = config.views.find(v => v.id === 'icons') || {}

  return (
    <section>
      <h2 className="text-2xl md:text-4xl font-body mb-6 md:mb-12 text-center text-glow-soft text-amber">
        {viewConfig.title || '🖼️ 枠内アイコン'}
      </h2>
      <IconGallery
        icons={icons}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        loading={loading}
      />
    </section>
  )
}

export default IconsView
