import { Toolbar, Button, LinearProgress } from '@mui/material'

import { logOutTC } from '../../features/auth/authSlice'
import { createTodolistTC } from '../../features/todolists/Todolist/todolistSlice'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { AddItemForm } from '../AddItemForm/AddItemForm'

import s from './Header.module.scss'
export const Header = () => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.status)

  const handleCreateTodolist = (todolistTitle: string) => {
    dispatch(createTodolistTC(todolistTitle))
  }

  const handleClickLogOut = () => dispatch(logOutTC())

  return (
    <div className={s.headerContainer}>
      <Toolbar className={s.toolbar}>
        <AddItemForm addItem={handleCreateTodolist} label={'Add todolist'} className={s.input} />
        <Button className={s.button} variant={'contained'} onClick={handleClickLogOut}>
          Log out
        </Button>
      </Toolbar>
      {appStatus === 'loading' && <LinearProgress className={s.linearProgress} color="primary" />}
    </div>
  )
}
