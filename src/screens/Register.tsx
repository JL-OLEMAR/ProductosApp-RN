import React, { useContext, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, View, TouchableOpacity, Keyboard, Alert } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import { AuthContext } from '../context/AuthContext'
import { useForm } from '../hooks/useForm'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyles } from '../theme/loginTheme'

interface Props extends StackScreenProps<any, any>{}

export const Register = ({ navigation }: Props) => {
  const { signUp, errorMessage, removeError } = useContext(AuthContext)

  const { name, email, password, onChange } = useForm({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    if (errorMessage.length === 0) return
    Alert.alert('Error al crear usuario', errorMessage, [{
      text: 'Ok',
      onPress: removeError
    }])
  }, [errorMessage])

  const onRegister = () => {
    console.log({ name, email, password })
    Keyboard.dismiss()
    signUp({ nombre: name, correo: email, password })
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#5856D6' }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <View style={loginStyles.container}>
          {/* Keyboard avoid view */}
          <WhiteLogo />

          <Text style={loginStyles.title}>Register</Text>

          <Text style={loginStyles.label}>Name: </Text>
          <TextInput
            placeholder='Type your Name'
            placeholderTextColor='rgba(255,255,255,0.4)'
            keyboardType='default'
            underlineColorAndroid='white'
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}
            selectionColor='white'
            autoCapitalize='words'
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
          />

          <Text style={loginStyles.label}>Email: </Text>
          <TextInput
            placeholder='Type your Email'
            placeholderTextColor='rgba(255,255,255,0.4)'
            keyboardType='email-address'
            underlineColorAndroid='white'
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onRegister}
          />

          <Text style={loginStyles.label}>Password: </Text>
          <TextInput
            placeholder='******'
            placeholderTextColor='rgba(255,255,255,0.4)'
            secureTextEntry
            underlineColorAndroid='white'
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}
            selectionColor='white'
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onRegister}
          />

          {/* Boton login */}
          <View style={loginStyles.loginButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onRegister}
              style={loginStyles.button}
            >
              <Text style={loginStyles.buttonText}>Create Account</Text>
            </TouchableOpacity>
          </View>

          {/* Crear una nueva cuenta */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.replace('Login')}
            style={loginStyles.buttonReturn}
          >
            <Text style={loginStyles.buttonText}>Login </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
