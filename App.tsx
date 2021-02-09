import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { KeyboardAvoidingView, View } from 'react-native'
import codePush from 'react-native-code-push'
import 'react-native-gesture-handler'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import setUpConfig from './src/config/setUpConfig'
import AppNavigator from './src/navigators/AppNavigator'
import { persistor, store } from './src/store/store'
import { COLOR } from './src/vars/COLOR'
import IS_IOS from './src/vars/IS_IOS'

setUpConfig()

const ProviderApp = () => {
  return (
    <KeyboardAvoidingView style={[{ flex: 1 }]} behavior={IS_IOS ? 'height' : undefined}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <>
            <AppNavigator />
            <StatusBar style={'dark'} translucent={true} backgroundColor={COLOR.NONE} />
          </>
        </PersistGate>
      </ReduxProvider>
    </KeyboardAvoidingView>
  )
}

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL, installMode: codePush.InstallMode.IMMEDIATE }
const codePushProvider = codePush(codePushOptions)(ProviderApp)
codePush.notifyAppReady()
export default __DEV__ ? ProviderApp : codePushProvider
