import { Usuario } from '../interfaces/appInterface'

export interface AuthState {
  errorMessage: string
  status: 'checking' | 'authenticated' | 'not-authenticated'
  token: string | null
  user: Usuario | null
}

type AuthAction =
  | {type: 'signUp', payload: {token: string, user: Usuario}}
  | {type: 'addError', payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logout'}

export const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'addError':
      return {
        ...state,
        errorMessage: action.payload,
        status: 'not-authenticated',
        token: null,
        user: null
      }

    case 'removeError':
      return {
        ...state,
        errorMessage: ''
      }

    case 'signUp':
      return {
        ...state,
        errorMessage: '',
        status: 'authenticated',
        token: action.payload.token,
        user: action.payload.user
      }

    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        status: 'not-authenticated',
        token: null,
        user: null
      }

    default:
      return state
  }
}
