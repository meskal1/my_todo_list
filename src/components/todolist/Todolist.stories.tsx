import { useSelector } from 'react-redux'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { RootStateType } from '../../redux/store'
import { ReduxStoreProviderDecorator } from '../../stories/ReduxStoreProviderDecorator'
import { Todolist } from './Todolist'
import { TasksType } from './task/TaskReducer'
import { TodolistDomainType } from './TodolistReducer'

export default {
  title: 'Todolist/Todolist',
  component: Todolist,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Todolist>

const TodolistWithRedux = () => {
  const todolists = useSelector<RootStateType, Array<TodolistDomainType>>(state => state.todolists)
  const tasks = useSelector<RootStateType, TasksType>(state => state.tasks)
  return (
    <Todolist
      todolistID={todolists[0].id}
      tasks={tasks[todolists[0].id]}
      title={todolists[0].title}
      filterValue={todolists[0].filter}
      entityStatus={todolists[0].entityStatus}
    />
  )
}

const Template: ComponentStory<typeof TodolistWithRedux> = () => <TodolistWithRedux />

export const TodolistExample = Template.bind({})

TodolistExample.args = {}
