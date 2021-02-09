import { fireEvent, render } from '@testing-library/react-native'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { View } from 'react-native'
import { TextInputProps } from 'react-native-paper/lib/typescript/components/TextInput/TextInput'
import { Provider } from 'react-redux'
import ButtonToggle from '../components/ButtonToggle'
import MapPageHeader from '../screen/MapPage/MapPageHeader'
import { SelectModalContent } from '../screen/Pay/PayInput/PayTimeSelect'
import PayTypeSelect from '../screen/Pay/PayInput/PayTypeSelect'
import MenuItem from '../screen/TabsProfile/MenuTab/MenuItem'
import { setMenuAction, setTokenAction } from '../store/actions'
import { store } from '../store/store'
import { COLOR } from '../vars/COLOR'
import { PAYMENT_METHOD } from '../vars/PAYMENT_METHOD'

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

jest.mock('../components/ImageHoc', () => {
	const { View } = require('react-native')
	return View
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

jest.mock('expo-location', () => {
	return null
})
jest.mock('react-native-safe-area-context', () => {
	return {
		useSafeAreaInsets: () => ({ bottom: 500, top: 500 })
	}
})

const wrapToProvider = (Component: JSX.Element) => {
	return <Provider store={store} >{Component}</Provider>
}

describe('Testing module for Button Toggle', () => {
	test('Button toggle custom component work pressing', () => {
		const mockFn = jest.fn()
		const { getByText } = render(
			<ButtonToggle active onPress={mockFn} >
				press
			</ButtonToggle>
		)
		fireEvent.press(getByText('press'))

		expect(mockFn).toBeCalled()
	})

	test('Button toggle have active color and updating for change state color', () => {
		const active = true
		const { toJSON } = render(
			<ButtonToggle active={active} >
				none
			</ButtonToggle>
		)

		const color = toJSON()?.props.style.backgroundColor
		expect(color).toBe(COLOR.YELLOW)
	})
})

describe('Menu Item testing Auth user can be increment product to cart', () => {
	const TEST_QUANTITY = 2
	const getProduct = () => ({ img_exists: false, id: 0, description: '', category: 'a', img_url: '', in_cart: false, index: 0, modification_id: 0, name: 'a', price: 1, price_formatted: 'a', quantity: 0, related_products: [], weight: 'a', timestamp: 1 })
	const getLast = () => (store.getState().menu.products[0])
	const getMount = () => Enzyme.mount(wrapToProvider(<MenuItem product={getLast()} />))
	const setInitialMenuState = () => {
		store.dispatch(setMenuAction({ categories: [{ name: 'a', index: 0 }], products: [getProduct()] }))
		store.dispatch(setTokenAction('test token'))
	}
	const changePressAdd = (btn: { props: () => { onPlus: () => void } }) => {
		for (let i = 0; i < TEST_QUANTITY; i++) {
			btn.props().onPlus()
		}
	}

	test('Change count for PLUS product STORE STATE', () => {
		setInitialMenuState()
		const wrapper = getMount()
		const plusBtn: any = wrapper.find('PlusMinus').first()
		changePressAdd(plusBtn)
		const count = store.getState().menu.products[0].quantity
		expect(count).toBe(TEST_QUANTITY)
	})

	test('Check display state after dispatch updating COUNT', () => {
		const wrapper = getMount()
		const plusBtn = wrapper.find('PlusMinus').first()
		expect(plusBtn.text()).toBe(`${TEST_QUANTITY} шт`)
	})
})


describe('Set Payment type testing component PayTypeSelect', () => {
	const getMount = () => Enzyme.mount(wrapToProvider(<PayTypeSelect />))
	const addPressEventBtn = (btn: { props: () => { onPress: () => void } }) => {
		btn.props().onPress()
	}

	test('Test set state store action result', async () => {
		const wrapper = getMount()
		const secondBtn = wrapper.find('ButtonToggle').findWhere((node) => node.text() === 'При получении наличными').first() //MUST BE FALSE
		addPressEventBtn(secondBtn)
		const order_not_online = !(store.getState().order_info.payment_method === PAYMENT_METHOD.CARD_ONLINE)
		expect(order_not_online).toBeTruthy()
	})

	test('After updating check state ON DISPLAY', () => {
		const wrapper = getMount()
		const secondBtn = wrapper.find('ButtonToggle').findWhere((node) => node.text() === 'При получении наличными').first() //MUST BE FALSE
		const second_btn_active = !!secondBtn.prop('active')
		expect(second_btn_active).toBeTruthy()
	})
})




describe('describe Data Time picker shout be change state order time', () => {
	const realUseState = React.useState
	jest
		.spyOn(React, 'useState')
		.mockImplementation((): any => realUseState(true))
	const TEST_TIME = 100
	const wrapper = Enzyme.mount(wrapToProvider(<SelectModalContent />))

	test('check order time store changed state', () => {
		const DatePickerBox = wrapper.find('DatePickerBox').first()
		// @ts-ignore
		DatePickerBox.props().onSelect(TEST_TIME)
		const store_time = store.getState().order_info.order_time
		expect(store_time).toBe(TEST_TIME)
		wrapper.update()
	})

	test('check changed display state after picked time', () => {
		const DisplayBtn = wrapper.find('ButtonToggle').at(1)
		// console.log(DisplayBtn.debug(), 'BTN')
		expect(DisplayBtn.text()).toBe('01.01.1970 - 03.00 ч')
	})


})


// describe('Map header text input should be change address state', () => {
// 	const getMount = () => Enzyme.mount(wrapToProvider(<MapPageHeader />))

// 	test('Change address with text input add text', () => {
// 		const wrapper = getMount()
// 		console.log(wrapper.debug(), 'wrapper')
// 		const input = wrapper.find('TextInput').first()
// 		//@ts-ignore
// 		input.props().onChangeText('Калининград')
// 		console.log('hello')
// 		expect(input).toBeTruthy()
// 	})
// })
