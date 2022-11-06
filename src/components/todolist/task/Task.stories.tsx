import { ReduxStoreProviderDecorator } from '../../../stories/ReduxStoreProviderDecorator'
import { Task } from './Task'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Todolist/Task',
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>

export const TaskExample = () => {
  return (
    <>
      <Task taskID={'1'} taskTitle={'Babel'} isChecked={true} todolistID={'1'} />
      <Task taskID={'2'} taskTitle={'Js'} isChecked={false} todolistID={'2'} />
    </>
  )
}
