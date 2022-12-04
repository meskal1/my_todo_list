import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from '../components/addItemForm/AddItemForm'
import s from './App.module.scss'
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Grid, Paper, LinearProgress, CircularProgress } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { CustomizedSnackbars } from '../components/errorSnackbar/ErrorSnackbar'
import { Routes, Route } from 'react-router'
import { Login } from '../features/login/Login'
import { initializeAppTC } from './AppReducer'
import { createTodolistTC } from '../features/todolists/todolist/TodolistReducer'
import { Todolists } from '../features/todolists/Todolists'
import { logoutTC } from '../features/login/AuthReducer'

type AppType = {
  demo?: boolean
}

const App: React.FC<AppType> = ({ demo = false }) => {
  //   console.log('render APP')
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.status)
  const isLoggedIn = useAppSelector(state => state.isLoggedIn.isLoggedIn)
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  const createTodolist = useCallback((todolistTitle: string) => {
    dispatch(createTodolistTC(todolistTitle))
  }, [])

  const onClickLogOut = () => {
    dispatch(logoutTC())
  }

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeAppTC())
    }
  }, [isLoggedIn])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className={s.app}>
      <AppBar className={s.appBar} position='static'>
        <Toolbar className={s.toolbar}>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          {/* <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
          <AddItemForm addItem={createTodolist} label={'Add todolist'} />
          <Button color='inherit' onClick={onClickLogOut}>
            Log out
          </Button>
        </Toolbar>
        {appStatus === 'loading' && <LinearProgress className={s.linearProgress} color='primary' />}
      </AppBar>
      <div className={s.todolistsContainer}>
        <Routes>
          <Route path='/' element={<Todolists demo={demo} isLoggedIn={isLoggedIn} />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<>404: Page not found </>} />
        </Routes>
      </div>
      <CustomizedSnackbars />
    </div>
  )
}
export default App
