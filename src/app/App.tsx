import { FC, useEffect } from 'react'

import { CustomSnackbar } from '../components/CustomSnackbar/CustomSnackbar'
import { Header } from '../components/Header/Header'
import { LoadingProgress } from '../components/LoadingProgress/LoadingProgress'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { AppRoutes } from '../routes/routes'

import s from './App.module.scss'
import { initializeAppTC } from './appSlice'

type AppType = {
  demo?: boolean
}

const App: FC<AppType> = ({ demo = false }) => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.isLoggedIn.isLoggedIn)
  const isInitialized = useAppSelector(state => state.app.isInitialized)

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeAppTC())
    }
  }, [isLoggedIn, dispatch])

  if (!isInitialized) return <LoadingProgress />

  return (
    <div className={s.appContainer}>
      {isLoggedIn && <Header />}
      <AppRoutes demo={demo} isLoggedIn={isLoggedIn} />
      <CustomSnackbar />
    </div>
  )
}

export default App
