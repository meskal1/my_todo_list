import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useSelector } from 'react-redux'

import { RootStateType } from '../../../app/store'
import { storeProviderDecorator } from '../../../app/storeProviderDecorator'
import { TasksType } from '../Task/taskSlice'

import { Todolist } from './Todolist'
import { TodolistDomainType } from './todolistSlice'

export default {
  title: 'Todolist/Todolist',
  component: Todolist,
  argTypes: {},
  decorators: [storeProviderDecorator],
} as ComponentMeta<typeof Todolist>

const TodolistWithRedux = () => {
  const todolists = useSelector<RootStateType, Array<TodolistDomainType>>(state => state.todolists)

  return (
    <Todolist
      todolistID={todolists[0].id}
      title={todolists[0].title}
      filterValue={todolists[0].filter}
      entityStatus={todolists[0].entityStatus}
    />
  )
}

const Template: ComponentStory<typeof TodolistWithRedux> = () => <TodolistWithRedux />

export const TodolistExample = Template.bind({})

TodolistExample.args = {}
