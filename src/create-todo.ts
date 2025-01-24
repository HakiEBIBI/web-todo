import {
  checkOverdue,
  handleDeleteClick,
  handleCheckboxChange,
} from './handle-and-check.ts'
import { changeColorDate } from './change-color-date.ts'
import { todos, saveTodos } from './file-save.ts'

export const createTodoElement = (
  todo: { text: string; completed: boolean; date: string },
  index: number,
  listBox: HTMLUListElement,
  overdueDate: HTMLParagraphElement,
) => {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = todo.completed

  const trashButtonImage = document.createElement('img')
  trashButtonImage.setAttribute('src', 'public/trash-can-solid.svg')
  trashButtonImage.style.width = '20px'
  trashButtonImage.style.height = '20px'

  const button = document.createElement('button')
  button.append(trashButtonImage)
  button.classList.add('button-delete-single-todo')

  const li = document.createElement('li')
  li.textContent = `${todo.text}\xa0\xa0 - \xa0\xa0${todo.date}`
  li.appendChild(checkbox)
  li.appendChild(button)
  listBox.appendChild(li)
  changeColorDate(li, todo.date)
  checkOverdue(overdueDate)

  checkbox.addEventListener('change', handleCheckboxChange(todo))
  button.addEventListener('click', handleDeleteClick(index, li, overdueDate))
}

export const handleAddTodo = (
  inputBox: HTMLInputElement,
  datetime: HTMLInputElement,
  errorBox: HTMLParagraphElement,
  listBox: HTMLUListElement,
  overdueDate: HTMLParagraphElement,
) => {
  const todoText = inputBox.value.trim() || ''
  const savedDate = datetime.value.trim() || 'no due date'

  // check if text length are bigger than 200
  if (errorBox && inputBox) {
    if (todoText.length > 200) {
      errorBox.innerText = 'todo cant take more than 200 characters'
      inputBox.value = ''
      return
    }
  }

  if (errorBox && inputBox) {
    if (todoText === '') {
      errorBox.innerText = 'please enter something'
      inputBox.value = ''
      return
    }
  }

  if (savedDate) {
    const parsedDate = new Date(savedDate)
    if (Number.isNaN(parsedDate.getTime())) {
      errorBox.innerText = 'pls enter a valid date'
      datetime.value = ''
      return
    }
  }

  // put the user input in a li and clear input box and date time
  if (todoText !== '') {
    const newTodo = {
      text: todoText,
      completed: false,
      date: savedDate || 'no due date',
    }
    todos.push(newTodo)
    saveTodos()
    createTodoElement(newTodo, todos.length - 1, listBox, overdueDate)
    if (inputBox) inputBox.value = ''
    if (datetime) datetime.value = ''
    errorBox.innerText = ''
  }
}
