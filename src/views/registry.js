import HomeView from './HomeView'
import MenuView from './MenuView'
import RightsView from './RightsView'
import IconsView from './IconsView'
import EventView from './EventView'

const VIEW_REGISTRY = {
  home: HomeView,
  menu: MenuView,
  rights: RightsView,
  icons: IconsView,
  events: EventView,
}

export default VIEW_REGISTRY
