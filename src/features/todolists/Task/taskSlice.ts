import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { RequestStatusType, setAppError, setAppStatus } from '../../../app/appSlice'
import { RootStateType } from '../../../app/store'
import { ResultCode } from '../../../constants/responseResultCode.enum'
import { TaskType, todolistAPI, UpdateTaskModelType } from '../../../services/todolistApi'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils'
import { logOutTC } from '../../auth/authSlice'
import { createTodolistTC, deleteTodolistTC } from '../Todolist/todolistSlice'

const initialState: TasksType = {}

// THUNKS
export const getTasksTC = createAsyncThunk(
  'task/getTasks',
  async (todolistID: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus('loading'))
      const response = await todolistAPI.getTasks(todolistID)

      return { todolistID, tasks: response.data.items }
    } catch {
      dispatch(setAppError('Some error occurred'))

      return rejectWithValue(null)
    } finally {
      dispatch(setAppStatus('idle'))
    }
  }
)

export const deleteTaskTC = createAsyncThunk(
  'task/deleteTask',
  async (data: DeleteTaskType, { dispatch }) => {
    const { todolistID, taskID } = data

    try {
      dispatch(setAppStatus('loading'))
      await todolistAPI.deleteTask(todolistID, taskID)
      dispatch(setAppStatus('idle'))

      return { todolistID, taskID }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }
)

export const createTaskTC = createAsyncThunk(
  'task/createTask',
  async (data: CreateTaskType, { dispatch, fulfillWithValue }) => {
    try {
      const { todolistID, taskTitle } = data

      dispatch(setAppStatus('loading'))
      const response = await todolistAPI.createTask(todolistID, taskTitle)

      if (response.data.resultCode === ResultCode.Ok) {
        dispatch(setAppStatus('idle'))

        return fulfillWithValue(response.data.data.item)
      } else {
        handleServerAppError<{ item: TaskType }>(dispatch, response.data)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }
)

export const updateTaskTC = createAsyncThunk(
  'task/updateTask',
  async (data: UpdateTaskType, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    const { todolistID, taskID, domainModel } = data

    try {
      dispatch(setAppStatus('loading'))
      const state = getState() as RootStateType
      const tasksFromTodolist = state.tasks[todolistID]
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
          dispatch(setAppStatus('idle'))

          return { todolistID, taskID, domainModel }
        } else {
          handleServerAppError(dispatch, response.data)
        }
      }

      return fulfillWithValue({ todolistID, taskID, domainModel })
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTaskEntityStatus(state, action: PayloadAction<SetTaskEntityStatusType>) {
      const todolistID = action.payload.todolistID

      state[todolistID] = state[todolistID].map(el =>
        el.id === action.payload.taskID ? { ...el, entityStatus: action.payload.entityStatus } : el
      )
    },
  },

  extraReducers: builder => {
    builder
      .addCase(deleteTaskTC.pending, (state, action) => {
        const todolistID = action.meta.arg.todolistID

        state[todolistID] = state[todolistID].map(el =>
          el.id === action.meta.arg.taskID ? { ...el, entityStatus: 'loading' } : el
        )
      })
      .addCase(deleteTaskTC.fulfilled, (state, action) => {
        const todolistID = action.meta.arg.todolistID

        state[todolistID] = state[todolistID].filter(el => el.id !== action.meta.arg.taskID)
      })
      .addCase(deleteTaskTC.rejected, (state, action) => {
        const todolistID = action.meta.arg.todolistID

        state[todolistID] = state[todolistID].map(el =>
          el.id === action.meta.arg.taskID ? { ...el, entityStatus: 'idle' } : el
        )
      })
      .addCase(createTaskTC.fulfilled, (state, action) => {
        const task = action.meta.arg.todolistID

        state[task] = [{ ...(action.payload as TaskType), entityStatus: 'idle' }, ...state[task]]
      })
      .addCase(getTasksTC.fulfilled, (state, action) => {
        state[action.payload.todolistID] = action.payload.tasks.map(el => ({
          ...el,
          entityStatus: 'idle',
        }))
      })
      .addCase(updateTaskTC.fulfilled, (state, action) => {
        const todolistID = action.payload?.todolistID!

        state[todolistID] = state[todolistID].map(el =>
          el.id === action.payload.taskID ? { ...el, ...action.payload.domainModel } : el
        )
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.meta.arg]
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        return { [action.payload.todolist.id]: [], ...state }
      })

    builder.addCase(logOutTC.fulfilled, () => {
      return initialState
    })
  },
})

export const taskReducer = taskSlice.reducer

// ACTIONS
export const { setTaskEntityStatus } = taskSlice.actions

// TYPES
export type TaskExtendedType = Array<TaskType & { entityStatus: RequestStatusType }>

export type TasksType = {
  [key: string]: TaskExtendedType
}

type UpdateDomainTaskModelType = Partial<UpdateTaskModelType>

type DeleteTaskType = {
  todolistID: string
  taskID: string
}

type CreateTaskType = {
  todolistID: string
  taskTitle: string
}

type UpdateTaskType = DeleteTaskType & {
  domainModel: UpdateDomainTaskModelType
}

type SetTaskEntityStatusType = DeleteTaskType & {
  entityStatus: RequestStatusType
}

//     case 'todolist/SET_TODOLISTS': {
//       const stateCopy = { ...state }
//       action.payload.todolists.forEach(tl => {
//         stateCopy[tl.id] = []
//       })
//       return stateCopy
//     }
// }
