import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import thunk from 'redux-thunk'
import { v1 } from 'uuid'

import { TaskStatuses, TaskPriorities } from '../constants/task.enum'
import { authReducer } from '../features/auth/authSlice'
import { taskReducer } from '../features/todolists/Task/taskSlice'
import { todolistReducer } from '../features/todolists/Todolist/todolistSlice'

import { appReducer } from './appSlice'
import { RootStateType } from './store'

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
  isLoggedIn: authReducer,
})

const initialGlobalState = {
  todolists: [
    {
      id: 'todolistId1',
      title: 'What to learn',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'idle',
    },
    {
      id: 'todolistId2',
      title: 'What to buy',
      filter: 'all',
      addedDate: '',
      order: 0,
      entityStatus: 'loading',
    },
  ],
  tasks: {
    todolistId1: [
      {
        id: v1(),
        title: 'HTML&CSS',
        description: '',
        todoListId: 'todolistId1',
        order: 0,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: v1(),
        title: 'JS',
        description: '',
        todoListId: 'todolistId1',
        order: 0,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
    todolistId2: [
      {
        id: v1(),
        title: 'Milk',
        description: '',
        todoListId: 'todolistId2',
        order: 0,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
        entityStatus: 'idle',
      },
      {
        id: v1(),
        title: 'React Book',
        description: '',
        todoListId: 'todolistId2',
        order: 0,
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        addedDate: '',
        entityStatus: 'idle',
      },
    ],
  },
  app: {
    status: 'idle',
    error: '',
    isInitialized: false,
  },
  isLoggedIn: { isLoggedIn: false },
}

export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState as RootStateType,
  applyMiddleware(thunk)
)

export const storeProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
