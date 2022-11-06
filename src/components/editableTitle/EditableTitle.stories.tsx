import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ReduxStoreProviderDecorator } from '../../stories/ReduxStoreProviderDecorator'
import { EditableTitle } from './EditableTitle'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Todolist/EditableTitle',
  component: EditableTitle,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof EditableTitle>

const callback = action('Value was edited')

export const EditableTitleExample = () => {
  return (
    <>
      <EditableTitle itemTitle={'Editable value'} onChange={callback} />
    </>
  )
}
