import axios from 'axios'
import React from 'react'

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '2460c652-03c7-4b30-a50a-bdef0c9ad7e8',
  },
}

export const todolistAPI = {
  getTodolists() {
    const promise = axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    return promise
  },
  createTodolist(title: string) {
    const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', { title: title }, settings)
    return promise
  },
  deleteTodolist(id: string) {
    const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    return promise
  },
  updateTodolistTitle(id: string, title: string) {
    const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, { title: title }, settings)
    return promise
  },
}
