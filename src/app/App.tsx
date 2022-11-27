import React, { useCallback, useEffect } from 'react'
import { AddItemForm } from '../components/addItemForm/AddItemForm'
import s from './App.module.scss'
import { TasksType } from '../components/todolist/task/TaskReducer'
import { Todolist } from '../components/todolist/Todolist'
import { createTodolistTC, fetchTodolistsTC, TodolistDomainType } from '../components/todolist/TodolistReducer'
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Grid, Paper, LinearProgress } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { CustomizedSnackbars } from '../components/errorSnackbar/ErrorSnackbar'

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
      <Grid item key={todolist.id}>
        <Paper style={{ padding: '10px' }}>
          <Todolist
            todolistID={todolist.id}
            tasks={filteredTasks}
            title={todolist.title}
            filterValue={todolist.filter}
            entityStatus={todolist.entityStatus}
            demo={demo}
          />
        </Paper>
      </Grid>
    )
  })

  useEffect(() => {
    if (!demo) {
      dispatch(fetchTodolistsTC())
    }
  }, [])

  return (
    <div className={s.app}>
      <CustomizedSnackbars />
      <AppBar position='static'>
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
        {appStatus === 'loading' && <LinearProgress />}
      </AppBar>
      <Container fixed style={{ padding: '20px' }}>
        <Grid container>
          <AddItemForm addItem={createTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists}
        </Grid>
      </Container>
    </div>
  )
}
export default App
