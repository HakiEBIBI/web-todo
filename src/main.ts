import './style.css'

console.log('Hello from typescript')

const inputBox = document.querySelector<HTMLInputElement>('#todo-input')
const listBox = document.querySelector<HTMLUListElement>('#todo-element')
const buttonBox = document.querySelector<HTMLButtonElement>('#add-todo-button')

const todos = JSON.parse(localStorage.getItem('todos') || '[]')

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

if (buttonBox && inputBox && listBox) {
  const createTodoElement = (
    todo: { text: string; completed: boolean },
    index: number,
  ) => {
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.completed

    const button = document.createElement('button')
    button.textContent = 'delete'

    const li = document.createElement('li')
    li.textContent = todo.text
    li.appendChild(checkbox)
    li.appendChild(button)
    listBox.appendChild(li)

    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked
      saveTodos()
    })

    button.addEventListener('click', () => {
      todos.splice(index, 1)
      saveTodos()
      li.remove()
    })
  }

  for (const [index, todo] of todos.entries()) {
    createTodoElement(todo, index)
  }

  buttonBox.addEventListener('click', () => {
    const todoText = inputBox.value.trim()

    if (todoText !== '') {
      const newTodo = { text: todoText, completed: false }
      todos.push(newTodo)
      saveTodos()
      createTodoElement(newTodo, todos.length - 1)
      inputBox.value = ''
    }
  })

  inputBox.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      buttonBox.click()
    }
  })
}
