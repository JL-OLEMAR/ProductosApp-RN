import React, { createContext, useEffect, useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { AuthReducer, AuthState } from './AuthReducer'
import cafeApi from '../api/cafeApi'
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterface'

interface AuthContextProps {
  errorMessage: string
  token: string | null
  user: Usuario | null
  status: 'checking' | 'authenticated' | 'not-authenticated'
  signUp: (RegisterData: RegisterData) => void
  signIn: (loginData: LoginData) => void
  logout: () => void
  removeError: () => void
}

const autInicialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: ''
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(AuthReducer, autInicialState)

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token')
    // No token: no autenticado
    if (!token) return dispatch({ type: 'notAuthenticated' })

    // Hay token
    const resp = await cafeApi.get('/auth')
    if (resp.status !== 200) {
      return dispatch({ type: 'notAuthenticated' })
    }

    // guarda un nuevo token y reemplaza al anterior (sino; se readicionaria el ⌚)
    await AsyncStorage.setItem('token', resp.data.token)
    dispatch({
      type: 'signUp',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario
      }
    })
  }

  const signIn = async ({ correo, password }: LoginData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/auth/login', { correo, password })
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario
        }
      })
      // Guarda el token
      await AsyncStorage.setItem('token', data.token)
    } catch (error) {
      console.log(error.response.data.msg)
      dispatch({
        type: 'addError',
        payload: error.response.data.msg || 'Información incorrecta'
      })
    }
  }

  const signUp = async ({ nombre, correo, password }: RegisterData) => {
    try {
      const { data } = await cafeApi.post<LoginResponse>('/usuarios', { nombre, correo, password })
      dispatch({
        type: 'signUp',
        payload: {
          token: data.token,
          user: data.usuario
        }
      })
      // Guarda el token
      await AsyncStorage.setItem('token', data.token)
    } catch (error) {
      // console.log(error.response.data.msg)
      console.log(error.response.data.errors[0].msg)
      dispatch({
        type: 'addError',
        payload: error.response.data.errors[0].msg || 'Revise la información'
      })
    }
  }

  const logout = async () => {
    // borra el token
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'logout' })
  }

  const removeError = () => { dispatch({ type: 'removeError' }) }

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      signUp,
      logout,
      removeError
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
