import { v1 } from 'uuid'
import {
  addTodolistAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  tasksFilterValueAC,
  todolistReducer,
  TodolistType,
} from './TodolistReducer'

test('case should remove todolist', () => {
  const todolistID1 = v1()
  const todolistID2 = v1()
  const startState: Array<TodolistType> = [
    { id: todolistID1, title: 'Title1', filter: 'all' },
    { id: todolistID2, title: 'Title2', filter: 'all' },
  ]

  const action = removeTodolistAC(todolistID1)

  const endState: Array<TodolistType> = todolistReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})

test('case should add todolist', () => {
  const todolistID1 = v1()
  const todolistID2 = v1()
  const startState: Array<TodolistType> = [{ id: todolistID2, title: 'Title2', filter: 'all' }]

  const titleTodoList = 'Buy a book'

  const action = addTodolistAC(todolistID1, titleTodoList)

  const endState: Array<TodolistType> = todolistReducer(startState, action)

  expect(endState.length).toBe(2)
  expect(endState[0].id).toBe(todolistID1)
  expect(endState[0].filter).toBe('all')
})

test('case should change todolist title', () => {
  const todolistID1 = v1()
  const todolistID2 = v1()
  const startState: Array<TodolistType> = [
    { id: todolistID2, title: 'Title2', filter: 'all' },
    { id: todolistID1, title: 'Buy a book', filter: 'all' },
  ]

  const newTitleTodoList = 'Buy a milk'

  const action = changeTodolistTitleAC(todolistID2, newTitleTodoList)

  const endState: Array<TodolistType> = todolistReducer(startState, action)

  expect(endState[0].title).toBe('Buy a milk')
})

test('case should change todolist filter value', () => {
  const todolistID1 = v1()
  const todolistID2 = v1()
  const startState: Array<TodolistType> = [
    { id: todolistID2, title: 'Title2', filter: 'all' },
    { id: todolistID1, title: 'Buy a book', filter: 'active' },
  ]

  const newFilterValue = 'completed'

  const action = tasksFilterValueAC(todolistID1, newFilterValue)

  const endState: Array<TodolistType> = todolistReducer(startState, action)

  expect(endState[1].filter).toBe('completed')
})
