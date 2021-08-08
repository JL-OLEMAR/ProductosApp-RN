/* eslint-disable @typescript-eslint/consistent-type-definitions */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Products } from '../screens/Products'
import { Product } from '../screens/Product'

export type ProductsStackParams = {
  Products: undefined
  Product: {id?: string, name?: string}
}

const Stack = createStackNavigator<ProductsStackParams>()

export const ProductsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent'
        }
      }}
    >
      <Stack.Screen name='Products' component={Products} options={{ title: 'Productos' }} />
      <Stack.Screen name='Product' component={Product} options={{ title: 'Producto' }} />
    </Stack.Navigator>
  )
}
