import { useEffect, memo, FC } from 'react'

import { useNavigate } from 'react-router'

import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'

import { Todolist } from './Todolist/Todolist'
import { TodolistDomainType, getTodolistsTC } from './Todolist/todolistSlice'
import s from './Todolists.module.scss'

export type TodolistsType = {
  isLoggedIn: boolean
  demo?: boolean
}

export const Todolists: FC<TodolistsType> = memo(({ demo = false, isLoggedIn }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)

  useEffect(() => {
    if (!demo && isLoggedIn) {
      dispatch(getTodolistsTC())
    } else {
      navigate(PATH.LOGIN)
    }
  }, [isLoggedIn])

  return (
    <div className={s.todolistsContainer}>
      {todolists.map(todolist => {
        return (
          <Todolist
            key={todolist.id}
            todolistID={todolist.id}
            title={todolist.title}
            filterValue={todolist.filter}
            entityStatus={todolist.entityStatus}
          />
        )
      })}
    </div>
  )
})
