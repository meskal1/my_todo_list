import axios, { AxiosResponse } from 'axios'

// API
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
  },
})

export const todolistAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists')
  },
  createTodolist(title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseType>(`todo-lists/${id}`)
  },
  updateTodolistTitle(todolistID: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todolistID}`, { title })
  },
  getTasks(todolistID: string) {
    return instance.get<TasksType>(`todo-lists/${todolistID}/tasks`)
  },
  createTask(todolistID: string, title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistID}/tasks`, { title })
  },
  deleteTask(todolistID: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskId}`)
  },
  updateTask(todolistID: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType>>(`todo-lists/${todolistID}/tasks/${taskId}`, model)
  },
}

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
  me() {
    return instance.get<ResponseType<AuthMeType>>('auth/me')
  },
}

// ENUMS
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export enum ResultCode {
  Ok = 0,
  Error = 1,
  Captcha = 10,
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

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

export type AuthMeType = {
  id: number
  email: string
  login: string
}
