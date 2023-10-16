// 这个在constructor，可以挂载dom，因为this.shadowRoot，已经存在了
class OrgTime extends HTMLElement {
  constructor() {
    super()
    this.textEl = {}
    this.attachShadow({ mode: 'open' })

    let textEl = document.createElement('span')
    this.textEl = textEl
    // 读不到外部的style
    this.textEl.className = 'time'
    this.shadowRoot.append(textEl)
    this.render()
    setInterval(() => this.render(), 10000)
  }
  connectedCallback() {}
  addZeroInDate(num) {
    let str = num.toString()
    str.length === 1 && (str = '0' + str)
    return str
  }
  render() {
    let date = new Date()
    let hour = date.getHours()
    let min = date.getMinutes()
    // let sec = date.getSeconds()
    this.textEl.innerText = `${this.addZeroInDate(hour)}:${this.addZeroInDate(min)}`

    // ${this.addZeroInDate(sec)}
  }
}

customElements.define('org-time', OrgTime)
