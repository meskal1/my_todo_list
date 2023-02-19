import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useSelector } from 'react-redux'

import { RootStateType } from '../../../app/store'
import { storeProviderDecorator } from '../../../app/storeProviderDecorator'
import { useAppSelector } from '../../../hooks/useAppSelector'

import { Task } from './Task'
import { TasksType } from './taskSlice'

export default {
  title: 'Todolist/Task',
  component: Task,
  argTypes: {},
  decorators: [storeProviderDecorator],
} as ComponentMeta<typeof Task>

const TaskIsDoneWithRedux = () => {
  const tasks = useSelector<RootStateType, TasksType>(state => state.tasks)

  return (
    <Task
      taskID={tasks.todolistId1[0].id}
      taskTitle={tasks.todolistId1[0].title}
      status={tasks.todolistId1[0].status}
      todolistID={'todolistId1'}
      entityStatus={'idle'}
    />
  )
}

const TaskIsNotDoneWithRedux = () => {
  const tasks = useSelector<RootStateType, TasksType>(state => state.tasks)

  return (
    <Task
      taskID={tasks.todolistId1[1].id}
      taskTitle={tasks.todolistId1[1].title}
      status={tasks.todolistId1[1].status}
      todolistID={'todolistId1'}
      entityStatus={'idle'}
    />
  )
}

const TemplateIsDone: ComponentStory<typeof TaskIsDoneWithRedux> = () => <TaskIsDoneWithRedux />

const TemplateNotDone: ComponentStory<typeof TaskIsNotDoneWithRedux> = () => (
  <TaskIsNotDoneWithRedux />
)

export const TaskIsDoneExample = TemplateIsDone.bind({})

TaskIsDoneExample.args = {}

export const TaskIsNotDoneExample = TemplateNotDone.bind({})

TaskIsNotDoneExample.args = {}
