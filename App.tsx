import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthProvider } from './src/context/AuthContext'
import { Navigator } from './src/navigator/Navigator'

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App
