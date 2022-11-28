import { ReduxStoreProviderDecorator } from '../../../redux/ReduxStoreProviderDecorator'
import { Task } from './Task'
import { useSelector } from 'react-redux'
import { RootStateType } from '../../../redux/store'
import { TasksType } from './TaskReducer'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Todolist/Task',
  component: Task,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>

const TaskIsDoneWithRedux = () => {
  const tasks = useSelector<RootStateType, TasksType>(state => state.tasks)
  return (
    <Task
      taskID={tasks.todolistId1[0].id}
      taskTitle={tasks.todolistId1[0].title}
      status={tasks.todolistId1[0].status}
      todolistID={'todolistId1'}
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
    />
  )
}

const TemplateIsDone: ComponentStory<typeof TaskIsDoneWithRedux> = () => <TaskIsDoneWithRedux />

const TemplateNotDone: ComponentStory<typeof TaskIsNotDoneWithRedux> = () => <TaskIsNotDoneWithRedux />

export const TaskIsDoneExample = TemplateIsDone.bind({})

TaskIsDoneExample.args = {}

export const TaskIsNotDoneExample = TemplateNotDone.bind({})

TaskIsNotDoneExample.args = {}
