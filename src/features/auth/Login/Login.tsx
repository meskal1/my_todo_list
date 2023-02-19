import { useEffect, KeyboardEvent } from 'react'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router'

import { CustomInput } from '../../../components/CustomInput/CustomInput'
import { CustomPasswordInput } from '../../../components/CustomPasswordInput/CustomPasswordInput'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { login } from '../../../utils/validationSchema'
import { logInTC } from '../authSlice'

import s from './Login.module.scss'

export const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const appStatus = useAppSelector(state => state.app.status)
  const isLoggedIn = useAppSelector(state => state.isLoggedIn.isLoggedIn)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: login,
    onSubmit: values => {
      if (appStatus !== 'loading') {
        dispatch(logInTC(values))
      }
    },
  })

  const handleFieldKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      formik.handleSubmit()
    }
  }
  const handleCheckBoxKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      formik.setFieldValue('rememberMe', !formik.getFieldProps('rememberMe').value)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATH.TODOLISTS)
    }
  }, [isLoggedIn])

  return (
    <div className={s.loginContainer}>
      <div className={s.loginContent}>
        <div className={s.loginBlockTitle}>
          <p className={s.text}>
            To log in, get registered&nbsp;
            <a
              className={s.link}
              href={'https://social-network.samuraijs.com/'}
              target={'_blank'}
              rel="noreferrer"
            >
              here
            </a>
            &nbsp;or use common test account credentials:
          </p>
          <p className={s.credentialsContainer}>
            <span>
              Email: <span className={s.credentials}>free@samuraijs.com</span>
            </span>

            <span>
              Password: <span className={s.credentials}>free</span>
            </span>
          </p>
        </div>
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <CustomInput
            label="Email"
            autoComplete="new-password"
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            onKeyDown={handleFieldKeyDown}
            {...formik.getFieldProps('email')}
          />
          <CustomPasswordInput
            label="Password"
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />
          <label className={s.checkbox}>
            <Checkbox
              size="medium"
              onKeyDown={handleCheckBoxKeyDown}
              style={formik.values.rememberMe ? { color: '#00ff26 ' } : { color: 'red ' }}
              checked={formik.values.rememberMe}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<TaskAltIcon />}
              {...formik.getFieldProps('rememberMe')}
            />
            Remember me
          </label>
          <Button className={s.button} type={'submit'} variant={'contained'}>
            Log in
          </Button>
        </form>
      </div>
    </div>
  )
}
