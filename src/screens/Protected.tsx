import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const Protected = () => {
  return (
    <View>
      <Text>Protected</Text>
      <Text>Hola Mundo</Text>
      <Icon name='star-outline' size={200} color='orange' />
    </View>
  )
}
