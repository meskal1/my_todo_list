//DAL
import axios from 'axios'
import { ResponseType } from '../Todolist-api'

type ResponseTaskType = {
  id: string
  title: string
  description: string
  todoListId: string
  order: number
  status: number
  priority: number
  startDate: string
  deadline: string
  addedDate: string
}

type TasksType = {
  error: string | null
  totalCount: number
  items: {
    item: Array<ResponseTaskType>
  }
}

type UpdateTaskModelType = {
  deadline: string
  description: string
  priority: number
  startDate: string
  status: number
  title: string
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true, //withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
  headers: {
    'API-KEY': '2460c652-03c7-4b30-a50a-bdef0c9ad7e8',
  },
})

export const taskAPI = {
  getTasks(todolistID: string) {
    return instance.get<TasksType>(`todo-lists/${todolistID}/tasks`)
  },
  createTask(todolistID: string, title: string) {
    return instance.post<ResponseType<ResponseTaskType>>(`todo-lists/${todolistID}/tasks`, { title })
  },
  deleteTask(todolistID: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskId}`)
  },
  updateTask(todolistID: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`todo-lists/${todolistID}/tasks/${taskId}`, model)
  },
}
