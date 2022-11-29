import { ResponseType } from './../api/Todolist-api'
import { Dispatch } from 'redux'
import { setAppStatusAC, setAppErrorAC } from '../app/AppReducer'
import axios, { AxiosError } from 'axios'

export const handleServerNetworkError = (dispatch: Dispatch, error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    const err = error.response?.data ? (error.response.data as { error: 'string' }).error : error.message
    dispatch(setAppErrorAC(err))
  }
  dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error occurred'))
  }
  dispatch(setAppStatusAC('failed'))
}
