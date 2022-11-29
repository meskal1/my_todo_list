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
