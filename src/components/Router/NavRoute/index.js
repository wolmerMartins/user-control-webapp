const template = document.createElement('template')
template.innerHTML = '<span></span>'

class NavRoute extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))

    this.shadowRoot.host.setAttribute('slot', 'routes')
  }
}

export default () => window.customElements.define('nav-route', NavRoute)
