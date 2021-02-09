


const mockReturnValues = {
	arrayOne: JSON.stringify(['red', 'blue']),
	objectOne: JSON.stringify({
		isATest: true,
		hasNestedData: {
			ohYeah: 'it\'s true',
		}
	}),
	stringOne: JSON.stringify('testing string'),
}

function mockMultiGetTestData() {
	return [
		['key1', JSON.stringify({ valor: 1 })],
		['key2', JSON.stringify({ valor: 2 })],
	]
}

function mockMultiSaveTestData() {
	return [
		['key1', { valor: 1 }],
		['key2', { valor: 2 }],
	]
}

// import AsyncStorage from '@react-native-async-storage/async-storage';

export const mock = () => ({
	setItem: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(null)
		})
	}),
	multiSet: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(null)
		})
	}),
	getItem: jest.fn((key) => {
		return new Promise((resolve) => {
			//@ts-ignore
			if (mockReturnValues[key]) {
				//@ts-ignore
				resolve(mockReturnValues[key])
			} else {
				resolve(null)
			}
		})
	}),
	multiGet: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(mockMultiGetTestData())
		})
	}),
	removeItem: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(null)
		})
	}),
	getAllKeys: jest.fn(() => {
		return new Promise((resolve) => {
			resolve(['one', 'two', 'three'])
		})
	}),
	multiRemove: jest.fn(() => ({
		then: jest.fn(),
	})),
})