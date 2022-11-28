import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ReduxStoreProviderDecorator } from '../../redux/ReduxStoreProviderDecorator'
import { EditableTitle } from './EditableTitle'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Todolist/EditableTitle',
  component: EditableTitle,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof EditableTitle>

const Template: ComponentStory<typeof EditableTitle> = args => <EditableTitle {...args} />

export const EditableTitleExample = Template.bind({})

EditableTitleExample.args = {
  itemTitle: 'Editable value',
  onChange: action('Value was edited'),
}
