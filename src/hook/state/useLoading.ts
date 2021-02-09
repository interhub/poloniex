import { useDispatch } from 'react-redux'
import { setLoadingAction } from '../../store/actions'
import { useSelectorStringHook } from './useSelectorStateHook'

/** 
@hook for change loading state for some screen to store
*/
export default () => {
	const { loading } = useSelectorStringHook('loading')
	const dispatch = useDispatch()
	const setLoading = (loading: boolean) => { dispatch(setLoadingAction(loading)) }
	return { loading, setLoading }
}
