import React, { useEffect, useState } from 'react'
import { todolistAPI } from './Todolist-api'

export default {
  title: 'API/todolist',
}

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    todolistAPI.getTodolists().then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    todolistAPI.createTodolist('Kalach').then(res => {
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const id = '38e401fc-03a8-44bb-9fbd-59c38f3d849d'
    todolistAPI.deleteTodolist(id).then(res => {
      console.log(res)
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistID = '3ffe6c35-7670-4aef-bba4-3195dc5a0100'
    const todolistTitle = 'Daniil KV'
    todolistAPI.updateTodolistTitle(todolistID, todolistTitle).then(res => {
      console.log(res)
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistID = '3ffe6c35-7670-4aef-bba4-3195dc5a0100'
    todolistAPI.getTasks(todolistID).then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistID = '3ffe6c35-7670-4aef-bba4-3195dc5a0100'
    const title = '123'
    todolistAPI.createTask(todolistID, title).then(res => {
      // debugger
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistID = '3ffe6c35-7670-4aef-bba4-3195dc5a0100'
    const taskId = '2b43dd9d-13be-462b-a688-d76739dca86f'
    todolistAPI.deleteTask(todolistID, taskId).then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  const deadline = ''
  const description = ''
  const priority = 2
  const startDate = ''
  const status = 0
  const title = 'DDDDD'
  useEffect(() => {
    const todolistID = '3ffe6c35-7670-4aef-bba4-3195dc5a0100'
    const taskId = 'b23539ae-c360-460f-b449-db8b9f93eeb8'
    todolistAPI
      .updateTask(todolistID, taskId, {
        deadline: deadline,
        description: description,
        priority: priority,
        startDate: startDate,
        status: status,
        title: title,
      })
      .then(res => {
        setState(res.data)
      })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
