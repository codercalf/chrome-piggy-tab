function handleTextClick(e) {
  e.target.parent
}
function getDaskItemEl(text) {
  const itemBoxEl = document.createElement('div')
  const checkBoxEl = document.createElement('input')
  checkBoxEl.setAttribute('type', 'checkbox')
  const textEl = document.createElement('span')
  textEl.addEventListener('click', handleTextClick)
  textEl.innerText = text
  itemBoxEl.appendChild(checkBoxEl)
  itemBoxEl.appendChild(textEl)
  return itemBoxEl
}
