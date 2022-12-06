import { AxiosError } from 'axios'
import { authAPI, LoginParamsType, ResultCode } from '../../api/Todolist-api'
import { SetAppErrorACType, setAppStatusAC, SetAppStatusACType } from '../../app/AppReducer'
import { AppDispatchType } from '../../redux/store'
import { handleServerAppError, handleServerNetworkError } from '../../utils/ErrorUtils'
import { clearTodolistsTasksDataAC } from '../todolists/todolist/TodolistReducer'

const initialState = {
  isLoggedIn: false,
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'auth/SET_IS_LOGGED_IN': {
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    }
    default:
      return state
  }
}
// ACTIONS
export const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return {
    type: 'auth/SET_IS_LOGGED_IN',
    payload: {
      isLoggedIn,
    },
  } as const
}

// THUNKS
export const loginTC = (data: LoginParamsType) => async (dispatch: AppDispatchType) => {
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

export const logoutTC = () => async (dispatch: AppDispatchType) => {
  try {
    dispatch(setAppStatusAC('loading'))
    const response = await authAPI.logout()
    dispatch(clearTodolistsTasksDataAC())
    if (response.data.resultCode === ResultCode.Ok) {
      dispatch(setIsLoggedInAC(false))
      dispatch(setAppStatusAC('succeeded'))
    } else {
      handleServerAppError(dispatch, response.data)
    }
  } catch (e) {
    const error = e as Error | AxiosError
    handleServerNetworkError(dispatch, error)
  }
}

// TYPES
type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusACType | SetAppErrorACType
