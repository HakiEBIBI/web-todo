//function that check if the date is due and change the color of the todo
export const changeColorDate = (element: HTMLElement, dueDate: string) => {
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
