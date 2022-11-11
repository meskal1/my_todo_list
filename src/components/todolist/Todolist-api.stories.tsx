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
