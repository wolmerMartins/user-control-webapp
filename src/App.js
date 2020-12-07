import SwitchRoutes from './components/Router/SwitchRoutes/index.js'
import NavRoute from './components/Router/NavRoute/index.js'

const App = () => {
  SwitchRoutes()
  NavRoute()
}

document.addEventListener('DOMContentLoaded', App)
