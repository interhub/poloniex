import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, createSlice, getDefaultMiddleware, PayloadAction } from '@reduxjs/toolkit'
import { PersistConfig, persistReducer, persistStore } from 'redux-persist'
import { StateType, TableInfoItemType } from './../type/types'
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
		setTableInfoAction(state, { payload: table_info }: PayloadAction<TableInfoItemType[]>) { state.table_info = table_info },
		setLoadingAction(state, { payload: loading }: PayloadAction<boolean>) { state.loading = loading },
		setErrorStringAction(state, { payload: error }: PayloadAction<string>) { state.error = error },
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


