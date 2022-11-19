import React, { useCallback, useEffect } from 'react'
import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { AddItemForm } from '../addItemForm/AddItemForm'
import { EditableTitle } from '../editableTitle/EditableTitle'
import { Task } from './task/Task'
import { addTaskAC, fetchTasksTC } from './task/TaskReducer'
import s from './Todolist.module.scss'
import { changeTodolistTitleAC, removeTodolistAC, tasksFilterValueAC } from './TodolistReducer'
import { TaskStatuses, TaskType } from './Todolist-api'
import { useAppDispatch } from '../../redux/hooks'

type TodolistType = {
  todolistID: string
  title: string
  filterValue: string
  tasks: Array<TaskType>
}

export const Todolist: React.FC<TodolistType> = React.memo(({ todolistID, title, filterValue, tasks }) => {
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

  const onChangeTodolistTitle = useCallback((todolistTitle: string) => dispatch(changeTodolistTitleAC(todolistID, todolistTitle)), [])

  const onClickAddTaskHandler = useCallback((taskTitle: string) => dispatch(addTaskAC(todolistID, taskTitle)), [todolistID])

  const onAllClickHandler = useCallback(() => {
    dispatch(tasksFilterValueAC(todolistID, 'all'))
  }, [])

  const onActiveClickHandler = useCallback(() => {
    dispatch(tasksFilterValueAC(todolistID, 'active'))
  }, [])

  const onCompletedClickHandler = useCallback(() => {
    dispatch(tasksFilterValueAC(todolistID, 'completed'))
  }, [])

  const onClickRemoveHandler = useCallback(() => {
    dispatch(removeTodolistAC(todolistID))
  }, [])

  //   const startState: any = {
  //     todoListID1: [
  //       { id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todoListID1' },
  //       { id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todoListID1' },
  //       { id: '3', title: 'React', status: TaskStatuses.Completed, todoListId: 'todoListID1' },
  //     ],
  //   }
  //   console.log(Object.keys(startState) + '')
  useEffect(() => {
    dispatch(fetchTasksTC(todolistID))
  }, [])

  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3>
            <EditableTitle itemTitle={title} onChange={onChangeTodolistTitle} />
          </h3>
          <IconButton onClick={onClickRemoveHandler}>
            <Delete />
          </IconButton>
        </div>
        <AddItemForm addItem={onClickAddTaskHandler} />
        <ul>{tasksData}</ul>
        <div>
          <Button variant={filterValue === 'all' ? 'contained' : 'text'} onClick={onAllClickHandler}>
            All
          </Button>
          <Button variant={filterValue === 'active' ? 'contained' : 'text'} onClick={onActiveClickHandler}>
            Active
          </Button>
          <Button variant={filterValue === 'completed' ? 'contained' : 'text'} onClick={onCompletedClickHandler}>
            Completed
          </Button>
        </div>
      </div>
    </>
  )
})
