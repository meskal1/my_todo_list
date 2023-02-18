import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setAppStatus } from '../../app/appSlice'
import { ResultCode } from '../../constants/responseResultCode.enum'
import { LoginParamsType, authAPI } from '../../services/authApi'
import { handleServerAppError, handleServerNetworkError } from '../../utils/errorUtils'

const initialState = {
  isLoggedIn: false,
}

export const logInTC = createAsyncThunk(
  'auth/logIn',
  async (data: LoginParamsType, { dispatch }) => {
    try {
      dispatch(setAppStatus('loading'))
      const response = await authAPI.login(data)

      if (response.data.resultCode === ResultCode.Ok) {
        dispatch(setIsLoggedIn(true))
        dispatch(setAppStatus('idle'))
      } else {
        handleServerAppError<{ userId: number }>(dispatch, response.data)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e as Error | AxiosError)
    }
  }
)

export const logOutTC = createAsyncThunk('auth/logOut', async (_, { dispatch }) => {
  try {
    dispatch(setAppStatus('loading'))
    const response = await authAPI.logout()

    if (response.data.resultCode === ResultCode.Ok) {
      dispatch(setAppStatus('idle'))
    } else {
      handleServerAppError(dispatch, response.data)
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e as Error | AxiosError)
  } finally {
    dispatch(setAppStatus('idle'))
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(logOutTC.fulfilled, () => {
      return initialState
    })
  },
})

export const authReducer = authSlice.reducer

// ACTIONS
export const { setIsLoggedIn } = authSlice.actions
