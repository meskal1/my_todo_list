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
    const todolistID = '6e9ffeff-0af6-4009-a48b-f95b7bee3dad'
    const todolistTitle = 'Daniil'
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
    const todolistID = 'cc7b3db2-e178-4877-8f99-c1af5374f64f'
    const title = '123456'
    todolistAPI.createTask(todolistID, title).then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistID = '3ffe6c35-7670-4aef-bba4-3195dc5a0100'
    const taskId = 'b6bacf5b-8798-4d01-9f90-76077df5b887'
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
    const taskId = '883f10f2-6b76-466f-8468-ca2bf551e4ea'
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
