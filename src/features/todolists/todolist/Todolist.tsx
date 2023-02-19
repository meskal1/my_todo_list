import { useCallback, memo, FC } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import { Button, IconButton } from '@mui/material'

import { RequestStatusType } from '../../../app/appSlice'
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm'
import { EditableTitle } from '../../../components/EditableTitle/EditableTitle'
import { LoadingProgress } from '../../../components/LoadingProgress/LoadingProgress'
import { TaskStatuses } from '../../../constants/task.enum'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { Task } from '../Task/Task'
import { createTaskTC, TasksType } from '../Task/taskSlice'

import s from './Todolist.module.scss'
import { updateTodolistTitleTC, tasksFilterValue, deleteTodolistTC } from './todolistSlice'

type TodolistType = {
  todolistID: string
  title: string
  filterValue: string
  entityStatus: RequestStatusType
}

export const Todolist: FC<TodolistType> = memo(
  ({ todolistID, title, filterValue, entityStatus }) => {
    const dispatch = useAppDispatch()
    const tasks = useAppSelector<TasksType>(state => state.tasks)
    const appStatus = useAppSelector(state => state.app.status)
    const isDisabled = entityStatus === 'loading'
    let filteredTasks = tasks[todolistID]

    if (filterValue === 'active') {
      filteredTasks = filteredTasks.filter(taskElement => taskElement.status === TaskStatuses.New)
    }

    if (filterValue === 'completed') {
      filteredTasks = filteredTasks.filter(
        taskElement => taskElement.status === TaskStatuses.Completed
      )
    }

    const handleChangeTodolistTitle = useCallback((todolistTitle: string) => {
      dispatch(updateTodolistTitleTC({ todolistID, todolistTitle }))
    }, [])

    const handleClickCreateTask = useCallback(
      (taskTitle: string) => {
        dispatch(createTaskTC({ todolistID, taskTitle }))
      },
      [todolistID]
    )

    const handleAllClick = useCallback(() => {
      dispatch(tasksFilterValue({ todolistID, filterValue: 'all' }))
    }, [])

    const handleActiveClick = useCallback(() => {
      dispatch(tasksFilterValue({ todolistID, filterValue: 'active' }))
    }, [])

    const handleCompletedClick = useCallback(() => {
      dispatch(tasksFilterValue({ todolistID, filterValue: 'completed' }))
    }, [])

    const handleClickDelete = useCallback(() => {
      dispatch(deleteTodolistTC(todolistID))
    }, [])

    return (
      <div className={s.todolistContainer}>
        <div className={s.todolistTitleBlock}>
          <h2 className={s.todolistTitle}>
            <EditableTitle
              itemTitle={title}
              onChange={handleChangeTodolistTitle}
              entityStatus={entityStatus}
            />
          </h2>
          <IconButton className={s.iconButton} onClick={handleClickDelete} disabled={isDisabled}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
        <AddItemForm addItem={handleClickCreateTask} isDisabled={isDisabled} label={'Add task'} />
        <ul className={s.tasksList}>
          {filteredTasks?.map(taskElement => {
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
          })}
        </ul>
        <div className={s.blockButtons}>
          <Button variant={filterValue === 'all' ? 'contained' : 'text'} onClick={handleAllClick}>
            All
          </Button>
          <Button
            variant={filterValue === 'active' ? 'contained' : 'text'}
            onClick={handleActiveClick}
          >
            Active
          </Button>
          <Button
            variant={filterValue === 'completed' ? 'contained' : 'text'}
            onClick={handleCompletedClick}
          >
            Completed
          </Button>
        </div>
        {appStatus === 'loading' && <div className={s.loadingProgress} />}
      </div>
    )
  }
)
