import { FC, lazy, Suspense } from 'react'

import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

import { LoadingProgress } from '../components/LoadingProgress/LoadingProgress'
import { PATH } from '../constants/routePaths.enum'
import { Page404 } from '../features/404/Page404'
import { useAppSelector } from '../hooks/useAppSelector'

const Todolists = lazy(() =>
  import('../features/todolists/Todolists').then(module => ({ default: module.Todolists }))
)
const Login = lazy(() =>
  import('../features/auth/Login/Login').then(module => ({ default: module.Login }))
)

const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(state => state.isLoggedIn.isLoggedIn)

  return isLoggedIn ? (
    <Suspense fallback={<LoadingProgress />}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to={PATH.LOGIN} replace />
  )
}

const AuthRoutes = () => {
  const location = useLocation()
  const isLoggedIn = useAppSelector(state => state.isLoggedIn.isLoggedIn)
  let preventAuthLinks = false

  if (isLoggedIn && location.pathname === PATH.LOGIN) {
    preventAuthLinks = true
  }

  return preventAuthLinks ? (
    <Navigate to={PATH.TODOLISTS} replace />
  ) : (
    <Suspense fallback={<LoadingProgress />}>
      <Outlet />
    </Suspense>
  )
}

type AppRoutesType = {
  demo: boolean
  isLoggedIn: boolean
}

export const AppRoutes: FC<AppRoutesType> = ({ demo, isLoggedIn }) => {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate to={PATH.TODOLISTS} replace />} />
        <Route path={PATH.TODOLISTS} element={<Todolists demo={demo} isLoggedIn={isLoggedIn} />} />
      </Route>

      <Route element={<AuthRoutes />}>
        <Route path={PATH.LOGIN} element={<Login />} />
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
