import { AddItemForm } from './AddItemForm'
import { action } from '@storybook/addon-actions'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
} as ComponentMeta<typeof AddItemForm>

const callback = action('Add Button or key "Enter" was pressed inside form')

export const AddItemFormExample = () => {
  return <AddItemForm addItem={callback} />
}
