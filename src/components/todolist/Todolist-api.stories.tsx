import React, { useEffect, useState } from 'react'
import { todolistAPI } from './Todolist-api'

export default {
  title: 'API',
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
    const todolistID = '7d0c24fc-9f9c-44cf-a640-b2fcbabc10ea'
    todolistAPI.deleteTodolist(todolistID).then(res => {
      console.log(res)
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistID = '7d0c24fc-9f9c-44cf-a640-b2fcbabc10ea'
    const todolistTitle = 'Daniil KV'
    todolistAPI.updateTodolistTitle(todolistID, todolistTitle).then(res => {
      console.log(res)
      setState(res.data)
    })
  }, [])

  return <div>{JSON.stringify(state)}</div>
}
