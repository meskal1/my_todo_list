import { AxiosError } from 'axios'
import { Dispatch } from 'redux'
import { authAPI, LoginParamsType, ResultCode } from '../../api/Todolist-api'
import { SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from '../../app/AppReducer'
import { handleServerAppError, handleServerNetworkError } from '../../utils/ErrorUtils'

const initialState = {
  isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_IS_LOGGED_IN': {
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    }
    default:
      return state
  }
}
// ACTIONS
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: 'SET_IS_LOGGED_IN',
    payload: {
      isLoggedIn,
    },
  } as const
}

// THUNKS
export const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const response = await authAPI.login(data)
    if (response.data.resultCode === ResultCode.Ok) {
      dispatch(setIsLoggedInAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError<{ userId: number }>(dispatch, response.data)
    }
  } catch (e) {
    const error = e as Error | AxiosError
    handleServerNetworkError(dispatch, error)
  }
}

// TYPES
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusACType | SetAppErrorACType
