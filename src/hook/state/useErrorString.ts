import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setErrorStringAction } from '../../store/actions'
import { useSelectorProp } from './useSelectorProp'

/** 
@hook for change store error state to some screen component
*/
export default () => {
	const dispatch = useDispatch()
	const { error } = useSelectorProp('error')
	const setError = (err: string) => {
		dispatch(setErrorStringAction(err))
	}
	useEffect(() => {
		return () => {
			setError('')
		}
	}, [])

	return { error, setError }

}