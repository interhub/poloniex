import { StateType } from '../type/types'

/** 
@object application redux initial state
*/
const state: StateType = {
	/** 
	loading state for display loading process ActivityIndicator
	*/
	loading: false,
	/** 
	error state changed after some error server request or validation (changed from useErrorString.ts hook)
	*/
	error: '',
	/** 
	table info for display currency changes in table
	*/
	table_info: []
}

export default state
