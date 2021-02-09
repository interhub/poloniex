import { useSelector } from 'react-redux'
import { StateType } from '../../type/types'

/** 
get store state params by string name (selector)
*/
export const useSelectorProp = <T extends keyof StateType>(prop: T): { [x in T]: StateType[T] } => {
	// @ts-ignore
	const result = useSelector<StateType, { [x in T]: StateType[T] }>((state) => (state[prop]))
	// @ts-ignore 
	return { [prop]: result }
}

