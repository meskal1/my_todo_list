import { instance } from './instance'

// API
export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
  me() {
    return instance.get<ResponseType<AuthMeType>>('auth/me')
  },
}

// TYPES
export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

export type ResponseType<D = {}> = {
  resultCode: number
  messages: Array<string>
  fieldsErrors: Array<string>
  data: D
}

export type AuthMeType = {
  id: number
  email: string
  login: string
}
