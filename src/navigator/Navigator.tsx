import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { AuthContext } from '../context/AuthContext'
import { ProductsNavigator } from './ProductsNavigator'
import { Login } from '../screens/Login'
import { Register } from '../screens/Register'
import { Protected } from '../screens/Protected'
import { Loading } from '../screens/Loading'

const Stack = createStackNavigator()

export const Navigator = () => {
  const { status } = useContext(AuthContext)

  if (status === 'checking') return <Loading />

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        (status !== 'authenticated')
          ? (
            <>
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Register' component={Register} />
            </>
          )
          : (
            <>
              <Stack.Screen name='ProductsNavigator' component={ProductsNavigator} />

              {/* Protected no se usa */}
              <Stack.Screen name='Protected' component={Protected} />
            </>
          )
      }

    </Stack.Navigator>
  )
}
