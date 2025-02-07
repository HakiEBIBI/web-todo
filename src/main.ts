import './style.css'
import { createTodoElement, handleAddTodo } from './create-todo.ts'
import { deleteAllTodoFetch, takeTodoFetch } from './file-save.ts'
import { checkOverdue, handleKeyPress } from './handle-and-check.ts'

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
  const removeAllTodos = async () => {
    await deleteAllTodoFetch()
    listBox.innerHTML = ''
    overdueDate.innerText = ''
  }

  takeTodoFetch().then((todos) => {
    for (const todo of todos) {
      createTodoElement(todo, listBox, overdueDate)
    }
    checkOverdue(listBox, overdueDate)
  })

  buttonBox.addEventListener('click', () => {
    handleAddTodo(inputBox, datetime, errorBox, listBox, overdueDate)
    inputBox.value = ''
    datetime.value = ''
  })

  inputBox.addEventListener('keydown', (e) => {
    handleKeyPress(e, buttonBox)
  })

  deleteAllButton.addEventListener('click', removeAllTodos)
}
