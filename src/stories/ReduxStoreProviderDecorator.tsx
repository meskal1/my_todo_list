import { Provider } from 'react-redux'
import { combineReducers, legacy_createStore } from 'redux'
import { v1 } from 'uuid'
import { taskReducer } from '../components/todolist/task/TaskReducer'
import { todolistReducer } from '../components/todolist/TodolistReducer'
import { AppRootStateType } from '../redux/store'

const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: taskReducer,
})

const initialGlobalState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all' },
  ],
  tasks: {
    todolistId1: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: false },
    ],
    todolistId2: [
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'React Book', isDone: true },
    ],
  },
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
