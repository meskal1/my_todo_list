import React, { useEffect, useState } from 'react'
import { taskAPI } from './Task-api'

export default {
  title: 'API/task',
}

export const GetTasks = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistID = '3ffe6c35-7670-4aef-bba4-3195dc5a0100'
    taskAPI.getTasks(todolistID).then(res => {
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
    taskAPI.createTask(todolistID, title).then(res => {
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
    taskAPI.deleteTask(todolistID, taskId).then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistID = '3ffe6c35-7670-4aef-bba4-3195dc5a0100'
    const taskId = 'b23539ae-c360-460f-b449-db8b9f93eeb8'
    const title = 'DDDDD'
    taskAPI.updateTask(todolistID, taskId, title).then(res => {
      setState(res.data)
    })
  }, [])
  return <div>{JSON.stringify(state)}</div>
}
