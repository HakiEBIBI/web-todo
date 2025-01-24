import { saveTodos, todos } from './file-save.ts'

export const handleCheckboxChange = (todo: { completed: boolean }) => {
  return (event: Event) => {
    const checkbox = event.target as HTMLInputElement
    todo.completed = checkbox.checked
    saveTodos()
  }
}
// function to delete a single todo
export const handleDeleteClick = (
  index: number,
  li: HTMLLIElement,
  overdueDate: HTMLParagraphElement,
) => {
  return () => {
    todos.splice(index, 1)
    saveTodos()
    li.remove()
    checkOverdue(overdueDate)
  }
}

export const checkOverdue = (overdueDate: HTMLParagraphElement) => {
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

export const handleKeyPress = (
  event: KeyboardEvent,
  buttonBox: HTMLButtonElement,
) => {
  if (event.key === 'Enter') {
    buttonBox.click()
  }
}
