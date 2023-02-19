import { Button } from '@mui/material'
import { useNavigate } from 'react-router'

import { PATH } from '../../constants/routePaths.enum'

import s from './Page404.module.scss'

export const Page404 = () => {
  const navigate = useNavigate()

  const handleClickNavigate = () => navigate(PATH.TODOLISTS)

  return (
    <div className={s.page404Container}>
      <h1 className={s.page404__title}>Page not found!</h1>
      <Button className={s.button} variant={'contained'} onClick={handleClickNavigate}>
        <p>Back to home page</p>
      </Button>
    </div>
  )
}
