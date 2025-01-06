import './style.css'

console.log('Hello from typescript')

const inputBox = document.querySelector<HTMLInputElement>('#todo-input')
const listBox = document.querySelector<HTMLUListElement>('#todo-element')
const buttonBox = document.querySelector<HTMLButtonElement>('#add-todo-button')

if (buttonBox && inputBox && listBox) {
  const todos = JSON.parse(localStorage.getItem('todos') || '[]')

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  for (let i = 0; i < todos.length; i++) {
    const todo = todos[i]

    const li = document.createElement('li')
    li.textContent = todo.text

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = todo.completed

    const button = document.createElement('button')
    button.textContent = 'delete'

    li.appendChild(checkbox)
    li.appendChild(button)
    listBox.appendChild(li)

    checkbox.addEventListener('change', () => {
      todo.completed = checkbox.checked
      saveTodos()
    })

    button.addEventListener('click', () => {
      todos.splice(i, 1)
      saveTodos()
      li.remove()
    })
  }

  buttonBox.addEventListener('click', () => {
    const todoText = inputBox.value

    if (todoText.trim() !== '') {
      const todo = { text: todoText, completed: false }
      todos.push(todo)
      saveTodos()

      const li = document.createElement('li')
      li.textContent = todoText

      const checkbox = document.createElement('input')
      checkbox.type = 'checkbox'

      const button = document.createElement('button')
      button.textContent = 'delete'

      li.appendChild(checkbox)
      li.appendChild(button)
      listBox.appendChild(li)
      inputBox.value = ''

      checkbox.addEventListener('change', () => {
        todo.completed = checkbox.checked
        saveTodos()
      })

      button.addEventListener('click', () => {
        const index = todos.indexOf(todo)
        if (index !== -1) {
          todos.splice(index, 1)
          saveTodos()
          li.remove()
        }
      })
    }
  })

  inputBox.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      buttonBox.click()
    }
  })
}
