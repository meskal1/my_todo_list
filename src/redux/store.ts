import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { appReducer } from '../app/AppReducer'
import { authReducer } from '../features/login/AuthReducer'
import { taskReducer } from '../features/todolists/todolist/task/TaskReducer'
import { todolistReducer } from '../features/todolists/todolist/TodolistReducer'

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  isLoggedIn: authReducer,
})

export const store = configureStore({ reducer: rootReducer })

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatchType = typeof store.dispatch

//@ts-ignore
window.store = store
