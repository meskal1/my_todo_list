import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'
import { v1 } from 'uuid'
import { taskReducer } from '../components/todolist/task/TaskReducer'
import { TaskPriorities, TaskStatuses } from '../components/todolist/Todolist-api'
import { todolistReducer } from '../components/todolist/TodolistReducer'
import { AppRootStateType } from '../redux/store'

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
})

const initialGlobalState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0 },
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
      },
    ],
  },
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
