import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Badge } from 'react-native-paper'
import { useSelectorMemoHook } from '../hook/state/useSelectorStateHook'
import selector from '../selector/selector'
import { NAV_TYPE } from '../type/types'
import { COLOR } from '../vars/COLOR'
import { SCREEN_NAME } from '../vars/SCREEN_NAME'
import { ICON_SIZE } from '../vars/SIZE'
import MyIcon from './MyIcon'

const CartIconBox = ({ color = COLOR.GRAY }: { color?: string }) => {
	const { navigate } = useNavigation<NAV_TYPE>()
	const { menu_count } = useSelectorMemoHook(selector.menu_count)
	const goToCart = () => navigate(SCREEN_NAME.CART_PAGE)
	return (
		<TouchableOpacity onPress={goToCart} style={styles.container}>
			<MyIcon active={true} size={24} color={color} source={require('../img/icon/cart.png')} />
			<Badge visible={!!menu_count} style={styles.badge} >
				{menu_count}
			</Badge>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		width: ICON_SIZE * 1.5,
		height: ICON_SIZE * 1.5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	badge: {
		backgroundColor: COLOR.YELLOW,
		position: 'absolute',
		top: 3,
		right: -10,
		fontWeight: 'bold'
	}
})

export default CartIconBox

