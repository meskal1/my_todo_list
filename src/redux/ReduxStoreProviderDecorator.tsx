import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'
import { v1 } from 'uuid'
import { taskReducer } from '../features/todolist/task/TaskReducer'
import { TaskPriorities, TaskStatuses } from '../api/Todolist-api'
import { todolistReducer } from '../features/todolist/TodolistReducer'
import { RootStateType } from './store'
import { appReducer } from '../app/AppReducer'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
  app: appReducer,
})

const initialGlobalState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'loading' },
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
        entityStatus: 'succeeded',
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
        entityStatus: 'succeeded',
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
        entityStatus: 'succeeded',
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
        entityStatus: 'succeeded',
      },
    ],
  },
  app: {
    status: 'loading',
    error: '',
  },
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootStateType, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
