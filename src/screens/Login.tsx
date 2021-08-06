import React from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'

import { useForm } from '../hooks/useForm'
import { Background } from '../components/Background'
import { WhiteLogo } from '../components/WhiteLogo'
import { loginStyles } from '../theme/loginTheme'

interface Props extends StackScreenProps<any, any>{}

export const Login = ({ navigation }: Props) => {
  const { email, password, onChange } = useForm({
    email: '',
    password: ''
  })

  const onLogin = () => {
    console.log({ email, password })
    Keyboard.dismiss()
  }

  return (
    <>
      {/* Background */}
      <Background />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <View style={loginStyles.container}>
          {/* Keyboard avoid view */}
          <WhiteLogo />

          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email: </Text>
          <TextInput
            placeholder='Type your  Email'
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
            onSubmitEditing={onLogin}
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
            onSubmitEditing={onLogin}
          />

          {/* Boton login */}
          <View style={loginStyles.loginButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onLogin}
              style={loginStyles.button}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Crear una nueva cuenta */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('Register')}
              style={loginStyles.button}
            >
              <Text style={loginStyles.buttonText}>Register </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
