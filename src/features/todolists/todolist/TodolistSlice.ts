import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import { TodolistType } from '../../api/Todolist-api'

type FilterValuesType = 'all' | 'active' | 'completed'

// export type TodolistDomainType = TodolistType & { filter: string }

// const initialState = [] as Array<TodolistDomainType>

// const todolistSlice = createSlice({
//   name: 'todolist',
//   initialState,
//   reducers: {
//  tasksFilterValue(state, action: PayloadAction<{ todolistID: string }, { filterValue: FilterValuesType }>) {
//    return state.map(todolist =>
//      todolist.id === action.payload.todolistID ? { ...todolist, filter: action.payload.filterValue } : todolist
//    )
//  },
//  removeTodolist(state, action: PayloadAction<{ todolistID: string }>) {
//    return state.filter(todolist => todolist.id !== action.payload.todolistID)
//  },
//  addTodolist(state, action: PayloadAction<{ todolistID: string; todolistTitle: string }>) {
//    return [{ id: action.payload.todolistID, title: action.payload.todolistTitle, addedDate: '', order: 0, filter: 'all' }, ...state]
//  },
//   },
// })

// export const todolistReducer = todolistSlice.reducer
// export const { tasksFilterValue, removeTodolist, addTodolist } = todolistSlice.actions
