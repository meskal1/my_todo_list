import { ComponentMeta, ComponentStory } from '@storybook/react'
import { withRouter } from 'storybook-addon-react-router-v6'

import App from './App'
import { storeProviderDecorator } from './storeProviderDecorator'

import '../index.scss'

export default {
  title: 'Todolist/App',
  component: App,
  argTypes: {},
  decorators: [storeProviderDecorator, withRouter],
  parameters: {
    reactRouter: {
      routePath: '/',
    },
  },
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App demo={true} />

export const AppExample = Template.bind({})

AppExample.args = {}
