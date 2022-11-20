// import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
// import { taskReducer } from '../components/todolist/task/TaskReducer'
// import { todolistReducer } from '../components/todolist/TodolistReducer'
// import thunk from 'redux-thunk'

// const rootReducer = combineReducers({
//   todolists: todolistReducer,
//   tasks: taskReducer,
// })

// // Автоматическая типизация state в store (всего приложения)
// export type AppRootStateType = ReturnType<typeof rootReducer>
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// //@ts-ignore
// window.store = store

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { taskReducer } from '../components/todolist/task/TaskReducer'
import { todolistReducer } from '../components/todolist/TodolistReducer'
// import { todolistReducer } from '../components/todolist/TodolistSlice'

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
})

export const store = configureStore({ reducer: rootReducer })

// Автоматическая типизация state (всего приложения)
export type RootStateType = ReturnType<typeof store.getState>
// export type RootStateType = ReturnType<typeof rootReducer>
// Типизация того, что мы можем отправлять в state
export type AppDispatchType = typeof store.dispatch

//@ts-ignore
window.store = store
