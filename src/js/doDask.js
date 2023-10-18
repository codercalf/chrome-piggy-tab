const todoList = document.getElementById('todo-list')
const todoInput = document.getElementById('todo-input')
const addTodoEl = document.getElementById('add-todo')
function getList() {
  return JSON.parse(localStorage.getItem('todoList')) || []
}

function init() {
  let list = getList()
  list.forEach(i => addTodo(i))
}
function addRecord(text) {
  let list = getList()
  list.push(text)
  setList(list)
}
function setList(list) {
  localStorage.setItem('todoList', JSON.stringify(list))
}
function delRecord(text) {
  let list = getList().filter(i => i !== text)
  setList(list)
}
function addTodo(todoText) {
  if (!todoText) {
    todoText = todoInput.value.trim()
    let flag = true
    if (getList().find(i => i === todoText)) flag = false
    todoText === '' && (flag = false)
    flag && addRecord(todoText)
    if (!flag) return
  }
  const todoItem = document.createElement('li')
  const textEl = document.createElement('span')
  textEl.innerText = todoText
  textEl.style.display = 'inline-block'
  textEl.style.minWidth = '150px'
  todoItem.appendChild(textEl)
  const deleteButton = document.createElement('button')
  deleteButton.innerText = 'Delete'
  deleteButton.onclick = function () {
    delRecord(textEl.innerText)
    todoList.removeChild(todoItem)
  }

  todoItem.appendChild(deleteButton)
  todoList.appendChild(todoItem)
  todoInput.value = ''
}
function inputFinish(e) {
  if (e.key === 'Enter') {
    addTodo()
  }
}
todoInput.addEventListener('keydown', inputFinish)

addTodoEl.addEventListener('click', addTodo)

init()
