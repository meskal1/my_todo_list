import { ReduxStoreProviderDecorator } from '../../../stories/ReduxStoreProviderDecorator'
import { Task } from './Task'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../../redux/store'
import { TasksType } from './TaskReducer'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'Todolist/Task',
  component: Task,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>

const TaskIsDoneWithRedux = () => {
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
  return (
    <Task
      taskID={tasks.todolistId1[0].id}
      taskTitle={tasks.todolistId1[0].title}
      isChecked={tasks.todolistId1[0].isDone}
      todolistID={'todolistId1'}
    />
  )
}

const TaskNotDoneWithRedux = () => {
  const tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks)
  return (
    <Task
      taskID={tasks.todolistId1[1].id}
      taskTitle={tasks.todolistId1[1].title}
      isChecked={tasks.todolistId1[1].isDone}
      todolistID={'todolistId1'}
    />
  )
}

const TemplateIsDone: ComponentStory<typeof TaskIsDoneWithRedux> = () => <TaskIsDoneWithRedux />

const TemplateNotDone: ComponentStory<typeof TaskNotDoneWithRedux> = () => <TaskNotDoneWithRedux />

export const TaskIsDoneExample = TemplateIsDone.bind({})

TaskIsDoneExample.args = {}

export const TaskIsNotDoneExample = TemplateNotDone.bind({})

TaskIsNotDoneExample.args = {}
