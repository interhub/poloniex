import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, createSlice, getDefaultMiddleware, PayloadAction } from '@reduxjs/toolkit'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import { logOutNavigation } from './../config/navigateRef'
import { LocationType } from './../tool/locationTool'
import { HistoryOrderType, MenuType, OrderInfoType, SaleActionType, StateType, UserType } from './../type/types'
import { SORTING } from './../vars/SORTING'
import state from './state'

export const {
	/** 
	redux initial reducer and actions for change state (by redux-tool-kit doc  https://redux-toolkit.js.org  )
	*/
	reducer,
	/** 
	actions for store dispatching  https://redux-toolkit.js.org  )
	*/
	actions
} = createSlice({
	name: 'root',
	initialState: state,
	reducers: {
		setMenuAction(state, { payload: menu }: PayloadAction<MenuType>) { const new_menu = { ...menu }; state.menu = new_menu },
		setErrorStringAction(state, { payload: error }: PayloadAction<string>) { state.error = error },
		setTokenAction(state, { payload: token }: PayloadAction<string>) { state.token = token },
		setLoadingAction(state, { payload: loading }: PayloadAction<boolean>) { state.loading = loading },
		setUserAction(state, { payload: user }: PayloadAction<UserType>) { state.user = user },
		setSalesAction(state, { payload: sales }: PayloadAction<SaleActionType[]>) { state.sales = sales },
		setLocationAction(state, { payload: { location, address } }: PayloadAction<{ location: LocationType, address: string }>) { state.location = location, state.address = address },
		setOrderInfoAction(state, { payload: order_info }: PayloadAction<OrderInfoType>) { state.order_info = order_info },
		setHistoryAction(state, { payload: history }: PayloadAction<HistoryOrderType[]>) { state.history = history },
		setSortingAction(state, { payload: sorting }: PayloadAction<SORTING>) { state.sorting = sorting }, //@ts-ignore
		logOutResetAction(state, { payload: new_state }: PayloadAction<StateType>) {
			//TODO CHANGE SAVED INFO AFTER LOGOUT LOGIN
			state.user = new_state.user
			state.token = ''
			state.menu.products.forEach((prod) => { prod.quantity = 0; prod.in_cart = false })
			logOutNavigation()
		},
		setProductAction(state, { payload: info }: PayloadAction<{ index: number, quantity: number, in_cart: boolean }>) {
			const ind = state.menu.products.findIndex((prod) => prod.index === info.index)
			state.menu.products[ind].quantity = info.quantity
			state.menu.products[ind].in_cart = info.in_cart
		}
	}
})

/** 
redux persist config by doc form  https://www.npmjs.com/package/redux-persist 
*/
const persistConfig: PersistConfig<StateType> = {
	key: 'root',
	storage: AsyncStorage,
	blacklist: ['loading', 'error', 'menu'],
}
const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = getDefaultMiddleware({
	immutableCheck: false,
	serializableCheck: false,
})

/** 
application redux store by redux doc  https://react-redux.js.org/  and create use redux-tool-kit doc  https://redux-toolkit.js.org )
*/
const store = configureStore({
	devTools: true,
	reducer: persistedReducer,
	middleware,
	preloadedState: state,
})

/** 
redux persist config by doc form  https://www.npmjs.com/package/redux-persist 
*/
const persistor = persistStore(store as any)

export { store, persistor }


