import './style.css'
import { createTodoElement, handleAddTodo } from './create-todo.ts'
import { saveTodos, todos } from './file-save.ts'
import { handleKeyPress } from './handle-and-check.ts'

console.log('Hello from typescript')

const inputBox = document.querySelector<HTMLInputElement>('#todo-input')
const listBox = document.querySelector<HTMLUListElement>('#todo-element')
const buttonBox = document.querySelector<HTMLButtonElement>('#add-todo-button')
const datetime = document.querySelector<HTMLInputElement>('#datetime-input')
const errorBox = document.querySelector<HTMLParagraphElement>(
  '#todo-creation-error',
)
const deleteAllButton = document.querySelector<HTMLButtonElement>('#delete-all')
const overdueDate =
  document.querySelector<HTMLParagraphElement>('#overdue-date')

if (
  inputBox &&
  listBox &&
  buttonBox &&
  datetime &&
  errorBox &&
  deleteAllButton &&
  overdueDate
) {
  // Function to delete all todos
  const removeAllTodos = () => {
    todos.length = 0
    saveTodos()
    listBox.innerHTML = ''
    overdueDate.innerText = ''
  }

  for (const [index, todo] of todos.entries()) {
    createTodoElement(todo, index, listBox, overdueDate)
  }

  buttonBox.addEventListener('click', () => {
    handleAddTodo(inputBox, datetime, errorBox, listBox, overdueDate)
  })
  inputBox.addEventListener('keydown', (e) => {
    handleKeyPress(e, buttonBox)
  })
  deleteAllButton.addEventListener('click', removeAllTodos)
}
