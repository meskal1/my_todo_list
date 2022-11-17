import { v1 } from 'uuid'
import {
  addTodolistAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolistsAC,
  tasksFilterValueAC,
  TodolistDomainType,
  todolistReducer,
} from './TodolistReducer'

export const todolistID1 = v1()
export const todolistID2 = v1()
export const startState: Array<TodolistDomainType> = [
  { id: todolistID2, title: 'Title2', filter: 'all', addedDate: '', order: 0 },
  { id: todolistID1, title: 'Buy a book', filter: 'active', addedDate: '', order: 0 },
]

test('case should remove todolist', () => {
  const action = removeTodolistAC(todolistID1)

  const endState: Array<TodolistDomainType> = todolistReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})

test('case should add todolist', () => {
  const startState: Array<TodolistDomainType> = [{ id: todolistID2, title: 'Title2', filter: 'all', addedDate: '', order: 0 }]

  const titleTodoList = 'Buy a book'

  const action = addTodolistAC(todolistID1, titleTodoList)

  const endState: Array<TodolistDomainType> = todolistReducer(startState, action)

  expect(endState.length).toBe(2)
  expect(endState[0].id).toBe(todolistID1)
  expect(endState[0].filter).toBe('all')
})

test('case should change todolist title', () => {
  const newTitleTodoList = 'Buy a milk'

  const action = changeTodolistTitleAC(todolistID2, newTitleTodoList)

  const endState: Array<TodolistDomainType> = todolistReducer(startState, action)

  expect(endState[0].title).toBe('Buy a milk')
})

test('case should change todolist filter value', () => {
  const newFilterValue = 'completed'

  const action = tasksFilterValueAC(todolistID1, newFilterValue)

  const endState: Array<TodolistDomainType> = todolistReducer(startState, action)

  expect(endState[1].filter).toBe('completed')
})

test('todolists should be set to the state', () => {
  const action = setTodolistsAC(startState)

  const endState: Array<TodolistDomainType> = todolistReducer([], action)

  expect(endState.length).toBe(2)
})
