import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { EditableTitle } from '../../editableTitle/EditableTitle'
import { removeTaskAC, changeTaskStatusAC, changeTaskTitleAC } from './TaskReducer'
import s from '../Todolist.module.scss'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

type TaskType = {
  taskID: string
  taskTitle: string
  isChecked: boolean
  todolistID: string
}

export const Task: React.FC<TaskType> = React.memo(({ taskID, taskTitle, isChecked, todolistID }) => {
  console.log('render TASK')
  const dispatch = useDispatch()

  const onClickButtonHandler = () => {
    dispatch(removeTaskAC(todolistID, taskID))
  }

  const onChangeInputHandler = () => {
    dispatch(changeTaskStatusAC(todolistID, taskID, !isChecked))
  }

  const onChangeTaskTitle = useCallback((taskTitle: string) => {
    dispatch(changeTaskTitleAC(todolistID, taskID, taskTitle))
  }, [])

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
