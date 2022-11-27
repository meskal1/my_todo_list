import React, { useCallback, useEffect } from 'react'
import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { AddItemForm } from '../addItemForm/AddItemForm'
import { EditableTitle } from '../editableTitle/EditableTitle'
import { Task } from './task/Task'
import { createTaskTC, fetchTasksTC } from './task/TaskReducer'
import s from './Todolist.module.scss'
import { updateTodolistTitleTC, deleteTodolistTC, tasksFilterValueAC, setTodolistEntityStatusAC } from './TodolistReducer'
import { TaskStatuses, TaskType } from '../../api/Todolist-api'
import { useAppDispatch } from '../../redux/hooks'
import { RequestStatusType } from '../../app/AppReducer'

type TodolistType = {
  todolistID: string
  title: string
  filterValue: string
  tasks: Array<TaskType>
  entityStatus: RequestStatusType
  demo?: boolean
}

export const Todolist: React.FC<TodolistType> = React.memo(({ todolistID, title, filterValue, tasks, entityStatus, demo = false }) => {
  //   console.log(`render TODOLIST ${todolistID}`)
  const dispatch = useAppDispatch()
  let filteredTasks = tasks

  if (filterValue === 'active') {
    filteredTasks = filteredTasks.filter(taskElement => taskElement.status === TaskStatuses.New)
  }

  if (filterValue === 'completed') {
    filteredTasks = filteredTasks.filter(taskElement => taskElement.status === TaskStatuses.Completed)
  }

  const tasksData = filteredTasks.map(taskElement => {
    return (
      <Task
        key={taskElement.id}
        taskID={taskElement.id}
        taskTitle={taskElement.title}
        status={taskElement.status}
        todolistID={todolistID}
      />
    )
  })

  const onChangeTodolistTitle = useCallback((todolistTitle: string) => {
    dispatch(updateTodolistTitleTC(todolistID, todolistTitle))
  }, [])

  const onClickCreateTask = useCallback(
    (taskTitle: string) => {
      dispatch(createTaskTC(todolistID, taskTitle))
    },
    [todolistID]
  )

  const onAllClick = useCallback(() => {
    dispatch(tasksFilterValueAC(todolistID, 'all'))
  }, [])

  const onActiveClick = useCallback(() => {
    dispatch(tasksFilterValueAC(todolistID, 'active'))
  }, [])

  const onCompletedClick = useCallback(() => {
    dispatch(tasksFilterValueAC(todolistID, 'completed'))
  }, [])

  const onClickDelete = useCallback(() => {
    dispatch(deleteTodolistTC(todolistID))
  }, [entityStatus])

  useEffect(() => {
    if (!demo) {
      dispatch(fetchTasksTC(todolistID))
    }
  }, [])

  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3>
            <EditableTitle itemTitle={title} onChange={onChangeTodolistTitle} />
          </h3>
          <IconButton onClick={onClickDelete} disabled={entityStatus === 'loading'}>
            <Delete />
          </IconButton>
        </div>
        <AddItemForm addItem={onClickCreateTask} isDisabled={entityStatus === 'loading'} />
        <ul>{tasksData}</ul>
        <div>
          <Button variant={filterValue === 'all' ? 'contained' : 'text'} onClick={onAllClick}>
            All
          </Button>
          <Button variant={filterValue === 'active' ? 'contained' : 'text'} onClick={onActiveClick}>
            Active
          </Button>
          <Button variant={filterValue === 'completed' ? 'contained' : 'text'} onClick={onCompletedClick}>
            Completed
          </Button>
        </div>
      </div>
    </>
  )
})
