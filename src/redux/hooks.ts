import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootStateType, AppDispatchType } from './store'

// Используйте во всем приложении вместо обычных `useDispatch` и `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
