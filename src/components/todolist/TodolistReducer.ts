import React from 'react'
// import { store } from '../../redux/store'
import { AnyAction, Dispatch } from 'redux'
// import type { Dispatch } from 'redux-thunk/extend-redux'
import { todolistAPI, TodolistType } from './Todolist-api'

type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & { filter: string }

const initialState: Array<TodolistDomainType> = []

type TodolistReducerType =
  | TasksFilterValueACType
  | RemoveTodolistACType
  | AddTodolistACType
  | ChangeTodolistTitleACType
  | SetTodolistsACType

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
    case 'SET_TODOLISTS': {
      return action.payload.todolists.map(obj => ({ ...obj, filter: 'all' }))
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
      todolistID,
      filterValue,
    },
  } as const
}

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
  return {
    type: 'REMOVE_TODOLIST',
    payload: {
      todolistID,
    },
  } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolistID: string, todolistTitle: string) => {
  return {
    type: 'ADD_TODOLIST',
    payload: {
      todolistID,
      todolistTitle,
    },
  } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistID: string, todolistTitle: string) => {
  return {
    type: 'CHANGE_TODOLIST_TITLE',
    payload: {
      todolistID,
      todolistTitle,
    },
  } as const
}

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return {
    type: 'SET_TODOLISTS',
    payload: {
      todolists,
    },
  } as const
}

// type Dispatch = typeof store.dispatch

// export const fetchTodolistsTC = (dispatch: Dispatch) => {
//   todolistAPI.getTodolists().then(res => {
//     dispatch(setTodolistsAC(res.data))
//   })
// }

export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch<any | AnyAction>): any => {
    todolistAPI.getTodolists().then(res => {
      dispatch(setTodolistsAC(res.data))
    })
  }
}
