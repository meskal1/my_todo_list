import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from '../components/addItemForm/AddItemForm'
import s from './App.module.scss'
import { TasksType } from '../features/todolist/task/TaskReducer'
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Grid, Paper, LinearProgress } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { CustomizedSnackbars } from '../components/errorSnackbar/ErrorSnackbar'
import { Todolist } from '../features/todolist/Todolist'
import { TodolistDomainType, createTodolistTC, fetchTodolistsTC } from '../features/todolist/TodolistReducer'
import { Routes, Route, Navigate, useNavigate } from 'react-router'
import { Login } from '../features/login/Login'
import { initializeAppTC } from './AppReducer'

type AppType = {
  demo?: boolean
}

const App: React.FC<AppType> = ({ demo = false }) => {
  //   console.log('render APP')
  const dispatch = useAppDispatch()
  const todolistsData = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  const appStatus = useAppSelector(state => state.app.status)
  const tasksData = useAppSelector<TasksType>(state => state.tasks)
  const isLoggedIn = useAppSelector(state => state.isLoggedIn.isLoggedIn)
  const navigate = useNavigate()

  const createTodolist = useCallback((todolistTitle: string) => {
    dispatch(createTodolistTC(todolistTitle))
  }, [])

  const todolists = todolistsData.map(todolist => {
    let filteredTasks = tasksData[todolist.id]
    return (
      <Todolist
        key={todolist.id}
        todolistID={todolist.id}
        tasks={filteredTasks}
        title={todolist.title}
        filterValue={todolist.filter}
        entityStatus={todolist.entityStatus}
        demo={demo}
      />
    )
  })

  useEffect(() => {
    dispatch(initializeAppTC())
    console.log(isLoggedIn)
    if (isLoggedIn) {
      //  if (!demo && isLoggedIn) {
      dispatch(fetchTodolistsTC())
      navigate('/')
    } else {
      navigate('login')
    }

    //  if (!demo) {
    //    dispatch(fetchTodolistsTC())
    //  }
  }, [isLoggedIn])

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
          <Button color='inherit'>Log out</Button>
        </Toolbar>
        {appStatus === 'loading' && <LinearProgress className={s.linearProgress} color='primary' />}
      </AppBar>
      <div className={s.todolistsContainer}>
        <Routes>
          <Route path='/' element={<>{todolists}</>} />
          <Route path='login' element={<Login />} />
          <Route path='*' element={<>404: Page not found </>} />
        </Routes>
      </div>
      <CustomizedSnackbars />
    </div>
  )
}
export default App
