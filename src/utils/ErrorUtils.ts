import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppStatus, setAppError } from '../app/appSlice'
import { ResponseType } from '../services/authApi'

export const handleServerNetworkError = (dispatch: Dispatch, error: Error | AxiosError) => {
  if (axios.isAxiosError(error)) {
    const err = error.response?.data
      ? (error.response.data as { error: 'string' }).error
      : error.message

    dispatch(setAppError(err))
  }
  dispatch(setAppStatus('idle'))
}

export const handleServerAppError = <D>(dispatch: Dispatch, data: ResponseType<D>) => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]))
  } else {
    dispatch(setAppError('Some error occurred'))
  }
  dispatch(setAppStatus('idle'))
}
