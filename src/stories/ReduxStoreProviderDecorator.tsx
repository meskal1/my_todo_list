import { Provider } from 'react-redux'
import { store } from '../redux/store'

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={store}>{storyFn()}</Provider>
}
