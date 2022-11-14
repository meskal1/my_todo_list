import React from 'react'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses, TaskType } from '../Todolist-api'
import { RemoveTodolistACType, AddTodolistACType } from '../TodolistReducer'

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
        [action.payload.todolistID]: [
          {
            id: v1(),
            title: action.payload.taskTitle,
            status: TaskStatuses.New,
            description: '',
            todoListId: action.payload.todolistID,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            addedDate: '',
          },
          ...state[action.payload.todolistID],
        ],
      }
    }
    case 'CHANGE_TASK_STATUS': {
      const statusValue = action.payload.isChecked ? TaskStatuses.Completed : TaskStatuses.New
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map(taskElement =>
          taskElement.id === action.payload.taskID ? { ...taskElement, status: statusValue } : taskElement
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
      todolistID,
      taskID,
    },
  } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, taskTitle: string) => {
  return {
    type: 'ADD_TASK',
    payload: {
      todolistID,
      taskTitle,
    },
  } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskID: string, isChecked: boolean) => {
  return {
    type: 'CHANGE_TASK_STATUS',
    payload: {
      todolistID,
      taskID,
      isChecked,
    },
  } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskID: string, taskTitle: string) => {
  return {
    type: 'CHANGE_TASK_TITLE',
    payload: {
      todolistID,
      taskID,
      taskTitle,
    },
  } as const
}
