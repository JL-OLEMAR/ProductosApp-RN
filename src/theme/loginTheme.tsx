import { StyleSheet } from 'react-native'

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 600,
    justifyContent: 'center',
    marginBottom: 50,
    paddingHorizontal: 30
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 25
  },
  inputField: {
    color: 'white',
    fontSize: 20
  },
  inputFieldIOS: {
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    paddingBottom: 4
  },
  loginButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50
  },
  button: {
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  buttonReturn: {
    position: 'absolute',
    top: 50,
    left: 20,
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
})
