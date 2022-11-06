import React, { useCallback } from 'react'
import { Delete } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AddItemForm } from '../addItemForm/AddItemForm'
import { EditableTitle } from '../editableTitle/EditableTitle'
import { Task } from './task/Task'
import { addTaskAC, TaskType } from './task/TaskReducer'
import s from './Todolist.module.scss'
import { changeTodolistTitleAC, removeTodolistAC, tasksFilterValueAC } from './TodolistReducer'

type TodolistType = {
  todolistID: string
  title: string
  filterValue: string
  tasks: Array<TaskType>
}

export const Todolist: React.FC<TodolistType> = React.memo(({ todolistID, title, filterValue, tasks }) => {
  console.log(`render TODOLIST ${todolistID}`)
  const dispatch = useDispatch()
  let filteredTasks = tasks

  if (filterValue === 'active') {
    filteredTasks = filteredTasks.filter(taskElement => taskElement.isDone === false)
  }

  if (filterValue === 'completed') {
    filteredTasks = filteredTasks.filter(taskElement => taskElement.isDone === true)
  }

  const tasksData = filteredTasks.map(taskElement => {
    return (
      <Task
        key={taskElement.id}
        taskID={taskElement.id}
        taskTitle={taskElement.title}
        isChecked={taskElement.isDone}
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
