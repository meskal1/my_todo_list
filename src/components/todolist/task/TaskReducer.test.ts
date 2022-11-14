import { addTodolistAC, removeTodolistAC } from '../TodolistReducer'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer, TasksType } from './TaskReducer'
import { TaskPriorities, TaskStatuses } from '../Todolist-api'

const restProps = {
  description: '',
  order: 0,
  priority: TaskPriorities.Low,
  startDate: '',
  deadline: '',
  addedDate: '',
}

test('case should remove task in correct todolist', () => {
  const startState: TasksType = {
    todoListID1: [
      { id: '1', title: 'Title1', status: TaskStatuses.New, todoListId: 'todoListID1', ...restProps },
      { id: '2', title: 'Title2', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
      { id: '3', title: 'Title2', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
    ],
    todoListID2: [
      { id: '1', title: 'Title1', status: TaskStatuses.New, todoListId: 'todoListID2', ...restProps },
      { id: '2', title: 'Title2', status: TaskStatuses.Completed, todoListId: 'todoListID2', ...restProps },
      { id: '3', title: 'Title2', status: TaskStatuses.Completed, todoListId: 'todoListID2', ...restProps },
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
      { id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todoListID1', ...restProps },
      { id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
      { id: '3', title: 'React', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
    ],
    todoListID2: [
      { id: '1', title: 'Babel', status: TaskStatuses.New, todoListId: 'todoListID2', ...restProps },
      { id: '2', title: 'Webpack', status: TaskStatuses.Completed, todoListId: 'todoListID2', ...restProps },
      { id: '3', title: 'Gulp', status: TaskStatuses.Completed, todoListId: 'todoListID2', ...restProps },
    ],
  }

  const action = addTaskAC('todoListID2', taskTitle)

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1.length).toBe(3)
  expect(endState.todoListID2.length).toBe(4)
  expect(endState.todoListID2[0].id).toBeDefined()
  expect(endState.todoListID2[0].title).toBe(taskTitle)
  expect(endState.todoListID2[0].status).toBe(TaskStatuses.New)
})

test('status of specified task should changed', () => {
  const startState: TasksType = {
    todoListID1: [
      { id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todoListID1', ...restProps },
      { id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
      { id: '3', title: 'React', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
    ],
    todoListID2: [
      { id: '1', title: 'Babel', status: TaskStatuses.New, todoListId: 'todoListID2', ...restProps },
      { id: '2', title: 'Webpack', status: TaskStatuses.Completed, todoListId: 'todoListID2', ...restProps },
      { id: '3', title: 'Gulp', status: TaskStatuses.Completed, todoListId: 'todoListID2', ...restProps },
    ],
  }

  const action = changeTaskStatusAC('todoListID2', '3', false)

  const endState: TasksType = taskReducer(startState, action)

  expect(endState.todoListID1[2].status).toBe(TaskStatuses.Completed)
  expect(endState.todoListID2[2].status).toBe(TaskStatuses.New)
})

test('title of specified task should changed', () => {
  const newTitle = 'Scrum'

  const startState: TasksType = {
    todoListID1: [
      { id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todoListID1', ...restProps },
      { id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
      { id: '3', title: 'React', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
    ],
    todoListID2: [
      { id: '1', title: 'Babel', status: TaskStatuses.New, todoListId: 'todoListID2', ...restProps },
      { id: '2', title: 'Webpack', status: TaskStatuses.Completed, todoListId: 'todoListID2', ...restProps },
      { id: '3', title: 'Gulp', status: TaskStatuses.Completed, todoListId: 'todoListID2', ...restProps },
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
      { id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todoListID1', ...restProps },
      { id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
      { id: '3', title: 'React', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
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
      { id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todoListID1', ...restProps },
      { id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
      { id: '3', title: 'React', status: TaskStatuses.Completed, todoListId: 'todoListID1', ...restProps },
    ],
    todoListID2: [
      { id: '1', title: 'Babel', status: TaskStatuses.New, todoListId: 'todoListID2', ...restProps },
      { id: '2', title: 'Webpack', status: TaskStatuses.Completed, todoListId: 'todoListID2', ...restProps },
      { id: '3', title: 'Gulp', status: TaskStatuses.Completed, todoListId: 'todoListID2', ...restProps },
    ],
  }

  const action = removeTodolistAC('todoListID1')

  const endState: TasksType = taskReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(keys[0]).toBe('todoListID2')
})
