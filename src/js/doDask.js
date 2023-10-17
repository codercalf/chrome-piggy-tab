import { getCommonShadowStyleEl } from '../utils/common-style.js'

const itemStyle = document.createElement('style')
itemStyle.innerHTML = `
  :host {
    min-height: 48px;
    display: flex;
    align-items: center;
    padding: 0 15px !important;
    background-color: var(--bgOpa3);
    border-radius: var(--border-radius);
  }
`

class SwitchInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(getCommonShadowStyleEl())
    this.shadowRoot.appendChild(itemStyle)

    let inputEl = document.createElement('input')
    inputEl.style.display = 'none'
    this.inputEl = inputEl
    inputEl.addEventListener('keydown', e => this.inputFinish(e))

    this.shadowRoot.appendChild(inputEl)

    // 插槽里面的元素，同时可以访问外部和内部的样式表
    let slotEl = document.createElement('slot')
    this.slotEl = slotEl
    slotEl.addEventListener('click', (...arg) => this.handleSlotElClick(...arg))
    this.shadowRoot.appendChild(slotEl)
  }
  inputFinish(e) {
    // 这个事件e，是整个节点的e，不能用来获取值
    if (e.key === 'Enter') {
      let text = this.inputEl.value
      text = text.trim()
      if (!text) {
        console.error('没有输入，重新输入')
        return
      }
    }
  }
  handleSlotElClick(e) {
    const isShowSlot = this.slotEl.style.display !== 'none'
    if (isShowSlot) {
      this.slotEl.style.display = 'none'
      this.inputEl.style.display = 'initial'
    }
  }
}

customElements.define('switch-input', SwitchInput)
class DaskItem extends HTMLElement {
  constructor() {
    super()w
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(getCommonShadowStyleEl())
    this.shadowRoot.appendChild(itemStyle)

    let checkboxEl = document.createElement('input')
    this.checkboxEl = checkboxEl
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.style.marginRight = '5px'
    checkboxEl.addEventListener('click', (...arg) => this.handleCheckboxClick(...arg))
    this.shadowRoot.appendChild(checkboxEl)

    // 插槽里面的元素，同时可以访问外部和内部的样式表
    let slotEl = document.createElement('slot')
    this.shadowRoot.appendChild(slotEl)
  }
  handleCheckboxClick(e) {
    // 点击事件获取到的e.srcElement，为dask-item，应该是在文档结构中DaskItem，是一个单独的节点
    console.log('e', this.checkboxEl.checked)
  }
}

customElements.define('dask-item', DaskItem)

function getList() {
  return JSON.parse(localStorage.get('daskList'))
}
function setList(list) {
  localStorage.set('daskList', JSON.stringify(list))
}
function delRecod(id) {
  let list = getList()
  if (!list.find(i => i.id === id)) {
    console.error('没有站到可删除项目')
    return
  }
  list = list.filter(i => i.id !== id)
}
function addRecord(content) {
  let id = new Date.value()
  let item = { id, content }
  let list = getList()
  list ? list.push(item) : (list = [item])
  setList(list)
}
