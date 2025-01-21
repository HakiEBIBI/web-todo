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
const overdueDate =
  document.querySelector<HTMLParagraphElement>('#overdue-date')

interface Todo {
  text: string
  completed: boolean
  date: string
}

if (
  inputBox &&
  listBox &&
  buttonBox &&
  datetime &&
  errorBox &&
  deleteAllButton &&
  overdueDate
) {
  const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')

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
      checkOverdue()
    }
  }

  // Function to delete all todos
  const removeAllTodos = () => {
    todos.length = 0
    saveTodos()
    listBox.innerHTML = ''
    overdueDate.innerText = ''
  }

  //function that check if the date is due and change the color of the todo
  const changeColorDate = (element: HTMLElement, dueDate: string) => {
    const currentDate = new Date()
    const parsedDate = new Date(dueDate)
    const diffTime = parsedDate.getTime() - currentDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      element.classList.add('red')
    } else if (diffDays === 0) {
      element.classList.add('orange')
    } else if (diffDays <= 4) {
      element.classList.add('yellow')
    } else if (diffDays > 4) {
      element.classList.add('green')
    }
  }

  const checkOverdue = () => {
    const overdueTodos = todos.filter((todo) => {
      const parsedDate = new Date(todo.date)
      return parsedDate < new Date()
    }).length

    if (overdueTodos > 0) {
      overdueDate.innerText = `You have ${overdueTodos} overdue todos `
    } else {
      overdueDate.innerText = ''
    }
  }

  const createTodoElement = (
    todo: { text: string; completed: boolean; date: string },
    index: number,
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
    checkOverdue()

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
