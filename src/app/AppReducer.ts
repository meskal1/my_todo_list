import { ResultCode, authAPI } from '../api/Todolist-api'

import { AppDispatchType } from '../redux/store'
import { AxiosError } from 'axios'
import { handleServerNetworkError } from '../utils/ErrorUtils'
import { setIsLoggedInAC } from '../features/login/AuthReducer'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: '',
  isInitialized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'appStatus/SET_APP_STATUS':
      return { ...state, status: action.payload.status }
    case 'error/SET_APP_ERROR':
      return { ...state, error: action.payload.error }
    case 'authMe/SET_IS_INITIALIZED':
      return { ...state, isInitialized: action.payload.isInitialized }
    default:
      return state
  }
}

// ACTIONS
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: 'appStatus/SET_APP_STATUS',
    payload: {
      status,
    },
  } as const
}

export const setAppErrorAC = (error: string) => {
  return {
    type: 'error/SET_APP_ERROR',
    payload: {
      error,
    },
  } as const
}

export const setIsInitializedAC = (isInitialized: boolean) => {
  return {
    type: 'authMe/SET_IS_INITIALIZED',
    payload: {
      isInitialized,
    },
  } as const
}

// THUNKS
export const initializeAppTC = () => async (dispatch: AppDispatchType) => {
  try {
    const response = await authAPI.me()
    dispatch(setIsInitializedAC(true))
    if (response.data.resultCode === ResultCode.Ok) {
      dispatch(setIsLoggedInAC(true))
    } else {
      // handleServerAppError(dispatch, response.data)
    }
  } catch (e) {
    const error = e as Error | AxiosError
    handleServerNetworkError(dispatch, error)
  }
}

// TYPES
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = typeof initialState

type ActionsType = SetAppStatusACType | SetAppErrorACType | SetIsInitializedACType

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>

export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>
