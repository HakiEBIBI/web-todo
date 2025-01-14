import './style.css'

console.log('Hello from typescript')

const inputBox = document.querySelector<HTMLInputElement>('#todo-input')
const listBox = document.querySelector<HTMLUListElement>('#todo-element')
const buttonBox = document.querySelector<HTMLButtonElement>('#add-todo-button')
const datetime = document.querySelector<HTMLInputElement>('#datetime-input')
const errorBox = document.querySelector<HTMLParagraphElement>(
  '#todo-creation-error',
)
const deleteAllButton = document.querySelector<HTMLButtonElement>('#delete-all')

if (
  inputBox &&
  listBox &&
  buttonBox &&
  datetime &&
  errorBox &&
  deleteAllButton
) {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]')

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const handleCheckboxChange = (todo: { completed: boolean }) => {
    return (event: Event) => {
      const checkbox = event.target as HTMLInputElement
      todo.completed = checkbox.checked
      saveTodos()
    }
  }
  // function to delete a single todo
  const handleDeleteClick = (index: number, li: HTMLLIElement) => {
    return () => {
      todos.splice(index, 1)
      saveTodos()
      li.remove()
    }
  }

  // Function to delete all todos
  const removeAllTodos = () => {
    todos.length = 0
    saveTodos()
    listBox.innerHTML = ''
  }

  const createTodoElement = (
    todo: { text: string; completed: boolean; date: string },
    index: number,
  ) => {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.completed

    const button = document.createElement('button')
    button.textContent = 'delete'

    const li = document.createElement('li')
    li.textContent = `${todo.text}\xa0\xa0 - \xa0\xa0${todo.date || 'no due date'}`
    li.appendChild(checkbox)
    li.appendChild(button)
    listBox.appendChild(li)

    checkbox.addEventListener('change', handleCheckboxChange(todo))
    button.addEventListener('click', handleDeleteClick(index, li))
  }

  const handleAddTodo = () => {
    const todoText = inputBox.value.trim() || ''
    const savedDate = datetime.value.trim() || 'no due date'

    // check if text length are bigger than 200
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

    // put the user input in a li and clear input box and date time
    if (todoText !== '') {
      const newTodo = {
        text: todoText,
        completed: false,
        date: savedDate || 'no due date',
      }
      todos.push(newTodo)
      saveTodos()
      createTodoElement(newTodo, todos.length - 1)
      if (inputBox) inputBox.value = ''
      if (datetime) datetime.value = ''
      errorBox.innerText = ''
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      buttonBox.click()
    }
  }

  for (const [index, todo] of todos.entries()) {
    createTodoElement(todo, index)
  }

  buttonBox.addEventListener('click', handleAddTodo)
  inputBox.addEventListener('keydown', handleKeyPress)
  deleteAllButton.addEventListener('click', removeAllTodos)
}
