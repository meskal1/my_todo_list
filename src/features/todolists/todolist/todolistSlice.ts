import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { RequestStatusType, setAppStatus } from '../../../app/appSlice'
import { ResultCode } from '../../../constants/responseResultCode.enum'
import { TodolistType, todolistAPI } from '../../../services/todolistApi'
import { handleServerAppError, handleServerNetworkError } from '../../../utils/errorUtils'
import { logOutTC } from '../../auth/authSlice'
import { getTasksTC } from '../Task/taskSlice'

const initialState: TodolistDomainType[] = []

// THUNKS
export const getTodolistsTC = createAsyncThunk(
  'todolist/getTodolists',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setAppStatus('loading'))
      const response = await todolistAPI.getTodolists()

      dispatch(setAppStatus('idle'))
      response.data.forEach(tl => dispatch(getTasksTC(tl.id)))

      return { todolists: response.data }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

export const deleteTodolistTC = createAsyncThunk(
  'todolist/deleteTodolist',
  async (todolistID: string, { dispatch, fulfillWithValue }) => {
    try {
      dispatch(setAppStatus('loading'))
      dispatch(setTodolistEntityStatus({ todolistID, entityStatus: 'loading' }))
      await todolistAPI.deleteTodolist(todolistID)
      dispatch(setAppStatus('idle'))

      return fulfillWithValue({ todolistID })
    } catch (e) {
      dispatch(setTodolistEntityStatus({ todolistID, entityStatus: 'idle' }))
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }
)

export const createTodolistTC = createAsyncThunk(
  'todolist/createTodolist',

  async (todolistTitle: string, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      dispatch(setAppStatus('loading'))
      const response = await todolistAPI.createTodolist(todolistTitle)

      if (response.data.resultCode === ResultCode.Ok) {
        dispatch(setAppStatus('idle'))

        return { todolist: response.data.data.item }
      } else {
        handleServerAppError<{ item: TodolistType }>(dispatch, response.data)
      }

      return fulfillWithValue({ todolist: response.data.data.item })
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

export const updateTodolistTitleTC = createAsyncThunk(
  'todolist/updateTodolistTitle',
  async (data: UpdateTodolistTitleType, { dispatch, fulfillWithValue, rejectWithValue }) => {
    try {
      const { todolistID, todolistTitle } = data

      dispatch(setAppStatus('loading'))
      const response = await todolistAPI.updateTodolistTitle(todolistID, todolistTitle)

      dispatch(setAppStatus('idle'))
      if (response.data.resultCode === ResultCode.Ok) {
        dispatch(setAppStatus('idle'))

        return { todolistID, todolistTitle }
      } else {
        handleServerAppError(dispatch, response.data)
      }

      return fulfillWithValue({ todolistID, todolistTitle })
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)

      return rejectWithValue(null)
    }
  }
)

const todolistSlice = createSlice({
  name: 'todolist',
  initialState,
  reducers: {
    tasksFilterValue(state, action: PayloadAction<TasksFilterValueType>) {
      return state.map(todolist =>
        todolist.id === action.payload.todolistID
          ? { ...todolist, filter: action.payload.filterValue }
          : todolist
      )
    },
    setTodolistEntityStatus(state, action: PayloadAction<SetTodolistEntityStatusType>) {
      return state.map(todolist =>
        todolist.id === action.payload.todolistID
          ? { ...todolist, entityStatus: action.payload.entityStatus }
          : todolist
      )
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getTodolistsTC.fulfilled, (state, action) => {
        return action.payload.todolists.map(obj => ({
          ...obj,
          filter: 'all' as FilterValuesType,
          entityStatus: 'idle' as RequestStatusType,
        }))
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        return state.filter(todolist => todolist.id !== action.meta.arg)
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.unshift({
          id: action.payload.todolist.id,
          title: action.payload.todolist.title,
          addedDate: '',
          order: 0,
          filter: 'all',
          entityStatus: 'idle',
        })
      })
      .addCase(updateTodolistTitleTC.fulfilled, (state, action) => {
        return state.map(todolist =>
          todolist.id === action.payload.todolistID
            ? { ...todolist, title: action.payload.todolistTitle }
            : todolist
        )
      })

    builder.addCase(logOutTC.fulfilled, () => {
      return initialState
    })
  },
})

export const todolistReducer = todolistSlice.reducer

// ACTIONS
export const { tasksFilterValue, setTodolistEntityStatus } = todolistSlice.actions

// TYPES
type UpdateTodolistTitleType = {
  todolistID: string
  todolistTitle: string
}

type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

type SetTodolistEntityStatusType = {
  todolistID: string
  entityStatus: RequestStatusType
}

type TasksFilterValueType = {
  todolistID: string
  filterValue: FilterValuesType
}
