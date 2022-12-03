import React, { useCallback, useEffect } from 'react'
import { Delete } from '@mui/icons-material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, IconButton } from '@mui/material'
import { Task } from './task/Task'
import { createTaskTC, fetchTasksTC, TaskExtendedType } from './task/TaskReducer'
import s from '../../app/App.module.scss'
import { updateTodolistTitleTC, deleteTodolistTC, tasksFilterValueAC } from './TodolistReducer'
import { TaskStatuses } from '../../api/Todolist-api'
import { useAppDispatch } from '../../redux/hooks'
import { RequestStatusType } from '../../app/AppReducer'
import { AddItemForm } from '../../components/addItemForm/AddItemForm'
import { EditableTitle } from '../../components/editableTitle/EditableTitle'

type TodolistType = {
  todolistID: string
  title: string
  filterValue: string
  tasks: TaskExtendedType
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

  useEffect(() => {
    if (!demo) {
      dispatch(fetchTasksTC(todolistID))
    }
  }, [])

  return (
    <>
      <div className={s.todolistContainer}>
        <div className={s.todolistTitleBlock}>
          <h2 className={s.todolistTitle}>
            <EditableTitle itemTitle={title} onChange={onChangeTodolistTitle} entityStatus={entityStatus} />
          </h2>
          <IconButton className={s.deleteButton} onClick={onClickDelete} disabled={entityStatus === 'loading'}>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </div>
        <AddItemForm addItem={onClickCreateTask} isDisabled={entityStatus === 'loading'} label={'Add task'} />
        <ul className={s.tasksList}>{tasksData}</ul>
        <div className={s.blockButtons}>
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