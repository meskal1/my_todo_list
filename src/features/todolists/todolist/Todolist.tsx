import { Button, IconButton } from '@mui/material'
import React, { useCallback } from 'react'
import { TaskExtendedType, createTaskTC } from './task/TaskReducer'
import { deleteTodolistTC, tasksFilterValueAC, updateTodolistTitleTC } from './TodolistReducer'

import { AddItemForm } from '../../../components/addItemForm/AddItemForm'
import DeleteIcon from '@mui/icons-material/Delete'
import { EditableTitle } from '../../../components/editableTitle/EditableTitle'
import { RequestStatusType } from '../../../app/AppReducer'
import { Task } from './task/Task'
import { TaskStatuses } from '../../../api/Todolist-api'
import s from '../../../app/App.module.scss'
import { useAppDispatch } from '../../../redux/hooks'

type TodolistType = {
  todolistID: string
  title: string
  filterValue: string
  tasks: TaskExtendedType
  entityStatus: RequestStatusType
}

export const Todolist: React.FC<TodolistType> = React.memo(({ todolistID, title, filterValue, tasks, entityStatus }) => {
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
        entityStatus={taskElement.entityStatus}
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
  }, [])

  return (
    <>
      <div className={s.todolistContainer}>
        <div className={s.todolistTitleBlock}>
          <h2 className={s.todolistTitle}>
            <EditableTitle itemTitle={title} onChange={onChangeTodolistTitle} entityStatus={entityStatus} />
          </h2>
          <IconButton onClick={onClickDelete} disabled={entityStatus === 'loading'} sx={{ alignSelf: 'flex-start', color: '#98b5ff' }}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </div>
        <AddItemForm addItem={onClickCreateTask} isDisabled={entityStatus === 'loading'} label={'Add task'} />
        <ul className={s.tasksList}>{tasksData}</ul>
        <div className={s.blockButtons}>
          <Button
            variant={filterValue === 'all' ? 'contained' : 'text'}
            onClick={onAllClick}
            sx={{
              borderRadius: '30px',
              bgcolor: '#F8C655',
              color: 'black',
              fontWeight: '800',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.5px',
            }}>
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
