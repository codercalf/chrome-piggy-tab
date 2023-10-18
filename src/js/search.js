// custom element
// 在文档树没有加载完成，在constructor 内使用this操作dom，会报错
class OrgSearch extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    let inputEl = document.createElement('input')
    this.inputEl = inputEl
    inputEl.autocomplete = 'off'
    inputEl.classList.add('time')
    inputEl.addEventListener('keydown', e => this.search(e))
    this.appendChild(inputEl)
  }
  search(e) {
    if (e.key === 'Enter') {
      let text = this.inputEl.value
      text = text.trim()
      if (text) location.href = 'https://www.bing.com/search?q=' + text
    }
  }
}

customElements.define('org-search', OrgSearch)
