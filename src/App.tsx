import React, { useCallback, useEffect } from 'react'
import { v1 } from 'uuid'
import { AddItemForm } from './components/addItemForm/AddItemForm'
import s from './App.module.scss'
import { TasksType } from './components/todolist/task/TaskReducer'
import { Todolist } from './components/todolist/Todolist'
import { addTodolistAC, fetchTodolistsTC, TodolistDomainType } from './components/todolist/TodolistReducer'
import { AppBar, Toolbar, Typography, Button, IconButton, Container, Grid, Paper } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { useAppDispatch, useAppSelector } from './redux/hooks'

const App = () => {
  console.log('render APP')
  const dispatch = useAppDispatch()
  const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  const tasks = useAppSelector<TasksType>(state => state.tasks)

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

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

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
