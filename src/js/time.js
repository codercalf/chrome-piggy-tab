import { getCommonShadowStyleEl } from '../utils/common-style.js'
// 这个在constructor，可以挂载dom，因为this.shadowRoot，已经存在了
class OrgTime extends HTMLElement {
  constructor() {
    super()
    this.textEl = {}
    this.attachShadow({ mode: 'open' })

    let textEl = document.createElement('span')

    let localStyleEl = document.createElement('style')
    localStyleEl.innerHTML = `
      :host span {
        font-size: 28px;
      }
    `
    this.shadowRoot.appendChild(localStyleEl)
    this.textEl = textEl
    textEl.setAttribute('part', 'span')
    // 读不到外部的style，
    // 访问外部样式方法
    // 1：part
    // 2: css变量
    this.textEl.className = 'time'
    this.shadowRoot.append(getCommonShadowStyleEl())
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
