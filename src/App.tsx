import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v1 } from 'uuid'
import { AddItemForm } from './components/addItemForm/AddItemForm'
import s from './App.module.scss'
import { AppRootStateType } from './redux/store'
import { TasksType } from './components/todolist/task/TaskReducer'
import { Todolist } from './components/todolist/Todolist'
import { addTodolistAC, TodolistDomainType } from './components/todolist/TodolistReducer'
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Grid, Paper } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const App = () => {
  console.log('render APP')
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)

  const addTodolist = useCallback((todolistTitle: string) => {
    const newTodolistID = v1()
    dispatch(addTodolistAC(newTodolistID, todolistTitle))
  }, [])

  const todolistsData = todolists.map(todolist => {
    let filteredTasks = tasks[todolist.id]
    return (
      <Grid item key={todolist.id}>
        <Paper style={{ padding: '10px' }}>
          <Todolist todolistID={todolist.id} tasks={filteredTasks} title={todolist.title} filterValue={todolist.filter} />
        </Paper>
      </Grid>
    )
  })

  return (
    <div className={s.app}>
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
      </AppBar>
      <Container fixed style={{ padding: '20px' }}>
        <Grid container>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolistsData}
        </Grid>
      </Container>
    </div>
  )
}
export default App
