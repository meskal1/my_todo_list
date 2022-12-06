import React, { useEffect } from 'react'
import { TodolistDomainType, fetchTodolistsTC } from './todolist/TodolistReducer'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import { Box } from '@mui/material'
import { TasksType } from './todolist/task/TaskReducer'
import { Todolist } from './todolist/Todolist'
import { useNavigate } from 'react-router'

export type TodolistsType = {
  isLoggedIn: boolean
  demo?: boolean
}

export const Todolists: React.FC<TodolistsType> = React.memo(({ demo = false, isLoggedIn }) => {
  console.log(4)
  const dispatch = useAppDispatch()
  const todolistsData = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
  const tasksData = useAppSelector<TasksType>(state => state.tasks)
  const navigate = useNavigate()

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
      />
    )
  })

  useEffect(() => {
    if (!demo && isLoggedIn) {
      dispatch(fetchTodolistsTC())
    } else {
      navigate('login')
    }
  }, [isLoggedIn])

  return (
    <>
      <Box display={'flex'} justifyContent={'center'} flexWrap={'wrap'} gap={'10px'} p={'0 15px'}>
        {todolists}
      </Box>
    </>
  )
})
