import React, { useCallback } from 'react'
import { EditableTitle } from '../../../components/editableTitle/EditableTitle'
import { updateTaskTC, deleteTaskTC } from './TaskReducer'
import s from '../../../app/App.module.scss'
import { Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
// import DeleteIcon from '@material-ui/icons/Delete'
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { TaskStatuses } from '../../../api/Todolist-api'
import { useAppDispatch } from '../../../redux/hooks'
import { RequestStatusType } from '../../../app/AppReducer'

type TaskType = {
  taskID: string
  taskTitle: string
  status: TaskStatuses
  todolistID: string
  entityStatus: RequestStatusType
}

export const Task: React.FC<TaskType> = React.memo(({ taskID, taskTitle, status, todolistID, entityStatus }) => {
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
      <li className={`${isChecked ? s.completed : ''} ${s.taskContainer}`}>
        <Checkbox
          className={s.taskCheckbox}
          checked={isChecked}
          onChange={onChangeInput}
          disabled={entityStatus === 'loading'}
          size='small'
          style={isChecked ? { color: '#00ff26 ' } : { color: 'red ' }}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<TaskAltIcon />}
        />
        <EditableTitle itemTitle={taskTitle} onChange={onChangeTaskTitle} entityStatus={entityStatus} />
        <IconButton className={s.taskButton} onClick={onClickButton} disabled={entityStatus === 'loading'}>
          <DeleteIcon fontSize='small' />
        </IconButton>
      </li>
    </>
  )
})
