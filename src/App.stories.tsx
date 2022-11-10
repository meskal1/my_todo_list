import { ComponentMeta, ComponentStory } from '@storybook/react'
import App from './App'
import './reset.scss'
import { ReduxStoreProviderDecorator } from './stories/ReduxStoreProviderDecorator'

export default {
  title: 'Todolist/App',
  component: App,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App />

export const AppExample = Template.bind({})

AppExample.args = {}
