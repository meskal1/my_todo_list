import { AddItemForm } from './AddItemForm'
import { action } from '@storybook/addon-actions'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>

const Template: ComponentStory<typeof AddItemForm> = args => <AddItemForm {...args} />

export const AddItemFormExample = Template.bind({})

AddItemFormExample.args = {
  addItem: action('Add Button or key "Enter" was pressed inside form'),
}

const TemplateDisabled: ComponentStory<typeof AddItemForm> = args => <AddItemForm {...args} isDisabled={true} />

export const AddItemFormExampleDisabled = TemplateDisabled.bind({})

AddItemFormExampleDisabled.args = {
  addItem: action('Add Button or key "Enter" was pressed inside form'),
}
// const TaskIsNotDoneWithRedux = () => {
// 	const tasks = useSelector<RootStateType, TasksType>(state => state.tasks)
// 	return (
// 	  <Task
// 		 taskID={tasks.todolistId1[1].id}
// 		 taskTitle={tasks.todolistId1[1].title}
// 		 status={tasks.todolistId1[1].status}
// 		 todolistID={'todolistId1'}
// 	  />
// 	)
//  }

//  const TemplateIsDone: ComponentStory<typeof TaskIsDoneWithRedux> = () => <TaskIsDoneWithRedux />

//  const TemplateNotDone: ComponentStory<typeof TaskIsNotDoneWithRedux> = () => <TaskIsNotDoneWithRedux />

//  export const TaskIsDoneExample = TemplateIsDone.bind({})

//  TaskIsDoneExample.args = {}

//  export const TaskIsNotDoneExample = TemplateNotDone.bind({})

//  TaskIsNotDoneExample.args = {}
