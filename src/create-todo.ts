import { changeColorDate } from './change-color-date.ts'
import { type Todo, postTodoFetch, takeTodoFetch } from './file-save.ts'
import {
  checkOverdue,
  handleCheckboxChange,
  handleDeleteClick,
} from './handle-and-check.ts'

export const createTodoElement = (
  todo: Todo,
  listBox: HTMLUListElement,
  overdueDate: HTMLParagraphElement,
) => {
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.checked = todo.done
  const trashButtonImage = document.createElement('img')
  trashButtonImage.setAttribute('src', '/web-todo/trash-can-solid.svg')
  trashButtonImage.style.width = '20px'
  trashButtonImage.style.height = '20px'
  const button = document.createElement('button')
  button.append(trashButtonImage)
  button.classList.add('button-delete-single-todo')
  const li = document.createElement('li')
  li.textContent = `${todo.title}\xa0\xa0 - \xa0\xa0${todo.due_date}`
  li.appendChild(checkbox)
  li.appendChild(button)
  listBox.appendChild(li)
  changeColorDate(li, todo.due_date)
  checkbox.addEventListener('change', handleCheckboxChange(todo))
  button.addEventListener(
    'click',
    handleDeleteClick(todo, li, listBox, overdueDate),
  )
}

export const handleAddTodo = async (
  inputBox: HTMLInputElement,
  datetime: HTMLInputElement,
  errorBox: HTMLParagraphElement,
  listBox: HTMLUListElement,
  overdueDate: HTMLParagraphElement,
) => {
  const todoText = inputBox.value.trim() || ''
  const savedDate = datetime.value.trim()

  if (todoText.length > 200) {
    errorBox.innerText = 'todo cant take more than 200 characters'
    inputBox.value = ''
    return
  }
  if (todoText === '') {
    errorBox.innerText = 'please enter something'
    inputBox.value = ''
    return
  }
  if (savedDate) {
    const parsedDate = new Date(savedDate)
    if (Number.isNaN(parsedDate.getTime())) {
      errorBox.innerText = 'pls enter a valid date'
      datetime.value = ''
      return
    }
  }
  if (todoText !== '') {
    const newTodo = {
      title: todoText,
      due_date: savedDate,
      done: false,
    }
    await postTodoFetch(<Todo>newTodo, listBox, overdueDate)
    const todos = await takeTodoFetch()
    listBox.innerHTML = ''

    for (const todo of todos) {
      createTodoElement(todo, listBox, overdueDate)
    }
    checkOverdue(listBox, overdueDate)
    inputBox.value = ''
    datetime.value = ''
    errorBox.innerText = ''
  }
}
