import { type Todo, deleteTodoFetch, patchTodoFetch } from './file-save.ts'

export const handleCheckboxChange = (todo: { id: number; done: boolean }) => {
  return async (event: Event) => {
    const checkbox = event.target as HTMLInputElement
    todo.done = checkbox.checked
    await patchTodoFetch(todo)
  }
}

export const handleDeleteClick = (
  deletedTodo: Todo,
  li: HTMLLIElement,
  todoElementsList: HTMLUListElement,
  overdueDate: HTMLParagraphElement,
) => {
  return async () => {
    await deleteTodoFetch(deletedTodo)
    li.remove()
    checkOverdue(todoElementsList, overdueDate)
  }
}

export const checkOverdue = (
  todoElementsList: HTMLUListElement,
  overdueDate: HTMLParagraphElement,
) => {
  overdueDate.innerText = ''
  for (const todo of todoElementsList.children) {
    if (todo.classList.contains('red')) {
      overdueDate.innerText = 'You have overdue todos'
    }
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
