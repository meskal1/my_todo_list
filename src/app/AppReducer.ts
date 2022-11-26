export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: '',
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SET_APP_STATUS':
      return { ...state, status: action.payload.status }
    case 'SET_APP_ERROR':
      return { ...state, error: action.payload.error }
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) => {
  return {
    type: 'SET_APP_STATUS',
    payload: {
      status,
    },
  } as const
}

export const setAppErrorAC = (error: string) => {
  return {
    type: 'SET_APP_ERROR',
    payload: {
      error,
    },
  } as const
}

type ActionsType = SetAppStatusACType | SetAppErrorACType

type SetAppStatusACType = ReturnType<typeof setAppStatusAC>

type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
