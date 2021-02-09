import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Portal } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useOrder from '../hook/state/useOrder'
import { useSelectorMemoHook } from '../hook/state/useSelectorStateHook'
import selector from '../selector/selector'
import { NAV_TYPE } from '../type/types'
import { COLOR } from '../vars/COLOR'
import { SCREEN_NAME } from '../vars/SCREEN_NAME'
import ButtonCustom from './ButtonCustom'
import TextLine from './TextLine'


const PortalModal = ({ visible = true, children = null }: { visible?: boolean, children?: any }) => {
	const pos_state = { show: 0, hide: 200 }
	const { bottom } = useSafeAreaInsets()
	const translateY = useRef(new Animated.Value(pos_state.hide)).current
	const navigation = useNavigation()
	const animStyle = {
		transform: [{ translateY }],
		opacity: translateY.interpolate({ inputRange: [pos_state.show, pos_state.hide], outputRange: [1, 0] })
	}

	const duration = 300

	const hide = () => {
		Animated.timing(translateY, { toValue: pos_state.hide, duration, useNativeDriver: true, }).start()
	}

	useEffect(() => {
		Animated.timing(translateY, { toValue: visible ? pos_state.show : pos_state.hide, duration, useNativeDriver: true, delay: 400 }).start()
	}, [visible])

	useEffect(() => {
		const unsubscribe = navigation.addListener('beforeRemove', hide)
		return () => {
			unsubscribe()
			hide()
		}
	}, [])

	return <Portal>
		<Animated.View style={[stylesPortal.portalBox, { paddingBottom: bottom | 20, }, animStyle]} >
			{children}
		</Animated.View>
	</Portal>
}



export const PortalModalTotal = () => {
	const { navigate } = useNavigation<NAV_TYPE>()
	const total = useSelectorMemoHook(selector.total)

	const { total_with_delivery, order_info: { exist_delivery } } = useOrder()

	const goToCart = () => navigate(SCREEN_NAME.PAY)

	return <PortalModal >
		<View style={stylesPortal.totalBox} >
			<View style={{ flex: 2 }} >
				<TextLine bold size={16} color={COLOR.WHITE} >Общая сумма</TextLine>
				<TextLine bold size={26} color={COLOR.WHITE} >{total_with_delivery} ₽</TextLine>
			</View>
			<View style={{ flex: 3 }} >
				{exist_delivery && <ButtonCustom disabled={!total} onPress={goToCart} >
					Оформить заказ
				</ButtonCustom>}
				{!exist_delivery && <TextLine style={{ textAlign: 'right' }} size={14} color={COLOR.WHITE} >
					{'Доставка в ваш город не осуществляется\nУкажите город в профиле'}
				</TextLine>}
			</View>
		</View>
	</PortalModal>
}

type PortalModalButtonProps = React.ComponentPropsWithoutRef<typeof ButtonCustom>

export const PortalModalButton = (props: PortalModalButtonProps) => {
	return <PortalModal>
		<ButtonCustom {...props} />
	</PortalModal >
}


const stylesPortal = StyleSheet.create({
	portalBox: {
		marginTop: 'auto',
		width: '100%',
		zIndex: 1000,
		backgroundColor: COLOR.BLACK_LIGHT,
		borderTopLeftRadius: 15,
		borderTopEndRadius: 15,
		padding: 20
	},
	totalBox: {
		alignItems: 'center',
		flexDirection: 'row',
	},
})
