class SwitchRoutesController {
  constructor() {
    this._routes = new Map()

    this._init()
  }

  _changeRouteComponent = ({ detail: { path } }) => {
    if (!this.routes.has(path)) {
      history.replaceState({}, '', '/')
      return
    }

    const root = document.querySelector('#App')
    root.innerHTML = this.routes.get(path)
  }

  _setLocationChangeEvent = ({ path = location.pathname, state }) => (
    new CustomEvent('locationchange', { detail: { path, state } })
  )

  _init = () => {
    const self = this
    history.pushState = (f => function pushState() {
      const [state, title, path] = arguments
      const ret = f.apply(this, arguments)
      dispatchEvent(self._setLocationChangeEvent({ path, state }))
      document.title = `${document.title.split(' | ')[0]}${title
        ? ` | ${title}`
        : ''
      }`
      return ret
    })(history.pushState)

    history.replaceState = (f => function replaceState() {
      const [state, title, path] = arguments
      const ret = f.apply(this, arguments)
      dispatchEvent(self._setLocationChangeEvent({ path, state }))
      document.title = `${document.title.split(' | ')[0]}${title
        ? ` | ${title}`
        : ''
      }`
      return ret
    })(history.replaceState)

    addEventListener('locationchange', this._changeRouteComponent)

    addEventListener('popstate', ({ state }) => {
      dispatchEvent(self._setLocationChangeEvent({ state }))
    })
  }

  setInitialRoute = (state) => {
    let path = window.location.pathname
    dispatchEvent(this._setLocationChangeEvent({ path, state }))
  }

  get routes() {
    return this._routes
  }

  set routes(route) {
    this._routes.set(route.path, route.component)
  }
}

export default SwitchRoutesController
