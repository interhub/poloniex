import { createSelector } from '@reduxjs/toolkit'
import { StateType } from './../type/types'

const getMenu = ({ menu }: StateType) => menu

const selector = {
	/** 
	@selector get Cart object from menu store state object use selector
	*/
	cart: createSelector(
		getMenu,
		({ products }) => products.filter(({ in_cart }) => in_cart)
	),

	/** 
	@selector get menu count for display under cart icon (math products counter)
	*/
	menu_count: createSelector(
		getMenu,
		({ products }) => {
			return ({ menu_count: products.map((prod) => prod.quantity)?.reduce((a, b) => a + b, 0) })
		}
	),

	/** 
	@selector get cart total state for display before payment (without delivery price state)
	*/
	total: createSelector(
		getMenu,
		({ products }): number => products.map((prod) => prod.in_cart ? (prod.quantity * prod.price) : 0).reduce((a = 0, b = 0) => a + b, 0)
	),

}

export default selector