import { SyntheticEvent, forwardRef } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import { setAppError } from '../../app/appSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import s from './CustomSnackbar.module.scss'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const CustomSnackbar = () => {
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.app.error)

  const handleClose = (e?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return

    dispatch(setAppError(''))
  }

  return (
    <Snackbar open={!!error} autoHideDuration={4000} onClose={handleClose}>
      <Alert className={s.alertContainer} onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  )
}
