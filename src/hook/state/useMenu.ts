import { useDispatch } from 'react-redux'
import API from '../../api/API'
import { store } from '../../store/store'
import { setProductAction } from '../../store/actions'
import { ProductType } from '../../type/types'

type InfoType = ReturnType<typeof setProductAction>['payload']

/** 
@hook for menu change state manipultation
*/
const useMenu = () => {
	const dispatch = useDispatch()

	const changeCount = (product: ProductType) => {
		const new_product = { ...store.getState().menu.products.find((prod) => prod.index === product.index) || product }
		const setProduct = (info: InfoType) => dispatch(setProductAction(info))
		return {
			PLUS: async () => {
				new_product.quantity++
				new_product.in_cart = true
				setProduct(new_product)
				await API.changeProductServer(new_product)
			},
			MINUS_HARD: async () => {
				if (new_product.quantity > 0) {
					new_product.quantity--
					const in_cart = new_product.quantity !== 0
					new_product.in_cart = in_cart
					setProduct(new_product)
					if (in_cart) {
						await API.changeProductServer(new_product)
					} else {
						await API.removeProductServer(new_product)
					}
				}
			},
			REMOVE: async () => {
				new_product.quantity = 0
				new_product.in_cart = false
				setProduct(new_product)
				await API.removeProductServer(new_product)
			},
			MINUS_CART: async () => {
				if (new_product.quantity > 0) {
					new_product.quantity--
					setProduct(new_product)
					await API.changeProductServer(new_product)
				}
			},
			SET: async ({ quantity, in_cart }: { quantity: number, in_cart: boolean }) => {
				new_product.quantity = quantity
				new_product.in_cart = in_cart
				setProduct(new_product)
				await API.changeProductServer(new_product)
			}
		}
	}

	const cartClear = async () => {
		store.getState().menu.products.forEach((prod, key) => {
			if (prod.in_cart) {
				dispatch(setProductAction({ in_cart: false, quantity: 0, index: prod.index }))
			}
		})
		await API.removeAllCart()
	}

	return { changeCount, cartClear }/// menu_arr, categories }
}
export default useMenu