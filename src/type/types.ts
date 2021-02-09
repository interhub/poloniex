import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { SCREEN_NAME } from './../vars/SCREEN_NAME'

/** 
Screen params navigaton types by doc from https://reactnavigation.org/docs/typescript/
*/
type SCREEN_PARAMS_ALL = {
	[SCREEN_NAME.LOAD_PAGE]: undefined
	[SCREEN_NAME.TABS_PAGE]: undefined
	[SCREEN_NAME.CHART_PAGE]: { id: number }
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
	table_info: TableInfoItemType[]
	loading: boolean
	error: string
}

/** 
user order info from all textInputs before payment (forms types)
*/
export type TableInfoItemType = {
	name: string
	id: number
	last: string
	lowestAsk: string
	highestBid: string
	percentChange: string
	baseVolume: string
	quoteVolume: string
	isFrozen: '0' | '1'
	high24hr: string
	low24hr: string
}
