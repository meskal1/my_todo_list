import { AppBar, Box, Button, CircularProgress, IconButton, LinearProgress, Toolbar } from '@mui/material'
import React, { useCallback, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { useAppDispatch, useAppSelector } from '../redux/hooks'

import { AddItemForm } from '../components/addItemForm/AddItemForm'
import { CustomizedSnackbars } from '../components/errorSnackbar/ErrorSnackbar'
import { Login } from '../features/login/Login'
import MenuIcon from '@mui/icons-material/Menu'
import { Todolists } from '../features/todolists/Todolists'
import { createTodolistTC } from '../features/todolists/todolist/TodolistReducer'
import { initializeAppTC } from './AppReducer'
import { logoutTC } from '../features/login/AuthReducer'
import s from './App.module.scss'

type AppType = {
  demo?: boolean
}

const App: React.FC<AppType> = ({ demo = false }) => {
  console.log('render APP')
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
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexGrow={'1'}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        flexGrow={'1'}
        gap={'20px'}
        letterSpacing={'0.5px'}
        color={'white'}
        lineHeight={'18px'}
        bgcolor={'#031956'}>
        {isLoggedIn && (
          <>
            <AppBar position='static'>
              <Toolbar sx={{ bgcolor: '#344fa1', justifyContent: 'space-between' }}>
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
          </>
        )}
        <Routes>
          <Route path='/' element={<Todolists demo={demo} isLoggedIn={isLoggedIn} />} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<>404: Page not found </>} />
        </Routes>
        <Box position={'absolute'}>
          <CustomizedSnackbars />
        </Box>
      </Box>
    </>
  )
}
export default App
