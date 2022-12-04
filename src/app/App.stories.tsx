import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ReduxStoreProviderDecorator } from '../redux/ReduxStoreProviderDecorator'
import { withRouter } from 'storybook-addon-react-router-v6'
import App from './App'
import './reset.scss'

export default {
  title: 'Todolist/App',
  component: App,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator, withRouter],
  parameters: {
    reactRouter: {
      routePath: '/',
    },
  },
} as ComponentMeta<typeof App>

const Template: ComponentStory<typeof App> = () => <App demo={true} />

export const AppExample = Template.bind({})

AppExample.args = {}
