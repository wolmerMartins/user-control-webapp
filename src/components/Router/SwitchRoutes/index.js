import SwitchRoutesController from './controller/index.js'

const template = document.createElement('template')
template.innerHTML = `
  <slot name="routes"></slot>
`

class SwitchRoutes extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: "open" })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this._controller = new SwitchRoutesController()
    this._router = this.shadowRoot.querySelector('slot[name=routes]')
  }

  _onSlotChange = () => {
    const routes = Array.from(this.shadowRoot.host.children)
    routes.forEach((route) => {
      this._controller.routes = {
        path: route.getAttribute('path'),
        component: route.getAttribute('component')
      }
    })
    this._controller.setInitialRoute({})
  }

  connectedCallback() {
    this._router.addEventListener('slotchange', this._onSlotChange)
  }

  disconnectedCallback() {
    this._router.removeEventListener('slotchange', this._onSlotChange)
  }
}

export default () => window.customElements.define('switch-routes', SwitchRoutes)
