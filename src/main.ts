import './style.css'

console.log('Hello from typescript')

const inputBox = document.querySelector<HTMLInputElement>('#todo-input')
const listBox = document.querySelector<HTMLUListElement>('#todo-element')
const buttonBox = document.querySelector<HTMLButtonElement>('#add-todo-button')

if (buttonBox && inputBox && listBox) {
  buttonBox.addEventListener('click', () => {
    const todoText = inputBox.value

    const button = document.createElement('button')
    button.addEventListener('click', () => {})

    if (todoText.trim() !== '') {
      const li = document.createElement('li')
      li.textContent = todoText
      button.textContent = 'delete'
      listBox.appendChild(li)
      listBox.appendChild(button)
      inputBox.value = ''

      button.addEventListener('click', () => {
        li.remove()
        button.remove()
      })
    }
  })
}
