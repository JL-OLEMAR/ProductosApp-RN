import React, { useContext } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../context/AuthContext'

export const Protected = () => {
  const { user, token, logout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Protected</Text>
      <Icon name='checkmark-circle-outline' size={200} color='green' />
      <Button
        title='logout'
        color='#5856D6'
        onPress={logout}
      />

      <Text>
        {JSON.stringify(user, null, 4)}
      </Text>
      <Text style={{ marginHorizontal: 12 }}>
        "token": {JSON.stringify(token, null, 1)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  }
})
