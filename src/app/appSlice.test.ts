import {
  RequestStatusType,
  setAppError,
  appReducer,
  setAppStatus,
  InitialStateType,
} from './appSlice'

const startState: InitialStateType = {
  status: 'idle' as RequestStatusType,
  error: '',
  isInitialized: false,
}

test('correct error message should be set', () => {
  const action = setAppError('some error')

  const endState: InitialStateType = appReducer(startState, action)

  expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
  const action = setAppStatus('loading')

  const endState: InitialStateType = appReducer(startState, action)

  expect(endState.status).toBe('loading')
})
