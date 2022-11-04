import React from 'react'
import { v1 } from 'uuid'
import { RemoveTodolistACType, AddTodolistACType } from '../TodolistReducer'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksType = {
  [key: string]: Array<TaskType>
}

const initialState: TasksType = {}

type ActionType =
  | RemoveTaskACType
  | AddTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType
  | RemoveTodolistACType
  | AddTodolistACType

export const taskReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].filter(taskElement => taskElement.id !== action.payload.taskID),
      }
    }
    case 'ADD_TASK': {
      return {
        ...state,
        [action.payload.todolistID]: [{ id: v1(), title: action.payload.taskTitle, isDone: false }, ...state[action.payload.todolistID]],
      }
    }
    case 'CHANGE_TASK_STATUS': {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map(taskElement =>
          taskElement.id === action.payload.taskID ? { ...taskElement, isDone: action.payload.isDone } : taskElement
        ),
      }
    }
    case 'CHANGE_TASK_TITLE': {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map(taskElement =>
          taskElement.id === action.payload.taskID ? { ...taskElement, title: action.payload.taskTitle } : taskElement
        ),
      }
    }
    case 'REMOVE_TODOLIST': {
      delete state[action.payload.todolistID]
      return { ...state }
    }
    case 'ADD_TODOLIST': {
      return { ...state, [action.payload.todolistID]: [] }
    }
    default:
      return state
  }
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: 'REMOVE_TASK',
    payload: {
      todolistID: todolistID,
      taskID: taskID,
    },
  } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, taskTitle: string) => {
  return {
    type: 'ADD_TASK',
    payload: {
      taskTitle: taskTitle,
      todolistID: todolistID,
    },
  } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
  return {
    type: 'CHANGE_TASK_STATUS',
    payload: {
      todolistID: todolistID,
      taskID: taskID,
      isDone: isDone,
    },
  } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskID: string, taskTitle: string) => {
  return {
    type: 'CHANGE_TASK_TITLE',
    payload: {
      todolistID: todolistID,
      taskID: taskID,
      taskTitle: taskTitle,
    },
  } as const
}
