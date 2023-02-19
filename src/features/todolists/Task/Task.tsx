import { useCallback, memo, FC } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { Checkbox, IconButton } from '@mui/material'

import s from '../../../app/App.module.scss'
import { RequestStatusType } from '../../../app/appSlice'
import { EditableTitle } from '../../../components/EditableTitle/EditableTitle'
import { TaskStatuses } from '../../../constants/task.enum'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'

import { deleteTaskTC, updateTaskTC } from './taskSlice'

type TaskType = {
  taskID: string
  taskTitle: string
  status: TaskStatuses
  todolistID: string
  entityStatus: RequestStatusType
}

export const Task: FC<TaskType> = memo(
  ({ taskID, taskTitle, status, todolistID, entityStatus }) => {
    const dispatch = useAppDispatch()
    const isChecked = status === TaskStatuses.Completed

    const handleClickButton = useCallback(() => {
      dispatch(deleteTaskTC({ todolistID, taskID }))
    }, [])

    const handleChangeInput = useCallback(() => {
      if (entityStatus !== 'loading') {
        dispatch(
          updateTaskTC({
            todolistID,
            taskID,
            domainModel: {
              status: isChecked ? TaskStatuses.New : TaskStatuses.Completed,
            },
          })
        )
      }
    }, [status, entityStatus])

    const handleChangeTaskTitle = (taskTitle: string) => {
      dispatch(updateTaskTC({ todolistID, taskID, domainModel: { title: taskTitle } }))
    }

    return (
      <li
        className={`${isChecked || entityStatus === 'loading' ? s.completed : ''} ${
          s.taskContainer
        }`}
      >
        <Checkbox
          className={s.taskCheckbox}
          checked={isChecked}
          onChange={handleChangeInput}
          disabled={entityStatus === 'loading'}
          size="small"
          style={isChecked ? { color: '#00ff26 ' } : { color: 'red ' }}
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<TaskAltIcon />}
        />
        <EditableTitle
          itemTitle={taskTitle}
          onChange={handleChangeTaskTitle}
          entityStatus={entityStatus}
        />
        <IconButton
          onClick={handleClickButton}
          disabled={entityStatus === 'loading'}
          sx={{ alignSelf: 'flex-start', color: '#98b5ff' }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </li>
    )
  }
)
