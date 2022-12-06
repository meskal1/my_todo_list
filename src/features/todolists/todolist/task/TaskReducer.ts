import { AppDispatchType, RootStateType } from '../../../../redux/store'
import { ClearTodolistsDataACType, CreateTodolistACType, DeleteTodolistACType, SetTodolistsACType } from '../TodolistReducer'
import { RequestStatusType, setAppErrorAC, setAppStatusAC } from '../../../../app/AppReducer'
import { ResultCode, TaskType, UpdateTaskModelType, todolistAPI } from '../../../../api/Todolist-api'
import { handleServerAppError, handleServerNetworkError } from '../../../../utils/ErrorUtils'

import { AxiosError } from 'axios'
import React from 'react'

const initialState: TasksType = {}

export const taskReducer = (state: TasksType = initialState, action: ActionsType): TasksType => {
  switch (action.type) {
    case 'task/DELETE_TASK': {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].filter(taskElement => taskElement.id !== action.payload.taskID),
      }
    }
    case 'task/CREATE_TASK': {
      return {
        ...state,
        [action.payload.task.todoListId]: [{ ...action.payload.task, entityStatus: 'succeeded' }, ...state[action.payload.task.todoListId]],
      }
    }
    case 'task/UPDATE_TASK': {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map(taskElement =>
          taskElement.id === action.payload.taskID ? { ...taskElement, ...action.payload.domainModel } : taskElement
        ),
      }
    }
    case 'todolist/DELETE_TODOLIST': {
      const copyState = { ...state }
      delete copyState[action.payload.todolistID]
      return copyState
    }
    case 'todolist/CREATE_TODOLIST': {
      return { ...state, [action.payload.todolist.id]: [] }
    }
    case 'todolist/SET_TODOLISTS': {
      const stateCopy = { ...state }
      action.payload.todolists.forEach(tl => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case 'task/SET_TASKS': {
      return { ...state, [action.payload.todolistID]: action.payload.tasks.map(t => ({ ...t, entityStatus: 'succeeded' })) }
    }
    case 'task/SET_TASK_ENTITY_STATUS': {
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].map(taskElement =>
          taskElement.id === action.payload.taskID ? { ...taskElement, entityStatus: action.payload.entityStatus } : taskElement
        ),
      }
    }
    case 'todolist_task/CLEAR_DATA': {
      return {}
    }
    default:
      return state
  }
}

// ACTIONS
export const deleteTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: 'task/DELETE_TASK',
    payload: {
      todolistID,
      taskID,
    },
  } as const
}

export const createTaskAC = (task: TaskType) => {
  return {
    type: 'task/CREATE_TASK',
    payload: {
      task,
    },
  } as const
}

export const updateTaskAC = (todolistID: string, taskID: string, domainModel: UpdateDomainTaskModelType) => {
  return {
    type: 'task/UPDATE_TASK',
    payload: {
      todolistID,
      taskID,
      domainModel,
    },
  } as const
}

export const setTasksAC = (todolistID: string, tasks: Array<TaskType>) => {
  return {
    type: 'task/SET_TASKS',
    payload: {
      todolistID,
      tasks,
    },
  } as const
}

export const setTaskEntityStatusAC = (todolistID: string, taskID: string, entityStatus: RequestStatusType) => {
  return {
    type: 'task/SET_TASK_ENTITY_STATUS',
    payload: {
      todolistID,
      taskID,
      entityStatus,
    },
  } as const
}

// THUNKS
export const fetchTasksTC = (todolistID: string) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const response = await todolistAPI.getTasks(todolistID)
    dispatch(setTasksAC(todolistID, response.data.items))
    dispatch(setAppStatusAC('succeeded'))
  } catch {
    dispatch(setAppErrorAC('Some error occurred'))
    dispatch(setAppStatusAC('failed'))
  }
}

export const deleteTaskTC = (todolistID: string, taskID: string) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatusAC('loading'))
    dispatch(setTaskEntityStatusAC(todolistID, taskID, 'loading'))
    await todolistAPI.deleteTask(todolistID, taskID)
    dispatch(deleteTaskAC(todolistID, taskID))
    dispatch(setAppStatusAC('succeeded'))
  } catch (e) {
    const error = e as Error | AxiosError
    dispatch(setTaskEntityStatusAC(todolistID, taskID, 'idle'))
    handleServerNetworkError(dispatch, error)
  }
}

export const createTaskTC = (todolistID: string, taskTitle: string) => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const res = await todolistAPI.createTask(todolistID, taskTitle)
    if (res.data.resultCode === ResultCode.Ok) {
      dispatch(createTaskAC(res.data.data.item))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError<{ item: TaskType }>(dispatch, res.data)
    }
  } catch (e) {
    const error = e as Error | AxiosError
    handleServerNetworkError(dispatch, error)
  }
}

export const updateTaskTC =
  (todolistID: string, taskID: string, domainModel: UpdateDomainTaskModelType) =>
  async (dispatch: AppDispatchType, getState: () => RootStateType) => {
    try {
      dispatch(setAppStatusAC('loading'))
      const tasksFromTodolist = getState().tasks[todolistID]
      const task = tasksFromTodolist.find(t => t.id === taskID)
      if (task) {
        const response = await todolistAPI.updateTask(todolistID, taskID, {
          title: task.title,
          startDate: task.startDate,
          priority: task.priority,
          description: task.description,
          deadline: task.deadline,
          status: task.status,
          ...domainModel,
        })

        if (response.data.resultCode === ResultCode.Ok) {
          dispatch(updateTaskAC(todolistID, taskID, domainModel))
          dispatch(setAppStatusAC('succeeded'))
        } else {
          handleServerAppError(dispatch, response.data)
        }
      }
    } catch (e) {
      const error = e as Error | AxiosError
      handleServerNetworkError(dispatch, error)
    }
  }

// TYPES
export type TaskExtendedType = Array<TaskType & { entityStatus: RequestStatusType }>

export type TasksType = {
  [key: string]: TaskExtendedType
}

type ActionsType =
  | DeleteTaskACType
  | DeleteTodolistACType
  | CreateTaskACType
  | CreateTodolistACType
  | SetTasksACType
  | SetTodolistsACType
  | UpdateTaskACType
  | SetTaskEntityStatusACType
  | ClearTodolistsDataACType

type DeleteTaskACType = ReturnType<typeof deleteTaskAC>

type CreateTaskACType = ReturnType<typeof createTaskAC>

type UpdateTaskACType = ReturnType<typeof updateTaskAC>

type SetTasksACType = ReturnType<typeof setTasksAC>

type SetTaskEntityStatusACType = ReturnType<typeof setTaskEntityStatusAC>

type UpdateDomainTaskModelType = Partial<UpdateTaskModelType>
