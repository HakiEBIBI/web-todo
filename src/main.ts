import './style.css'

console.log('Hello from typescript')

const inputBox: Element | null = document.querySelector('#todo-input')
const listBox: Element | null = document.querySelector('#todo-element')
const buttonBox: Element | null = document.querySelector('#add-todo-button')

if (buttonBox && inputBox && listBox) {
  buttonBox.addEventListener('click', () => {
    const todoText = (inputBox as HTMLInputElement).value

    if (todoText.trim() !== '') {
      const li = document.createElement('li')
      li.textContent = todoText
      listBox.appendChild(li)
      ;(inputBox as HTMLInputElement).value = ''
    }
  })
}
