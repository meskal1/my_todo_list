import { combineReducers } from 'redux'

import { authReducer } from '../features/auth/authSlice'
import { taskReducer } from '../features/todolists/Task/taskSlice'
import { todolistReducer } from '../features/todolists/Todolist/todolistSlice'

import { appReducer } from './appSlice'

export const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  isLoggedIn: authReducer,
})
