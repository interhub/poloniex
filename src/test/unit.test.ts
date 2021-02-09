import deliveryPriceTool from '../tool/deliveryPriceTool'
import formatPhone from '../tool/formatPhone'
import validateTool from '../tool/validateTool'
import { MASK } from './../vars/MASK'

jest.mock('@react-native-async-storage/async-storage', () => {
	const { mock } = require('./__mocks__/AsyncStorage')
	return mock()
})

describe('describe formatPhone func tool tests', () => {
	const phone = MASK.PHONE
	const formatShort = formatPhone.SHORT(phone)

	test('Test formatPhone to Short from long', () => {
		expect(formatShort).toBe('79999999999')
	})

	test('Test formatPhone to Long from short', () => {
		const formatLong = formatPhone.LONG(formatShort)
		expect(formatLong).toBe(phone)
	})
})

describe('describe validateTool tests', () => {
	// NAME
	test('test validateTool for name is valide', () => {
		const name = validateTool.name('Stepan')
		expect(name).toBeTruthy()
	})

	test('test validateTool for name not valide', () => {
		const name = validateTool.name('s')
		expect(name).toBeFalsy()
	})

	// EMAIL
	test('test validateTool for email valide', () => {
		const email = validateTool.email('hallo@mail.ru')
		expect(email).toBeTruthy()
	})

	test('test validateTool for email not valide', () => {
		const email = validateTool.email('hallo.ru')
		expect(email).toBeFalsy()
	})
	// PHONE
	test('test validateTool for phone valide', () => {
		const phone = validateTool.phone(MASK.PHONE)
		expect(phone).toBeTruthy()
	})

	test('test validateTool for phone not valide', () => {
		const phone = validateTool.phone('+7 962 263')
		expect(phone).toBeFalsy()
	})
})

describe('test deliveryPriceTool for check interception line', () => {
	test('line is interc', () => {
		//@ts-ignore
		const isInter = deliveryPriceTool.isInterLines(1, 3, 3, 4, 1, 4, 3, 2)
		expect(isInter).toBeTruthy()
	})

	test('line is interc', () => {
		//@ts-ignore
		const isInter = deliveryPriceTool.isInterLines(1, 3, 3, 4, 3, 3, 3, 2)
		expect(isInter).toBeFalsy()
	})
})
