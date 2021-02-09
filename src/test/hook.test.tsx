
jest.mock('@react-native-async-storage/async-storage', () => {
	const { mock } = require('./__mocks__/AsyncStorage')
	return mock()
})

