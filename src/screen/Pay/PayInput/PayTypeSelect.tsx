import React from 'react'
import { View } from 'react-native'
import ButtonToggle, { ButtonToggleProps } from '../../../components/ButtonToggle'
import TextLine from '../../../components/TextLine'
import useOrder from '../../../hook/state/useOrder'
import { store } from '../../../store/store'
import { PAYMENT_METHOD } from '../../../vars/PAYMENT_METHOD'

const PayTypeSelect = () => {
	const { setOrderProp, order_info: { payment_method } } = useOrder()

	const pay_types: ButtonToggleProps[] = [
		{
			children: 'Онлайн', onPress: () => setOrderProp('payment_method', PAYMENT_METHOD.CARD_ONLINE,), active: payment_method == PAYMENT_METHOD.CARD_ONLINE
		},
		{
			children: 'При получении наличными', onPress: () => setOrderProp('payment_method', PAYMENT_METHOD.CASH_OFFLINE,), active: payment_method == PAYMENT_METHOD.CASH_OFFLINE
		},
		{
			children: 'При получении картой', onPress: () => setOrderProp('payment_method', PAYMENT_METHOD.CARD_OFFLINE,), active: payment_method == PAYMENT_METHOD.CARD_OFFLINE
		},
	]
	return (
		<>
			<TextLine style={{ marginLeft: 5, marginTop: 20 }} >
				Способ оплаты
			</TextLine>
			{pay_types.map((props, key) => {
				return <ButtonToggle {...props} key={key} right={<View />} />
			})}

		</>
	)
}

export default PayTypeSelect

