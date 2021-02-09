import React, { useEffect, useRef } from 'react'
import { Animated, Easing, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import ButtonToggle from '../../components/ButtonToggle'
import DividerCustom from '../../components/DividerCustom'
import TextLine from '../../components/TextLine'
import useOrder from '../../hook/state/useOrder'
import useSafeSize from '../../hook/layout/useSafeSize'
import { useSelectorMemoHook, useSelectorStringHook } from '../../hook/state/useSelectorStateHook'
import selector from '../../selector/selector'
import locationTool from '../../tool/locationTool'
import openInBrowser from '../../tool/openInBrowser'
import { COLOR } from '../../vars/COLOR'
import { MAX_DELIVERY_PRICE, MIN_FREE_TOTAL } from '../../vars/DELIVERY_PRICES'
import { LINKS } from '../../vars/LINKS'
import CartTitle from './CartTitle'

const CartFooter = () => {

	const { order_info: { is_delivery, delivery_price, exist_delivery }, setOrderProp } = useOrder()

	useUpdateLocationIf()
	useUpdateDeliveryPrice()

	const { bottom } = useSafeSize()

	const setDelivery = (state: boolean) => {
		setOrderProp('is_delivery', state)
	}

	const { boardStyle } = useDeliveryPriceBoardAnimation()

	return (
		<>
			{exist_delivery && (
				<View>
					{/* SHOW ORDER DELIVERY PRICE */}
					<Animated.View style={[boardStyle, { overflow: 'hidden' }]}>
						<View style={[styles.row, { paddingVertical: 5 }]}>
							<CartTitle>Доставка</CartTitle>
							<CartTitle>{`${delivery_price} ₽`}</CartTitle>
						</View>
						<DividerCustom style={{ marginVertical: 5 }} />
					</Animated.View>
					{/* DELIVERY SELECT BOX */}
					<View>
						<CartTitle>Получение</CartTitle>
						<View style={[styles.row, { marginTop: 2 }]}>
							<ButtonToggle active={is_delivery} onPress={() => setDelivery(true)} style={{ flex: 1, marginRight: 7 }}>
								Доставка
							</ButtonToggle>
							<ButtonToggle active={!is_delivery} onPress={() => setDelivery(false)} style={{ flex: 1 }}>
								Самовывоз
							</ButtonToggle>
						</View>
					</View>
				</View>
			)}
			<DeliveryInfoLink />
			<View style={{ height: 120 + bottom }} />
		</>
	)
}

/** 
update user location hook if address not exist for display actual delivery info (for first installation app without mount location state in profile)
*/
const useUpdateLocationIf = () => {
	const { address } = useSelectorStringHook('address')
	useEffect(() => {
		if (!address) locationTool.findMe()
	}, [])
}

const useUpdateDeliveryPrice = () => {
	const total = useSelectorMemoHook(selector.total)
	const { setOrderProp, order_info: { is_delivery } } = useOrder()
	const isFreeTotal = () => total >= MIN_FREE_TOTAL
	const setDeliveryTotal = (delivery_price: number) => setOrderProp('delivery_price', delivery_price)
	useEffect(() => {
		if (isFreeTotal() || !is_delivery) setDeliveryTotal(0)
		else setDeliveryTotal(MAX_DELIVERY_PRICE)
	}, [total, is_delivery])
}

const useDeliveryPriceBoardAnimation = () => {
	const {
		order_info: { is_delivery },
	} = useOrder()

	const size_state = {
		show: 70,
		hide: 0,
	}
	const current_state = is_delivery ? size_state.show : size_state.hide
	const height = useRef(new Animated.Value(current_state)).current
	useEffect(() => {
		Animated.timing(height, { toValue: current_state, duration: 300, useNativeDriver: false, easing: Easing.cubic }).start()
	}, [is_delivery])

	const boardStyle = {
		height,
	}
	return { boardStyle }
}

const DeliveryInfoLink = () => {
	const {
		order_info: { is_delivery },
	} = useOrder()

	const goToDeliveryInfo = () => openInBrowser(LINKS.DELIVERY_INFO)

	return (
		<View style={{ height: 60, justifyContent: 'center' }}>
			{is_delivery && (
				<TouchableOpacity onPress={goToDeliveryInfo}>
					<TextLine color={COLOR.GRAY} style={{ textDecorationLine: 'underline' }} size={16} center>
						Условия доставки
					</TextLine>
				</TouchableOpacity>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
})

export default CartFooter
