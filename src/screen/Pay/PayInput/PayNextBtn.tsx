import { useNavigation } from '@react-navigation/native'
import React from 'react'
import API from '../../../api/API'
import { PortalModalButton } from '../../../components/PortalModals'
import useErrorString from '../../../hook/state/useErrorString'
import useLoading from '../../../hook/state/useLoading'
import useOrder from '../../../hook/state/useOrder'
import { useSelectorStringHook } from '../../../hook/state/useSelectorStateHook'
import formatPhone from '../../../tool/formatPhone'
import { PAYMENT_METHOD } from '../../../vars/PAYMENT_METHOD'
import { SCREEN_NAME, SCREEN_NAME_PAY } from '../../../vars/SCREEN_NAME'

const PayNextBtn = () => {
	const navigation = useNavigation()
	const { loading } = useLoading()
	const { setError } = useErrorString()
	const { order_info: { payment_method } } = useOrder()
	const { total_with_delivery } = useOrder()
	const { user: { phone_number } } = useSelectorStringHook('user')
	const isHavePhone = !!formatPhone.SHORT(phone_number)

	const DISABLED = loading || !isHavePhone

	const IS_ONLINE_PAY = payment_method === PAYMENT_METHOD.CARD_ONLINE

	const goToPayProcess = async () => {
		setError('')
		const { data: { payment_url, success, error_message } } = await API.payRequest()
		if (!success) {
			return setError(error_message)
		}
		if (IS_ONLINE_PAY) {
			navigation.reset({
				routes: [{ name: SCREEN_NAME.PROFILE }, { name: SCREEN_NAME.PAY, params: { screen: SCREEN_NAME_PAY.PAY_PROCESS, params: { payment_url } } }],
			})
		} else {
			await API.getAllInfo()
			navigation.reset({ routes: [{ name: SCREEN_NAME.PROFILE }, { name: SCREEN_NAME.PAY, params: { screen: SCREEN_NAME_PAY.PAY_SUCCESS } }] })
		}
	}

	return (
		<PortalModalButton loading={loading} disabled={DISABLED} onPress={goToPayProcess}>
			{IS_ONLINE_PAY ? `Оплатить ${total_with_delivery} ₽` : 'Заказать'}
		</PortalModalButton>
	)
}

export default React.memo(PayNextBtn)
