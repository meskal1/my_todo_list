import { Dispatch } from 'redux'
import { authAPI, ResultCode } from '../api/Todolist-api'
import { setIsLoggedInAC } from '../features/login/AuthReducer'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: '',
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_APP_STATUS':
      return { ...state, status: action.payload.status }
    case 'SET_APP_ERROR':
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}

// ACTIONS
export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: 'SET_APP_STATUS',
    payload: {
      status,
    },
  } as const
}

export const setAppErrorAC = (error: string) => {
  return {
    type: 'SET_APP_ERROR',
    payload: {
      error,
    },
  } as const
}

// THUNKS
export const initializeAppTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authAPI.me()
    if (response.data.resultCode === ResultCode.Ok) {
      dispatch(setIsLoggedInAC(true))
    } else {
      // handleServerAppError<{ userId: number }>(dispatch, response.data)
    }
  } catch (e) {
    //  const error = e as Error | AxiosError
    //  handleServerNetworkError(dispatch, error)
  }
}

// TYPES
type ActionsType = SetAppStatusACType | SetAppErrorACType

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>

export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
