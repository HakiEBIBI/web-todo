import { createTodoElement } from './create-todo.ts'

export interface Todo {
  id: number
  title: string
  content: string
  due_date: string
  done: boolean
}

export async function postTodoFetch(
  postTodo: Todo,
  listBox: HTMLUListElement,
  overdueDate: HTMLParagraphElement,
) {
  await fetch('https://api.todos.in.jt-lab.ch/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postTodo),
  })
  createTodoElement(postTodo, listBox, overdueDate)
}

export async function patchTodoFetch(updatedTodo: {
  id: number
  done: boolean
}) {
  await fetch(`https://api.todos.in.jt-lab.ch/todos?id=eq.${updatedTodo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ done: updatedTodo.done }),
  })
}

export async function deleteTodoFetch(deletedTodo: Todo) {
  await fetch(`https://api.todos.in.jt-lab.ch/todos?id=eq.${deletedTodo.id}`, {
    method: 'DELETE',
  })
}

export async function takeTodoFetch() {
  const response = await fetch('https://api.todos.in.jt-lab.ch/todos', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  })
  return (await response.json()) as Todo[]
}

export async function deleteAllTodoFetch() {
  await fetch('https://api.todos.in.jt-lab.ch/todos', {
    method: 'DELETE',
  })
}
