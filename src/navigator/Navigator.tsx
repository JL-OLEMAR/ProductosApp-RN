import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Login } from '../screens/Login'
import { Register } from '../screens/Register'
import { Protected } from '../screens/Protected'

const Stack = createStackNavigator()

export const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='Protected' component={Protected} />
    </Stack.Navigator>
  )
}
