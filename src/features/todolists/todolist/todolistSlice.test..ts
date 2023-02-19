import { v1 } from 'uuid'

import {
  tasksFilterValue,
  TodolistDomainType,
  todolistReducer,
  setTodolistEntityStatus,
  deleteTodolistTC,
  getTodolistsTC,
  createTodolistTC,
  updateTodolistTitleTC,
} from './todolistSlice'

export const todolistID1 = v1()
export const todolistID2 = v1()
export const startState: Array<TodolistDomainType> = [
  {
    id: todolistID2,
    title: 'Title2',
    filter: 'all',
    addedDate: '',
    order: 0,
    entityStatus: 'idle',
  },
  {
    id: todolistID1,
    title: 'Buy a book',
    filter: 'active',
    addedDate: '',
    order: 0,
    entityStatus: 'idle',
  },
]

test('case should remove todolist', () => {
  const action = deleteTodolistTC.fulfilled(
    { todolistID: 'todolistID1' },
    'requestId',
    'todolistID1'
  )

  const endState: Array<TodolistDomainType> = todolistReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistID2)
})

test('case should add todolist', () => {
  const todolist: TodolistDomainType = {
    id: 'todolistID3',
    title: 'Title2',
    filter: 'all',
    addedDate: '',
    order: 0,
    entityStatus: 'idle',
  }

  const action = createTodolistTC.fulfilled({ todolist }, 'requestId', todolist.title)

  const endState: Array<TodolistDomainType> = todolistReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].id).toBe('todolistID3')
  expect(endState[0].filter).toBe('all')
})

test('case should change todolist title', () => {
  const newTitleTodoList = 'Buy a milk'
  const payload = {
    todolistID: 'todolistID2',
    todolistTitle: newTitleTodoList,
  }

  const action = updateTodolistTitleTC.fulfilled(payload, 'requestId', payload)

  const endState: Array<TodolistDomainType> = todolistReducer(startState, action)

  expect(endState[0].title).toBe('Buy a milk')
})

test('case should change todolist filter value', () => {
  const newFilterValue = 'completed'

  const action = tasksFilterValue({ todolistID: 'todolistID1', filterValue: newFilterValue })

  const endState: Array<TodolistDomainType> = todolistReducer(startState, action)

  expect(endState[1].filter).toBe('completed')
})

test('todolists should be set to the state', () => {
  const action = getTodolistsTC.fulfilled({ todolists: startState }, 'requestId', undefined)

  const endState: Array<TodolistDomainType> = todolistReducer([], action)

  expect(endState.length).toBe(2)
})

test('correct entity status of todolist should be changed', () => {
  const action = setTodolistEntityStatus({ todolistID: 'todolistID1', entityStatus: 'loading' })

  const endState: Array<TodolistDomainType> = todolistReducer(startState, action)

  expect(endState[1].entityStatus).toBe('loading')
  expect(endState[0].entityStatus).toBe('idle')
})
