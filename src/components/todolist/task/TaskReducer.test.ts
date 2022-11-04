import { addTodolistAC, removeTodolistAC } from '../TodolistReducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer, TasksType } from './TaskReducer'

test('case should remove task in correct todolist', () => {
  const startState: TasksType = {
    todoListID1: [
      { id: '1', title: 'Title1', isDone: false },
      { id: '2', title: 'Title2', isDone: true },
      { id: '3', title: 'Title2', isDone: true },
    ],
    todoListID2: [
      { id: '1', title: 'Title1', isDone: false },
      { id: '2', title: 'Title2', isDone: true },
      { id: '3', title: 'Title2', isDone: true },
    ],
  }

  const action = removeTaskAC('todoListID1', startState.todoListID1[0].id)

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1.length).toBe(2)
  expect(endState.todoListID1.every(t => t.id != '1')).toBeTruthy()
  expect(endState.todoListID2.length).toBe(3)
})

test('case should add task in correct todolist', () => {
  const taskTitle = 'TypeScript'

  const startState: TasksType = {
    todoListID1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: true },
    ],
    todoListID2: [
      { id: '1', title: 'Babel', isDone: false },
      { id: '2', title: 'Webpack', isDone: true },
      { id: '3', title: 'Gulp', isDone: true },
    ],
  }

  const action = addTaskAC('todoListID2', taskTitle)

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1.length).toBe(3)
  expect(endState.todoListID2.length).toBe(4)
  expect(endState.todoListID2[0].id).toBeDefined()
  expect(endState.todoListID2[0].title).toBe(taskTitle)
  expect(endState.todoListID2[0].isDone).toBe(false)
})

test('status of specified task should changed', () => {
  const startState: TasksType = {
    todoListID1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: true },
    ],
    todoListID2: [
      { id: '1', title: 'Babel', isDone: false },
      { id: '2', title: 'Webpack', isDone: true },
      { id: '3', title: 'Gulp', isDone: true },
    ],
  }

  const action = changeTaskStatusAC('todoListID2', '3', false)

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1[2].isDone).toBeTruthy()
  expect(endState.todoListID2[2].isDone).toBeFalsy()
})

test('title of specified task should changed', () => {
  const newTitle = 'Scrum'

  const startState: TasksType = {
    todoListID1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: true },
    ],
    todoListID2: [
      { id: '1', title: 'Babel', isDone: false },
      { id: '2', title: 'Webpack', isDone: true },
      { id: '3', title: 'Gulp', isDone: true },
    ],
  }

  const action = changeTaskTitleAC('todoListID2', '3', newTitle)

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1[2].title).toBe('React')
  expect(endState.todoListID2[2].title).toBe('Scrum')
})

test('empty array of tasks should be added when new todolist added', () => {
  const startState: TasksType = {
    todoListID1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: true },
    ],
  }

  const action = addTodolistAC('todoListID2', 'some title')

  const endState: TasksType = taskReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.filter(k => k != 'todoListID1') + ''

  expect(keys.length).toBe(2)
  expect(keys[1]).toBe('todoListID2')
  expect(endState[newKey]).toEqual([])
})

test('array of tasks should be deleted when todolist deleted', () => {
  const startState: TasksType = {
    todoListID1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: true },
    ],
    todoListID2: [
      { id: '1', title: 'Babel', isDone: false },
      { id: '2', title: 'Webpack', isDone: true },
      { id: '3', title: 'Gulp', isDone: true },
    ],
  }

  const action = removeTodolistAC('todoListID1')

  const endState: TasksType = taskReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(keys[0]).toBe('todoListID2')
})
