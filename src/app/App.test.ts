import { InitialStateType, RequestStatusType, setAppErrorAC, appReducer, setAppStatusAC } from './AppReducer'

const startState: InitialStateType = {
  status: 'idle' as RequestStatusType,
  error: '',
  isInitialized: false,
}

test('correct error message should be set', () => {
  const action = setAppErrorAC('some error')

  const endState: InitialStateType = appReducer(startState, action)

  expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
  const action = setAppStatusAC('loading')

  const endState: InitialStateType = appReducer(startState, action)

  expect(endState.status).toBe('loading')
})
