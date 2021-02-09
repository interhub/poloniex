import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { Provider } from 'react-redux'
import { useSelectorMemoHook, useSelectorStringHook } from '../hook/state/useSelectorStateHook'
import selector from '../selector/selector'
import { setMenuAction } from '../store/actions'
import { store } from '../store/store'

jest.mock('@react-native-async-storage/async-storage', () => {
	const { mock } = require('./__mocks__/AsyncStorage')
	return mock()
})

describe('describe for redux useSelector hook customs useSelectorStringHook', () => {
	test('test useSelectorStringHook for get token', () => {
		const { result: { current } } = renderHook(
			() => useSelectorStringHook('token'),
			{ wrapper: ({ children }: any) => <Provider store={store}>{children}</Provider> }
		)
		expect(current).toEqual({ token: store.getState().token })
	})

	test('test useSelectorStringHook for get menu', () => {
		const { result: { current } } = renderHook(
			() => useSelectorStringHook('menu'),
			{ wrapper: ({ children }: any) => <Provider store={store}>{children}</Provider> }
		)
		expect(current).toEqual({ menu: store.getState().menu })
	})


})

describe('describe for redux useSelector hook customs useSelectorMemoHook', () => {
	const PRICE = 5
	const QUANTITY = 10
	const getProduct = () => ({ img_exists: false, id: 0, description: '', category: 'a', img_url: '', in_cart: true, index: 0, modification_id: 0, name: 'a', price: PRICE, price_formatted: 'a', quantity: QUANTITY, related_products: [], weight: 'a', timestamp: 1 })
	store.dispatch(setMenuAction({ categories: [{ name: 'a', index: 0 }], products: [getProduct()] }))

	test('test product added to store', () => {
		const store_product_price = store.getState().menu.products[0].price
		expect(store_product_price).toBe(PRICE)
	})
	test('test useSelectorStringHook for get cart total', () => {
		const { result: { current: total } } = renderHook(
			() => useSelectorMemoHook(selector.total),
			{ wrapper: ({ children }: any) => <Provider store={store}>{children}</Provider> }
		)
		const EXPECT_TOTAL = PRICE * QUANTITY
		expect(total).toEqual(EXPECT_TOTAL)
	})

	test('test useSelectorStringHook for get cart length', () => {
		const { result: { current: cart } } = renderHook(
			() => useSelectorMemoHook(selector.cart),
			{ wrapper: ({ children }: any) => <Provider store={store}>{children}</Provider> }
		)
		expect(cart.length).toBeGreaterThan(0)
	})

	test('test useSelectorStringHook for get cart length', () => {
		const { result: { current: cart } } = renderHook(
			() => useSelectorMemoHook(selector.cart),
			{ wrapper: ({ children }: any) => <Provider store={store}>{children}</Provider> }
		)
		expect(cart.length).toBeGreaterThan(0)
	})


})

