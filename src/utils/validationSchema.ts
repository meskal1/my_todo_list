import * as yup from 'yup'

const email = yup
  .string()
  .email('Enter a valid email')
  .max(50, 'Enter a valid email')
  .required('Email is required')
const password = yup
  .string()
  .min(4, 'Password must contain at least 4 characters')
  .max(30, 'Password is too long')
  .required('Enter your password')
const rememberMe = yup.boolean()

export const login = yup.object({ email, password, rememberMe })
