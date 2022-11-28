import { ResponseType } from './../api/Todolist-api'
import { Dispatch } from 'redux'
import { setAppStatusAC, setAppErrorAC } from '../app/AppReducer'

export const handleServerNetworkError = (dispatch: Dispatch, error: { message: string }) => {
  dispatch(setAppStatusAC('failed'))
  dispatch(setAppErrorAC(error.message))
}

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}
