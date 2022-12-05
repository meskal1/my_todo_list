import React, { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { loginTC } from './AuthReducer'
import { useNavigate } from 'react-router'
import { Box, Typography } from '@mui/material'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.isLoggedIn.isLoggedIn)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Password must be more then 2 symbols'
      }
      return errors
    },
    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn])

  return (
    <>
      <Box display={'flex'} justifyContent={'center'} flexGrow={'1'} alignItems={'center'} p={'0 15px'} flexBasis={'600px'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl sx={{ bgcolor: '#344fa1', p: '15px', borderRadius: '10px', maxWidth: '370px' }}>
            <FormLabel>
              <Box sx={{ color: 'white', fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.5px', lineHeight: '22px' }}>
                <p style={{ margin: '0 0 10px 0', textAlign: 'center' }}>
                  To log in, get registered&nbsp;
                  <a
                    href={'https://social-network.samuraijs.com/'}
                    target={'_blank'}
                    style={{ color: '#F8C655', fontWeight: '600', textDecoration: 'underline' }}>
                    here
                  </a>
                  &nbsp;or use common test account credentials:
                  <br />
                </p>
                Email: <a style={{ color: '#F8C655', fontWeight: '600' }}>free@samuraijs.com</a> <br />
                Password: <a style={{ color: '#F8C655', fontWeight: '600' }}>free</a>
              </Box>
            </FormLabel>
            <FormGroup sx={{ gap: '10px' }}>
              <TextField size='small' variant='standard' id='email' type='email' label='Email' {...formik.getFieldProps('email')} />
              {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
              <TextField
                size='small'
                variant='standard'
                id='password'
                type='password'
                label='Password'
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password && <div style={{ color: 'red' }}>{formik.errors.password}</div>}
              <FormControlLabel
                label={
                  <Typography
                    sx={{
                      fontFamily: 'inherit',
                      letterSpacing: 'inherit',
                      userSelect: 'none',
                      MozUserSelect: 'none',
                      KhtmlUserSelect: 'none',
                    }}>
                    Remember me
                  </Typography>
                }
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    style={formik.values.rememberMe ? { color: '#00ff26 ' } : { color: 'red ' }}
                    checked={formik.values.rememberMe}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<TaskAltIcon />}
                  />
                }
              />
              <Button
                type={'submit'}
                sx={{
                  borderRadius: '30px',
                  bgcolor: '#F8C655',
                  color: 'black',
                  fontWeight: '800',
                  fontFamily: 'inherit',
                  letterSpacing: 'inherit',
                  '&:hover': { backgroundColor: '#F8C655' },
                }}>
                Log in
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Box>
    </>
  )
}

// '&:hover': { backgroundColor: 'white', }
