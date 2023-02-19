import { action } from '@storybook/addon-actions'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { storeProviderDecorator } from '../../app/storeProviderDecorator'

import { EditableTitle } from './EditableTitle'

export default {
  title: 'Todolist/EditableTitle',
  component: EditableTitle,
  argTypes: {},
  decorators: [storeProviderDecorator],
} as ComponentMeta<typeof EditableTitle>

const Template: ComponentStory<typeof EditableTitle> = args => <EditableTitle {...args} />

export const EditableTitleExample = Template.bind({})

EditableTitleExample.args = {
  itemTitle: 'Editable value',
  onChange: action('Value was edited'),
}
