import React from 'react'
import { TaskPriorities, TaskStatuses, TaskType, todolistAPI, ResultCode } from '../../../api/Todolist-api'
import { DeleteTodolistACType, CreateTodolistACType, SetTodolistsACType } from '../TodolistReducer'
import { Dispatch } from 'redux'
import { RootStateType } from '../../../redux/store'
import { setAppErrorAC, setAppStatusAC } from '../../../app/AppReducer'
import axios, { AxiosError } from 'axios'
import { handleServerAppError } from '../../../utils/ErrorUtils'

const initialState: TasksType = {}

export const taskReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
  switch (action.type) {
    case 'DELETE_TASK': {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].filter(taskElement => taskElement.id !== action.payload.taskID),
      }
    }
    case 'CREATE_TASK': {
      return {
        ...state,
        [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
      }
    }
    case 'UPDATE_TASK': {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map(taskElement =>
          taskElement.id === action.payload.taskID ? { ...taskElement, ...action.payload.domainModel } : taskElement
        ),
      }
    }
    case 'DELETE_TODOLIST': {
      const copyState = { ...state }
      delete copyState[action.payload.todolistID]
      return copyState
    }
    case 'CREATE_TODOLIST': {
      return { ...state, [action.payload.todolist.id]: [] }
    }
    case 'SET_TODOLISTS': {
      const stateCopy = { ...state }
      action.payload.todolists.forEach(tl => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case 'SET_TASKS': {
      return { ...state, [action.payload.todolistID]: action.payload.tasks }
    }
    default:
      return state
  }
}

// ACTIONS
export const deleteTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: 'DELETE_TASK',
    payload: {
      todolistID,
      taskID,
    },
  } as const
}

export const createTaskAC = (task: TaskType) => {
  return {
    type: 'CREATE_TASK',
    payload: {
      task,
    },
  } as const
}

export const updateTaskAC = (todolistID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => {
  return {
    type: 'UPDATE_TASK',
    payload: {
      todolistID,
      taskID,
      domainModel,
    },
  } as const
}

export const setTasksAC = (todolistID: string, tasks: Array<TaskType>) => {
  return {
    type: 'SET_TASKS',
    payload: {
      todolistID,
      tasks,
    },
  } as const
}

// THUNKS
export const fetchTasksTC = (todolistID: string) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  const response = await todolistAPI.getTasks(todolistID)
  dispatch(setTasksAC(todolistID, response.data.items))
  dispatch(setAppStatusAC('succeeded'))
}

export const deleteTaskTC = (todolistID: string, taskID: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    await todolistAPI.deleteTask(todolistID, taskID)
    dispatch(deleteTaskAC(todolistID, taskID))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
      const error = err.response?.data ? (err.response.data as { error: 'string' }).error : err.message
      dispatch(setAppErrorAC(error))
    }
    dispatch(setAppStatusAC('failed'))
  }
}

export const createTaskTC = (todolistID: string, taskTitle: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  todolistAPI
    .createTask(todolistID, taskTitle)
    .then(res => {
      if (res.data.resultCode === ResultCode.Ok) {
        dispatch(createTaskAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        if (res.data.messages.length) {
          dispatch(setAppErrorAC(res.data.messages[0]))
        } else {
          handleServerAppError<{ item: TaskType }>(dispatch, res.data)
        }
      }
    })
    .catch((e: AxiosError) => {
      const error = e.response ? (e.response.data as { error: 'string' }).error : e.message
      dispatch(setAppErrorAC(error))
      dispatch(setAppStatusAC('failed'))
    })
}

export const updateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => {
  return (dispatch: Dispatch, getState: () => RootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const tasksFromTodolist = getState().tasks[todolistID]
    const task = tasksFromTodolist.find(t => t.id === taskID)
    if (task) {
      todolistAPI
        .updateTask(todolistID, taskID, {
          title: task.title,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          deadline: task.deadline,
          status: task.status,
          ...domainModel,
        })
        .then(() => {
          dispatch(updateTaskAC(todolistID, taskID, domainModel))
          dispatch(setAppStatusAC('succeeded'))
        })
    }
  }
}

// TYPES
export type TasksType = {
  [key: string]: Array<TaskType>
}

type ActionType =
  | DeleteTaskACType
  | DeleteTodolistACType
  | CreateTaskACType
  | CreateTodolistACType
  | SetTasksACType
  | SetTodolistsACType
  | UpdateTaskACType

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>

type CreateTaskACType = ReturnType<typeof createTaskAC>

type UpdateTaskACType = ReturnType<typeof updateTaskAC>

type SetTasksACType = ReturnType<typeof setTasksAC>

type UpdateDomainTaskModelType = {
  deadline?: string
  description?: string
  priority?: TaskPriorities
  startDate?: string
  status?: TaskStatuses
  title?: string
}
