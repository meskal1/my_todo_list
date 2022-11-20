import React, { useCallback } from 'react'
import { EditableTitle } from '../../editableTitle/EditableTitle'
import { updateTaskTC, deleteTaskTC } from './TaskReducer'
import s from '../Todolist.module.scss'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { TaskStatuses } from '../../../api/Todolist-api'
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

  const onClickButton = useCallback(() => {
    dispatch(deleteTaskTC(todolistID, taskID))
  }, [])

  const onChangeInput = useCallback(() => {
    dispatch(updateTaskTC(todolistID, taskID, { status: isChecked ? TaskStatuses.New : TaskStatuses.Completed }))
  }, [status])

  const onChangeTaskTitle = (taskTitle: string) => {
    dispatch(updateTaskTC(todolistID, taskID, { title: taskTitle }))
  }

  return (
    <>
      <li className={isChecked ? s.completed : ''}>
        <Checkbox checked={isChecked} onChange={onChangeInput} />
        <EditableTitle itemTitle={taskTitle} onChange={onChangeTaskTitle} />
        <IconButton onClick={onClickButton}>
          <Delete />
        </IconButton>
      </li>
    </>
  )
})
