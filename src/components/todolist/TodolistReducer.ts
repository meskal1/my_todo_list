import React from 'react'
import { Dispatch } from 'redux'
import { todolistAPI, TodolistType } from '../../api/Todolist-api'

const initialState: Array<TodolistDomainType> = []

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
    case 'DELETE_TODOLIST': {
      return state.filter(todolist => todolist.id !== action.payload.todolistID)
    }
    case 'CREATE_TODOLIST': {
      return [{ id: action.payload.todolist.id, title: action.payload.todolist.title, addedDate: '', order: 0, filter: 'all' }, ...state]
    }
    case 'UPDATE_TODOLIST_TITLE': {
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

// ACTIONS
export const tasksFilterValueAC = (todolistID: string, filterValue: FilterValuesType) => {
  return {
    type: 'TASKS_FILTER_VALUE',
    payload: {
      todolistID,
      filterValue,
    },
  } as const
}

export const deleteTodolistAC = (todolistID: string) => {
  return {
    type: 'DELETE_TODOLIST',
    payload: {
      todolistID,
    },
  } as const
}

export const createTodolistAC = (todolist: TodolistType) => {
  return {
    type: 'CREATE_TODOLIST',
    payload: {
      todolist,
    },
  } as const
}

export const updateTodolistTitleAC = (todolistID: string, todolistTitle: string) => {
  return {
    type: 'UPDATE_TODOLIST_TITLE',
    payload: {
      todolistID,
      todolistTitle,
    },
  } as const
}

export const setTodolistsAC = (todolists: Array<TodolistType>) => {
  return {
    type: 'SET_TODOLISTS',
    payload: {
      todolists,
    },
  } as const
}

// THUNKS
export const fetchTodolistsTC = () => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTodolists().then(res => {
      dispatch(setTodolistsAC(res.data))
    })
  }
}

export const deleteTodolistTC = (todolistID: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistID).then(() => {
      dispatch(deleteTodolistAC(todolistID))
    })
  }
}

export const createTodolistTC = (todolistTitle: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.createTodolist(todolistTitle).then(res => {
      dispatch(createTodolistAC(res.data.data.item))
    })
  }
}

export const updateTodolistTitleTC = (todolistID: string, todolistTitle: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.updateTodolistTitle(todolistID, todolistTitle).then(() => {
      dispatch(updateTodolistTitleAC(todolistID, todolistTitle))
    })
  }
}

// TYPES
type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & { filter: string }

type TodolistReducerType =
  | TasksFilterValueACType
  | DeleteTodolistACType
  | CreateTodolistACType
  | UpdateTodolistTitleACType
  | SetTodolistsACType

type TasksFilterValueACType = ReturnType<typeof tasksFilterValueAC>

export type DeleteTodolistACType = ReturnType<typeof deleteTodolistAC>

export type CreateTodolistACType = ReturnType<typeof createTodolistAC>

type UpdateTodolistTitleACType = ReturnType<typeof updateTodolistTitleAC>

export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
