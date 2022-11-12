import React from 'react'
import { TodolistType } from './Todolist-api'

type FilterValuesType = 'all' | 'active' | 'completed'

// export type TodolistType = {
//   id: string
//   title: string
//   filter: string
// }

export type TodolistDomainType = TodolistType & { filter: string }

const initialState: Array<TodolistDomainType> = []
// const initialState: Array<TodolistType> = []

type TodolistReducerType = TasksFilterValueACType | RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleACType

export const todolistReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: TodolistReducerType
): Array<TodolistDomainType> => {
  switch (action.type) {
    case 'TASKS_FILTER_VALUE': {
      return state.map(todolist =>
        todolist.id === action.payload.todolistID ? { ...todolist, filter: action.payload.filterValue } : todolist
      )
    }
    case 'REMOVE_TODOLIST': {
      return state.filter(todolist => todolist.id !== action.payload.todolistID)
    }
    case 'ADD_TODOLIST': {
      return [{ id: action.payload.todolistID, title: action.payload.todolistTitle, addedDate: '', order: 0, filter: 'all' }, ...state]
    }
    case 'CHANGE_TODOLIST_TITLE': {
      return state.map(todolist =>
        todolist.id === action.payload.todolistID ? { ...todolist, title: action.payload.todolistTitle } : todolist
      )
    }
    default:
      return state
  }
}

type TasksFilterValueACType = ReturnType<typeof tasksFilterValueAC>
export const tasksFilterValueAC = (todolistID: string, filterValue: FilterValuesType) => {
  return {
    type: 'TASKS_FILTER_VALUE',
    payload: {
      todolistID: todolistID,
      filterValue: filterValue,
    },
  } as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    payload: {
      todolistID: todolistID,
    },
  } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolistID: string, todolistTitle: string) => {
  return {
    type: 'ADD_TODOLIST',
    payload: {
      todolistID: todolistID,
      todolistTitle: todolistTitle,
    },
  } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID: string, todolistTitle: string) => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    payload: {
      todolistID: todolistID,
      todolistTitle: todolistTitle,
    },
  } as const
}
