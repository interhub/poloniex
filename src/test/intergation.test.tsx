import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'

Enzyme.configure({ adapter: new Adapter() })

console.error = jest.fn()

jest.mock('@expo/vector-icons', () => {
	const { View } = require('react-native')
	return {
		SimpleLineIcons: View,
		Ionicons: View,
		MaterialIcons: View,
		AntDesign: View
	}
})

jest.mock('../tool/notificationTool', () => null)

jest.mock('expo-linear-gradient', () => {
	const { View } = require('react-native')
	return {
		LinearGradient: View,
	}
})

jest.mock('@react-navigation/native', () => {
	return {
		...jest.requireActual<any>('@react-navigation/native'),
		useNavigation: () => ({
			navigate: jest.fn(),
		}),
	}
})

jest.mock('@react-native-async-storage/async-storage', () => {
	const { mock } = require('./__mocks__/AsyncStorage')
	return mock()
})

jest.mock('react-native-modalize', () => {
	const { View } = require('react-native')
	return View
})

jest.mock('react-native-safe-area-context', () => {
	return {
		useSafeAreaInsets: () => ({ bottom: 500, top: 500 })
	}
})

const wrapToProvider = (Component: JSX.Element) => {
	return <Provider store={store} >{Component}</Provider>
}

