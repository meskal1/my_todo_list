import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { ResultCode } from '../constants/responseResultCode.enum'
import { setIsLoggedIn } from '../features/auth/authSlice'
import { authAPI } from '../services/authApi'
import { handleServerNetworkError } from '../utils/errorUtils'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: '',
  isInitialized: false,
}

export const initializeAppTC = createAsyncThunk('app/initializeApp', async (_, { dispatch }) => {
  try {
    const response = await authAPI.me()

    if (response.data.resultCode === ResultCode.Ok) {
      dispatch(setIsLoggedIn(true))
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  }
})

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppStatus(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload
    },
    setAppError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(initializeAppTC.fulfilled, state => {
        state.isInitialized = true
      })
      .addCase(initializeAppTC.rejected, state => {
        state.isInitialized = true
      })
  },
})

export const appReducer = appSlice.reducer

// ACTIONS
export const { setAppStatus, setAppError } = appSlice.actions

// TYPES
export type RequestStatusType = 'idle' | 'loading'

export type InitialStateType = typeof initialState
