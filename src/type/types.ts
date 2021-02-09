import { PAYMENT_METHOD } from './../vars/PAYMENT_METHOD'
import { SCREEN_NAME } from './../vars/SCREEN_NAME'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { LocationType } from './../tool/locationTool'
import { SORTING } from './../vars/SORTING'

/** 
user full info type
*/
export type UserType = {
	name: string
	phone_number: string
	email: string
	date_of_birth: string
	notifications_token: string
	prefers_online_payment: boolean
}

/** 
Access server token type 
*/
export type TokenType = string

/** 
Every menu products type 
*/
export type ProductType = {
	category: string
	description: string
	id: number
	img_exists: boolean
	img_url: string
	in_cart: boolean
	modification_id: number
	name: string
	price: number
	price_formatted: string
	quantity: number
	related_products: number[]
	timestamp: number
	weight: string
	index: number
}

/** 
Every menu categories type
*/
export type CategoryType = {
	name: string
	index: number
}

/** 
Menu type with categories type and products
*/
export type MenuType = {
	categories: CategoryType[]
	products: ProductType[]
}

/** 
Sales Promotions type for display over menu list
*/
export type SaleActionType = {
	title: string
	image: string
	content: string
}

/** 
History Order Item type for left tab
*/
export type HistoryOrderType = {
	id: number
	datetime_created: number
	status: string
	can_be_repeated: boolean
	can_be_canceled: boolean
	products: ProductType[]
	total: number
	total_formatted: string
}

/** 
Screen params navigaton types by doc from https://reactnavigation.org/docs/typescript/
*/
type SCREEN_PARAMS_ALL = {
	[SCREEN_NAME.PRODUCT_PAGE]: { index: number }
	[SCREEN_NAME.SMS_AUTH]: { callback: (code: string) => void; phone_number: UserType['phone_number'] }
	[SCREEN_NAME.REGISTR]: { phone_number: UserType['phone_number'] }
	[SCREEN_NAME.PROFILE]: undefined
	[SCREEN_NAME.SALE_PAGE]: { sale: SaleActionType }
	[SCREEN_NAME.CART_PAGE]: undefined
	[SCREEN_NAME.LOGIN]: undefined
	[SCREEN_NAME.PAY]: undefined
	[SCREEN_NAME.MAP_PAGE]: undefined
	[SCREEN_NAME.DEMO_MENU]: undefined
}

/** 
NAV type for use in useNavigation hook to every screen
*/
export type NAV_TYPE = StackNavigationProp<SCREEN_PARAMS_ALL, SCREEN_NAME>

/** 
ROUTE type for use in useRoute hook to every navigate screen
*/
export type ROUTE_TYPE<T extends SCREEN_NAME> = RouteProp<SCREEN_PARAMS_ALL, T>

/** 
Redux full initial state type
*/
export type StateType = {
	token: TokenType
	user: UserType
	location: LocationType
	address: string
	loading: boolean
	sorting: SORTING
	menu: MenuType
	order_info: OrderInfoType
	error: string
	sales: SaleActionType[]
	history: HistoryOrderType[]
}

/** 
user order info from all textInputs before payment (forms types)
*/
export type OrderInfoType = {
	is_delivery: boolean
	door_number: string
	home_number: string
	call_home_number: string
	level_number: string
	order_time: number
	payment_method: PAYMENT_METHOD
	comment: string
	delivery_price: number
	exist_delivery: boolean
}
