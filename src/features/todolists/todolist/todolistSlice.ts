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
export const getTodolistsTC = createAsyncThunk('todolist/getTodolists', async (_, { dispatch }) => {
  try {
    dispatch(setAppStatus('loading'))
    const response = await todolistAPI.getTodolists()

    dispatch(setTodolists({ todolists: response.data }))
    dispatch(setAppStatus('idle'))
    response.data.forEach(tl => dispatch(getTasksTC(tl.id)))
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
})

export const deleteTodolistTC = createAsyncThunk(
  'todolist/deleteTodolist',
  async (todolistID: string, { dispatch, fulfillWithValue }) => {
    try {
      dispatch(setAppStatus('loading'))
      dispatch(setTodolistEntityStatus({ todolistID, entityStatus: 'loading' }))
      await todolistAPI.deleteTodolist(todolistID)
      dispatch(deleteTodolist({ todolistID }))
      dispatch(setAppStatus('idle'))

      return fulfillWithValue(todolistID)
    } catch (e) {
      dispatch(setTodolistEntityStatus({ todolistID, entityStatus: 'idle' }))
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }
)

export const createTodolistTC = createAsyncThunk(
  'todolist/createTodolist',

  async (todolistTitle: string, { dispatch, fulfillWithValue }) => {
    try {
      dispatch(setAppStatus('loading'))
      const response = await todolistAPI.createTodolist(todolistTitle)

      if (response.data.resultCode === ResultCode.Ok) {
        dispatch(createTodolist({ todolist: response.data.data.item }))
        dispatch(setAppStatus('idle'))

        return fulfillWithValue(response.data.data.item.id)
      } else {
        handleServerAppError<{ item: TodolistType }>(dispatch, response.data)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }
)

export const updateTodolistTitleTC = createAsyncThunk(
  'todolist/updateTodolistTitle',
  async (data: UpdateTodolistTitleType, { dispatch }) => {
    try {
      const { todolistID, todolistTitle } = data

      dispatch(setAppStatus('loading'))
      const response = await todolistAPI.updateTodolistTitle(todolistID, todolistTitle)

      dispatch(setAppStatus('idle'))
      if (response.data.resultCode === ResultCode.Ok) {
        dispatch(updateTodolistTitle({ todolistID, todolistTitle }))
        dispatch(setAppStatus('idle'))
      } else {
        handleServerAppError(dispatch, response.data)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
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
    deleteTodolist(state, action: PayloadAction<{ todolistID: string }>) {
      return state.filter(todolist => todolist.id !== action.payload.todolistID)
    },
    createTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({
        id: action.payload.todolist.id,
        title: action.payload.todolist.title,
        addedDate: '',
        order: 0,
        filter: 'all',
        entityStatus: 'idle',
      })
    },
    updateTodolistTitle(state, action: PayloadAction<UpdateTodolistTitleType>) {
      return state.map(todolist =>
        todolist.id === action.payload.todolistID
          ? { ...todolist, title: action.payload.todolistTitle }
          : todolist
      )
    },
    setTodolists(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
      return action.payload.todolists.map(obj => ({
        ...obj,
        filter: 'all' as FilterValuesType,
        entityStatus: 'idle' as RequestStatusType,
      }))
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
      .addCase(getTodolistsTC.pending, (state, action) => {})
      .addCase(getTodolistsTC.fulfilled, (state, action) => {})
      .addCase(getTodolistsTC.rejected, (state, action) => {})

    builder
      .addCase(deleteTodolistTC.pending, (state, action) => {})
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {})
      .addCase(deleteTodolistTC.rejected, (state, action) => {})

    builder
      .addCase(createTodolistTC.pending, (state, action) => {})
      .addCase(createTodolistTC.fulfilled, (state, action) => {})
      .addCase(createTodolistTC.rejected, (state, action) => {})

    builder.addCase(logOutTC.fulfilled, () => {
      return initialState
    })
  },
})

export const todolistReducer = todolistSlice.reducer

// ACTIONS
export const {
  tasksFilterValue,
  deleteTodolist,
  createTodolist,
  updateTodolistTitle,
  setTodolists,
  setTodolistEntityStatus,
} = todolistSlice.actions

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
