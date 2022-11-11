//DAL
import axios from 'axios'

type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true, //withCredentials определяет, должны ли межсайтовые (кроссдоменные) запросы выполняться с использованием учетных данных (cookie)
  headers: {
    'API-KEY': '2460c652-03c7-4b30-a50a-bdef0c9ad7e8',
  },
})

export const todolistAPI = {
  getTodolists() {
    return instance.get<Array<TodolistType>>('todo-lists')
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
}
