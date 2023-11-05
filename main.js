const wrapper = document.getElementById("wrapper")
const todoInput = document.getElementById("todo-input")
const addButton = document.getElementById("add-button")
const todoList = document.getElementById("todo-list")
const LOCAL_KEY = "simpleTodoList"

addButton.disabled = true

todoInput.addEventListener("input", toggleButton)

addButton.addEventListener("click", () => {
  if (todoInput.value.trim() === "") return
  const listItem = document.createElement("li")
  const listHeading = document.createElement("h2")
  const listButton = document.createElement("button")
  listHeading.textContent = todoInput.value.trim()
  listButton.textContent = "X"
  listButton.classList.add("delete-button")
  listItem.appendChild(listHeading)
  listItem.appendChild(listButton)
  todoList.appendChild(listItem)
  saveTodoList()
  todoInput.value = ""
  listButton.addEventListener("click", (e) => {
    e.target.parentNode.remove()
    saveTodoList()
  })
  toggleButton()
})

function toggleButton() {
  todoInput.value.trim() !== ""
    ? (addButton.disabled = false)
    : (addButton.disabled = true)
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
      const listItem = document.createElement("li")
      const listHeading = document.createElement("h2")
      const listButton = document.createElement("button")
      listHeading.textContent = item
      listButton.textContent = "X"
      listButton.classList.add("delete-button")
      listItem.appendChild(listHeading)
      listItem.appendChild(listButton)
      todoList.appendChild(listItem)
      listButton.addEventListener("click", (e) => {
        e.target.parentNode.remove()
        saveTodoList()
      })
    })
  }
}

loadTodoList()
