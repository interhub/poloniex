import { StateType } from '../type/types'
import { MAX_DELIVERY_PRICE } from '../vars/DELIVERY_PRICES'
import { PAYMENT_METHOD } from '../vars/PAYMENT_METHOD'
import { SORTING } from '../vars/SORTING'

/** 
@object application redux initial state
*/
const state: StateType = {
	/** 
	user access request token for server api
	*/
	token: '',
	/** 
	@object user info
	*/
	user: {
		name: '',
		phone_number: '',
		email: '',
		date_of_birth: '',
		notifications_token: '',
		prefers_online_payment: false,
	},
	/** 
	user address string for display under MapBoxSmall.tsx and send to order pay request 
	*/
	address: '',
	/** 
	location state for display initial map location to MapFill.tsx and MapBoxSmall.tsx
	*/
	location: { latitude: 0, longitude: 0, longitudeDelta: 1, latitudeDelta: 1 },
	/** 
	loading state for display loading process ActivityIndicator
	*/
	loading: false,
	/** 
	menu sorting state type. Added for save state for redux reselect in async store
	*/
	sorting: SORTING.PRICE_INC,
	/** 
	global menu object state for display menu list (accessed before and after login)
	*/
	menu: { categories: [], products: [] },
	/** 
	full user info for create order before server request (saved to redux reselect store automaticly after change)
	*/
	order_info: {
		door_number: '',
		home_number: '',
		call_home_number: '',
		level_number: '',
		is_delivery: true,
		order_time: 0,
		payment_method: PAYMENT_METHOD.CARD_ONLINE,
		comment: '',
		delivery_price: MAX_DELIVERY_PRICE,
		exist_delivery: false,
	},
	/** 
	error state changed after some error server request or validation (changed from useErrorString.ts hook)
	*/
	error: '',
	/** 
	sales priced list for display over menu on menu screens
	*/
	sales: [],
	/** 
	order history for display on left tab and display order state after create order
	*/
	history: [],
}

export default state
