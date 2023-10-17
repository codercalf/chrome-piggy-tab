import { getCommonShadowStyleEl } from '../utils/common-style.js'

// 此方案实现太多问题：舍弃

// shadow 相当于一个沙盒，访问不到外部的大部分东西，因此各种组件通信太难了，不适合写需要频繁通信的，是个做一些独立功能的组件
// shadow 的事件传递，没有shadow的情况下，e.target始终是事件的触发节点
// 在shadow内触发，shadow内e.target是事件的发起节点，shadow为的e.target为shadow节点
// shadow是拿不到外部节点的

// 难题，子组件向父组件传值，可以通过一些外部独立变量实现，但是有点复杂，舍弃使用shadow实现此方案
const itemStyle = () => {
  let itemStyle = document.createElement('style')
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
  return itemStyle
}

class SwitchInput extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(getCommonShadowStyleEl())

    const localStyle = document.createElement('style')
    localStyle.innerHTML = 'input {background-color: var(--bg);}'
    this.shadowRoot.appendChild(localStyle)
    const inputBoxEl = document.createElement('span')
    inputBoxEl.style.display = 'none'
    this.inputBoxEl = inputBoxEl
    this.shadowRoot.appendChild(inputBoxEl)

    let inputEl = document.createElement('input')
    this.inputEl = inputEl
    inputEl.addEventListener('keydown', e => this.inputFinish(e))
    inputBoxEl.appendChild(inputEl)

    const confirmEl = document.createElement('span')
    confirmEl.innerText = '保存'
    confirmEl.classList.add('pointer', 'primary-color')
    confirmEl.addEventListener('click', e => this.save(e))
    inputBoxEl.appendChild(confirmEl)

    const cancelEl = document.createElement('span')
    cancelEl.innerText = '取消'
    cancelEl.classList.add('pointer', 'primary-color')
    cancelEl.addEventListener('click', e => this.handleCancelClick(e))
    inputBoxEl.appendChild(cancelEl)

    // 插槽里面的元素，同时可以访问外部和内部的样式表
    let slotEl = document.createElement('slot')
    this.slotEl = slotEl
    slotEl.addEventListener('click', (...arg) => this.handleSlotElClick(...arg))
    this.shadowRoot.appendChild(slotEl)
  }
  inputFinish(e) {
    if (e.key === 'Enter') {
      this.save(e)
    }
  }
  save(e) {
    console.log('parent', this.parentNode.parentNode)
    let text = this.inputEl.value
    text = text.trim()
    if (!text) {
      console.error('没有输入，重新输入')
      return
    }
  }
  handleCancelClick(e) {
    this.inputEl.value = ''
    this.slotEl.style.display = 'initial'
    this.inputBoxEl.style.display = 'none'
  }
  handleSlotElClick(e) {
    const isShowSlot = this.slotEl.style.display !== 'none'
    if (isShowSlot) {
      this.slotEl.style.display = 'none'
      this.inputBoxEl.style.display = 'initial'
    }
  }
}

customElements.define('switch-input', SwitchInput)
class DaskShowItem extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(getCommonShadowStyleEl())

    let checkboxEl = document.createElement('input')
    this.checkboxEl = checkboxEl
    checkboxEl.setAttribute('type', 'checkbox')
    checkboxEl.style.marginRight = '5px'
    checkboxEl.addEventListener('click', (...arg) => this.handleCheckboxClick(...arg))
    this.shadowRoot.appendChild(checkboxEl)

    // 这里用不了自定义事件，区分不了是谁触发的
    // const customEvent = new Event('customEvent')
    // this.customEvent = customEvent
    // // 监听该事件。
    // checkboxEl.addEventListener('customEvent', (...arg) => {
    //   console.log('---. eee', arg)
    // })

    // 插槽里面的元素，同时可以访问外部和内部的样式表
    let contentEl = document.createElement('span')
    this.contentEl = contentEl
    this.shadowRoot.appendChild(contentEl)
  }
  connectedCallback() {
    this.contentEl.innerText = this.getAttribute('content')
  }
  handleCheckboxClick(e) {
    console.log('e', e.srcElement, this.checkboxEl.checked)
    // 分派该事件。
    // this.checkboxEl.dispatchEvent(this.customEvent, { detail: 'aaaa' })
  }
}

customElements.define('dask-show-item', DaskShowItem)

class DaskItem extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })

    this.shadowRoot.appendChild(getCommonShadowStyleEl())
    this.shadowRoot.appendChild(itemStyle())

    const daskShowItem = document.createElement('dask-show-item')
    daskShowItem.setAttribute('content', this.getAttribute('content'))

    let switchInputEl = document.createElement('switch-input')
    // switchInputEl.addEventListener('click', e => console.log('----> switchInputEl', e, e.target))
    this.shadowRoot.append(switchInputEl)
    switchInputEl.appendChild(daskShowItem)
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
    console.error('没有找到可删除项目')
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
