import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ReduxStoreProviderDecorator } from '../stories/ReduxStoreProviderDecorator'
import App from './App'
import './reset.scss'

export default {
  title: 'Todolist/App',
  component: App,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App demo={true} />

export const AppExample = Template.bind({})

AppExample.args = {}
