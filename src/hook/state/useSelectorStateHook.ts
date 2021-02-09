import { createSelector } from 'reselect'
import { StateType, ProductType } from '../../type/types'
import { shallowEqual, useSelector } from 'react-redux'
import selector from '../../selector/selector'
import state from '../../store/state'

/**
 * @hook typing hook for get any store state parameterf for every something component body
 */
type ValueOf<T> = T[keyof T]

/** 
get store state params by string name
*/
export const useSelectorStringHook = <T extends keyof StateType>(prop: T): { [x in T]: StateType[T] } => {
	// @ts-ignore
	const result = useSelector<StateType, { [x in T]: StateType[T] }>((state) => (state[prop]))
	// @ts-ignore
	return { [prop]: result }
}

/** 
get store state params with selector (from selector.ts)
*/
export const useSelectorMemoHook = <T extends ValueOf<typeof selector>>(sel: T) => {
	// @ts-ignore
	return useSelector<StateType, ReturnType<T>>(sel)
}

/** 
local selector for get product by index (from ProductType index params)
*/
const getProductSelector = (index: number) => {
	return createSelector(
		(state: StateType) => state.menu,
		(menu) => menu.products.find((prod) => prod.index === index) || menu.products[0]
	)
}

/** 
selector for product page and get product info
*/
export const useProductIndex = (index: number) => {
	return useSelector<StateType, ProductType>(getProductSelector(index))
}