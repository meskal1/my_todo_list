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
import { Routes, Route, Navigate } from 'react-router'

type AppType = {
  demo?: boolean
}

const App: React.FC<AppType> = ({ demo = false }) => {
  //   console.log('render APP')
  const dispatch = useAppDispatch()
  const todolistsData = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  const appStatus = useAppSelector(state => state.app.status)
  const tasksData = useAppSelector<TasksType>(state => state.tasks)

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
    if (!demo) {
      dispatch(fetchTodolistsTC())
    }
  }, [])

  return (
    <div className={s.app}>
      <AppBar className={s.appBar} position='static'>
        <Toolbar className={s.toolbar}>
          {/* <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
          {/* <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
          <AddItemForm className={s.addInputForm} addItem={createTodolist} />
          <Button color='inherit'>Log out</Button>
        </Toolbar>
        {appStatus === 'loading' && <LinearProgress className={s.linearProgress} color='primary' />}
        {/* <LinearProgress className={s.linearProgress} color='primary' /> */}
      </AppBar>
      <div className={s.todolistsContainer}>
        {/* <Routes> */}
        {/* <Route path='/' element={<Navigate to={PATH.HOME} replace />} /> 
          <Route path={PATH.ABOUT} element={<About />}>
            <Route path={PATH.ABOUT_MODAL} element={<AboutModal />} />
          </Route>
          <Route path='*' element={<Page404 />} /> */}
        {/* </Routes> */}
        {/* <Grid container> */}
        {/* <AddItemForm addItem={createTodolist} /> */}
        {/* </Grid> */}
        {/* <Grid container spacing={3}> */}
        {todolists}
        {/* </Grid> */}
      </div>
      <CustomizedSnackbars />
    </div>
  )
}
export default App
//   {/*  <Grid item key={todolist.id}> */}
//   {/*  <Paper style={{ padding: '10px' }}  */}

//    {/*  </Paper>*/}
//    {/* </Grid> */}
