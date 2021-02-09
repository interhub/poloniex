import React from 'react'
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { PayTitleHeader } from '../../../components/HeadersBlack'
import ScrollViewContainer from '../../../components/ScrollViewContainer'
import TextInputCustom, { TextInputCustomProps } from '../../../components/TextInputCustom'
import TextLine from '../../../components/TextLine'
import useErrorString from '../../../hook/state/useErrorString'
import useOrder from '../../../hook/state/useOrder'
import { COLOR } from '../../../vars/COLOR'
import SIZE from '../../../vars/SIZE'
import PayMapHeader from './PayMapHeader'
import PayNextBtn from './PayNextBtn'
import PayTimeSelect from './PayTimeSelect'
import PayTypeSelect from './PayTypeSelect'
import PhoneChangeBtn from './PhoneChangeBtn'

const PayInputScreen = () => {
	const { order_info: { is_delivery, }, setOrderProp, order_info } = useOrder()
	const { error } = useErrorString()

	const input_props: TextInputCustomProps[] = [
		{ label: 'Кв./Офис', onChangeText: (val) => setOrderProp('door_number', val), placeholder: '№', value: order_info.door_number, },
		{ label: 'Подъезд', onChangeText: (val) => setOrderProp('home_number', val), placeholder: '№', value: order_info.home_number, },
		{ label: 'Домофон', onChangeText: (val) => setOrderProp('call_home_number', val), placeholder: '123', value: order_info.call_home_number, },
		{ label: 'Этаж', onChangeText: (val) => setOrderProp('level_number', val), placeholder: '№', value: order_info.level_number, },

		{ label: 'Комментарий', onChangeText: (val) => setOrderProp('comment', val), placeholder: 'Комментарий', value: order_info.comment, },
	]

	return (
		<View style={{ flex: 1 }} >
			<PayTitleHeader />
			<ScrollViewContainer style={{ paddingTop: 10 }} >
				<PayMapHeader />
				<KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={110} style={{ maxHeight: SIZE.height }}  >
					{/* DELIVERY BOX ORDER TYPE*/}
					{is_delivery && <>
						<View style={styles.inputRowBox} >
							<View style={{ flex: 1, paddingRight: 20 }} >
								<TextInputCustom {...input_props[0]} />
							</View>
							<View style={{ flex: 1 }} >
								<TextInputCustom {...input_props[1]} />
							</View>
						</View>
						<View style={styles.inputRowBox} >
							<View style={{ flex: 1, paddingRight: 20 }} >
								<TextInputCustom {...input_props[2]} />
							</View>
							<View style={{ flex: 1 }} >
								<TextInputCustom {...input_props[3]} />
							</View>
						</View>
					</>}
					{/* ALWAYS BOX ORDER TYPE */}
					<TextInputCustom {...input_props[4]} />
					{/* BTN PHONE CHANGE */}
					<PhoneChangeBtn />
					{/* PAY ORDER TIME SELECT */}
					{is_delivery &&
						<PayTimeSelect />}
					{/* PAY TYPE SELECT */}
					<PayTypeSelect />
					<TextLine center color={COLOR.RED} size={15} style={{ marginVertical: 10 }} >{error}</TextLine>
				</KeyboardAvoidingView>
				{/* PSEVDO */}
				<View style={{ height: SIZE.height * 0.2 }} />
			</ScrollViewContainer>
			{/* GO TO NEXT SCREEN BTN PORTAL*/}
			<PayNextBtn />
		</View>
	)
}

const styles = StyleSheet.create({
	inputRowBox: {
		flexDirection: 'row',
	},
})

export default PayInputScreen

