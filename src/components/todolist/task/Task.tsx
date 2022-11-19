import React, { useCallback } from 'react'
import { EditableTitle } from '../../editableTitle/EditableTitle'
import { removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './TaskReducer'
import s from '../Todolist.module.scss'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { TaskStatuses } from '../Todolist-api'
import { useAppDispatch } from '../../../redux/hooks'

type TaskType = {
  taskID: string
  taskTitle: string
  status: TaskStatuses
  todolistID: string
}

export const Task: React.FC<TaskType> = React.memo(({ taskID, taskTitle, status, todolistID }) => {
  console.log('render TASK')
  const dispatch = useAppDispatch()
  const isChecked = status === TaskStatuses.Completed

  const onClickButtonHandler = useCallback(() => {
    dispatch(removeTaskAC(todolistID, taskID))
  }, [])

  const onChangeInputHandler = useCallback(() => {
    dispatch(changeTaskStatusAC(todolistID, taskID, !isChecked))
  }, [isChecked])

  const onChangeTaskTitle = (taskTitle: string) => {
    dispatch(changeTaskTitleAC(todolistID, taskID, taskTitle))
  }

  return (
    <>
      <li className={isChecked ? s.completed : ''}>
        <Checkbox checked={isChecked} onChange={onChangeInputHandler} />
        <EditableTitle itemTitle={taskTitle} onChange={onChangeTaskTitle} />
        <IconButton onClick={onClickButtonHandler}>
          <Delete />
        </IconButton>
      </li>
    </>
  )
})
