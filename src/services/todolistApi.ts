import { TaskStatuses, TaskPriorities } from '../constants/task.enum'

import type { ResponseType } from './authApi'
import { instance } from './instance'

// API
export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },
  updateTodolistTitle(todolistID: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistID}`, { title })
  },
  getTasks(todolistID: string) {
    return instance.get<TasksType>(`todo-lists/${todolistID}/tasks`)
  },
  createTask(todolistID: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistID}/tasks`, {
      title,
    })
  },
  deleteTask(todolistID: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskId}`)
  },
  updateTask(todolistID: string, taskId: string, data: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistID}/tasks/${taskId}`, data)
  },
}

// TYPES
export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TaskType = {
  id: string
  title: string
  description: string
  todoListId: string
  order: number
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  addedDate: string
}

type TasksType = {
  error: string | null
  totalCount: number
  items: Array<TaskType>
}

export type UpdateTaskModelType = {
  deadline: string
  description: string
  priority: TaskPriorities
  startDate: string
  status: TaskStatuses
  title: string
}
