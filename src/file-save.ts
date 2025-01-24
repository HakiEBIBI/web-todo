interface Todo {
  text: string
  completed: boolean
  date: string
}

export const todos: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]')

export const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos))
}
