import { useDispatch } from 'react-redux'
import selector from '../../selector/selector'
import { setOrderInfoAction } from '../../store/actions'
import { OrderInfoType } from '../../type/types'
import { useSelectorStringHook, useSelectorMemoHook } from './useSelectorStateHook'

/** 
@hook for change order state and get order info for some component (from selector updates)
*/
const useOrder = () => {

	const dispatch = useDispatch()

	const { order_info } = useSelectorStringHook('order_info')
	const total = useSelectorMemoHook(selector.total)
	const total_with_delivery = total + order_info.delivery_price

	const setOrderProp = (prop: keyof OrderInfoType, val: string | boolean | number) => {
		const new_order_info = { ...order_info }
		//@ts-ignore
		new_order_info[prop] = val
		dispatch(setOrderInfoAction(new_order_info))
	}
	return { setOrderProp, order_info, total_with_delivery }
}
export default useOrder