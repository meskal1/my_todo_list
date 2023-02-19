import { CircularProgress } from '@mui/material'

import s from './LoadingProgress.module.scss'

export const LoadingProgress = () => {
  return (
    <div className={s.circularContainer}>
      <CircularProgress />
    </div>
  )
}
