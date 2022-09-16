import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { AddItemForm } from './AddItemForm'
import { FilterValuesType } from './App'
import s from './Todolist.module.scss'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodolistType = {
  todolistID: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskID: string, todolistID: string) => void
  filterTasks: (todolistID: string, filterValue: FilterValuesType) => void
  addTask: (todolistID: string, taskTitle: string) => void
  changeTaskStatus: (taskID: string, todolistID: string, isDone: boolean) => void
  filterValue: string
  removeTodolist: (todolistID: string) => void
}

export const Todolist: React.FC<TodolistType> = ({
  todolistID,
  title,
  tasks,
  removeTask,
  filterTasks,
  addTask,
  changeTaskStatus,
  filterValue,
  removeTodolist,
}) => {
  const tasksData = tasks.map(taskElement => {
    const onClickButtonHandler = () => removeTask(taskElement.id, todolistID)
    const onChangeInputHandler = () => changeTaskStatus(taskElement.id, todolistID, taskElement.isDone)
    return (
      <li key={taskElement.id} className={taskElement.isDone ? s.completed : ''}>
        <input type='checkbox' checked={taskElement.isDone} onChange={onChangeInputHandler} /> <span>{taskElement.title}</span>{' '}
        <button onClick={onClickButtonHandler}>X</button>
      </li>
    )
  })
  const onClickAddTaskHandler = (taskTitle: string) => addTask(todolistID, taskTitle)
  const onAllClickHandler = () => filterTasks(todolistID, 'all')
  const onActiveClickHandler = () => filterTasks(todolistID, 'active')
  const onCompletedClickHandler = () => filterTasks(todolistID, 'completed')
  const onClickRemoveHandler = () => removeTodolist(todolistID)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3>{title}</h3>
        <button style={{ width: '20px', height: '20px', margin: '0 0 0 10px' }} onClick={onClickRemoveHandler}>
          X
        </button>
      </div>
      <AddItemForm addItem={onClickAddTaskHandler} />
      <ul>{tasksData}</ul>
      <div>
        <button className={filterValue === 'all' ? s.active : ''} onClick={onAllClickHandler}>
          All
        </button>
        <button className={filterValue === 'active' ? s.active : ''} onClick={onActiveClickHandler}>
          Active
        </button>
        <button className={filterValue === 'completed' ? s.active : ''} onClick={onCompletedClickHandler}>
          Completed
        </button>
      </div>
    </div>
  )
}
