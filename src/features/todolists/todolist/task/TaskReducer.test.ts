import { createTodolistAC, deleteTodolistAC, setTodolistsAC } from '../TodolistReducer'
import {
  createTaskAC,
  deleteTaskAC,
  setTaskEntityStatusAC,
  setTasksAC,
  TaskExtendedType,
  taskReducer,
  TasksType,
  updateTaskAC,
} from './TaskReducer'
import { startState as todolists, todolistID1 as todolistId1, todolistID2 as todolistId2 } from '../TodolistReducer.test'
import { TaskPriorities, TaskStatuses, TaskType } from '../../../../api/Todolist-api'

const restProps = {
  description: '',
  order: 0,
  priority: TaskPriorities.Low,
  startDate: '',
  deadline: '',
  addedDate: '',
}
const startState: TasksType = {
  todoListID1: [
    { id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todoListID1', entityStatus: 'idle', ...restProps },
    { id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListID1', entityStatus: 'idle', ...restProps },
    { id: '3', title: 'React', status: TaskStatuses.Completed, todoListId: 'todoListID1', entityStatus: 'idle', ...restProps },
  ],
  todoListID2: [
    { id: '1', title: 'Babel', status: TaskStatuses.New, todoListId: 'todoListID2', entityStatus: 'idle', ...restProps },
    { id: '2', title: 'Webpack', status: TaskStatuses.Completed, todoListId: 'todoListID2', entityStatus: 'idle', ...restProps },
    { id: '3', title: 'Gulp', status: TaskStatuses.Completed, todoListId: 'todoListID2', entityStatus: 'idle', ...restProps },
  ],
}

test('case should remove task in correct todolist', () => {
  const action = deleteTaskAC('todoListID1', startState.todoListID1[0].id)

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1.length).toBe(2)
  expect(endState.todoListID1.every(t => t.id != '1')).toBeTruthy()
  expect(endState.todoListID2.length).toBe(3)
})

test('case should add task in correct todolist', () => {
  const task: TaskType = { id: '4', title: 'SCSS', status: TaskStatuses.New, todoListId: 'todoListID1', ...restProps }

  const action = createTaskAC(task)

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1.length).toBe(4)
  expect(endState.todoListID2.length).toBe(3)
  expect(endState.todoListID1[0].id).toBeDefined()
  expect(endState.todoListID1[0].title).toBe('SCSS')
  expect(endState.todoListID1[0].status).toBe(TaskStatuses.New)
})

test('status of specified task should changed', () => {
  const action = updateTaskAC('todoListID2', '3', { status: TaskStatuses.New })

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1[2].status).toBe(TaskStatuses.Completed)
  expect(endState.todoListID2[2].status).toBe(TaskStatuses.New)
})

test('title of specified task should changed', () => {
  const newTitle = 'Scrum'

  const action = updateTaskAC('todoListID2', '3', { title: newTitle })

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1[2].title).toBe('React')
  expect(endState.todoListID2[2].title).toBe('Scrum')
})

test('empty array of tasks should be added when new todolist added', () => {
  const tasks: TasksType = { todoListID1: [...startState.todoListID1] }

  const action = createTodolistAC({ id: 'todolistID3', title: 'Title2', addedDate: '', order: 0 })

  const endState: TasksType = taskReducer(tasks, action)

  const keys = Object.keys(endState)
  const newKey = keys.filter(k => k != 'todoListID1') + ''

  expect(keys.length).toBe(2)
  expect(keys[1]).toBe('todolistID3')
  expect(endState[newKey]).toEqual([])
})

test('array of tasks should be deleted when todolist deleted', () => {
  const action = deleteTodolistAC('todoListID1')

  const endState: TasksType = taskReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(keys[0]).toBe('todoListID2')
})

test('tasks should be added to the state when we set todolists', () => {
  const action = setTodolistsAC(todolists)

  const endState: TasksType = taskReducer({}, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState[todolistId1]).toStrictEqual([])
  expect(endState[todolistId2]).toStrictEqual([])
})

test('tasks should be added for todolist when we set tasks', () => {
  const tasks: TaskExtendedType = startState.todoListID1

  const action = setTasksAC('todoListID1', tasks)

  const endState: TasksType = taskReducer({ todoListID1: [], todoListID2: [] }, action)

  expect(endState.todoListID1.length).toBe(3)
  expect(endState.todoListID2.length).toBe(0)
})

test('entityStatus of specified task should changed', () => {
  const action = setTaskEntityStatusAC('todoListID2', '3', 'loading')

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1[2].entityStatus).toBe('idle')
  expect(endState.todoListID2[2].entityStatus).toBe('loading')
})
