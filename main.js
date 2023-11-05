const todoInput = document.getElementById("todo-input")
const addButton = document.getElementById("add-button")
const todoList = document.getElementById("todo-list")
const LOCAL_KEY = "simpleTodoList"

addButton.disabled = true

todoInput.addEventListener("input", toggleButton)
addButton.addEventListener("click", handleAddButton)
loadTodoList()

function toggleButton() {
  addButton.disabled = todoInput.value.trim() === ""
}

function handleAddButton() {
  const inputValue = todoInput.value.trim()
  if (inputValue === "") return
  createTodoItem(inputValue)
  saveTodoList()
  todoInput.value = ""
  toggleButton()
}

function createTodoItem(text) {
  const listItem = document.createElement("li")
  const listHeading = document.createElement("h2")
  const listButton = document.createElement("button")

  listHeading.textContent = text
  listButton.textContent = "X"
  listButton.classList.add("delete-button")

  listItem.appendChild(listHeading)
  listItem.appendChild(listButton)
  todoList.appendChild(listItem)

  listButton.addEventListener("click", (e) => {
    listItem.remove()
    saveTodoList()
  })
}

function saveTodoList() {
  const listItems = todoList.querySelectorAll("li")
  const todoListData = Array.from(listItems).map((listItem) => {
    const text = listItem.querySelector("h2").textContent
    return text
  })
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todoListData))
}

function loadTodoList() {
  const savedTodoList = localStorage.getItem(LOCAL_KEY)
  if (savedTodoList) {
    const todoListData = JSON.parse(savedTodoList)
    todoListData.forEach((item) => {
      createTodoItem(item)
    })
  }
}