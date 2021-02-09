import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import ImageHoc from '../../../components/ImageHoc'
import Message from '../../../components/Message'
import PlusMinus from '../../../components/PlusMinus'
import TextLine from '../../../components/TextLine'
import getShadow from '../../../config/getShadow'
import useMenu from '../../../hook/state/useMenu'
import { useSelectorStringHook } from '../../../hook/state/useSelectorStateHook'
import { NAV_TYPE, ProductType } from '../../../type/types'
import { COLOR } from '../../../vars/COLOR'
import { SCREEN_NAME } from '../../../vars/SCREEN_NAME'
import { MENU_SIZE } from './MenuSizes'

const MENU_ITEM_HEIGHT = MENU_SIZE.MENU_ITEM_HEIGHT
const RADIUS = 10

const MenuItem = ({ product }: { product: ProductType }) => {
	const navigation = useNavigation<NAV_TYPE>()
	const { changeCount } = useMenu()
	const { token } = useSelectorStringHook('token')
	const IS_AUTH = !!token

	const onPlus = () => changeCount(product).PLUS()
	const onMinus = () => changeCount(product).MINUS_HARD()

	//ANIMATE STYLE CONFIG
	const { opacity } = useShadowOpacity(product.quantity)

	const goToProductPage = () => {
		if (IS_AUTH) navigation.navigate(SCREEN_NAME.PRODUCT_PAGE, { index: product.index })
		else {
			Message('Для оформления заказа требуется авторизоваться')
		}
	}

	return (
		<TouchableOpacity activeOpacity={0.8} onPress={goToProductPage} style={[stylesMenuItem.container]}>
			{/* TEXT CONTENT */}
			<View style={stylesMenuItem.textBox}>
				<TextLine color={COLOR.GRAY} size={15}>
					{product.category}
				</TextLine>
				<TextLine numberOfLines={2} size={17}>{product.name}</TextLine>
				<TextLine tint size={13}>
					{product.weight}
				</TextLine>
				<TextLine size={15}>{product.price_formatted}</TextLine>
				{IS_AUTH && (
					<View style={{ marginLeft: -4 }}>
						<PlusMinus plus minus onMinus={onMinus} onPlus={onPlus} value={product.quantity} />
					</View>
				)}
			</View>
			{/* IMAGE CONTENT */}
			<View style={{ flex: 1 }}>
				<LinearGradient
					start={{ x: 0, y: 0.5 }}
					end={{ x: 0.2, y: 0.5 }}
					style={{ flex: 4, position: 'absolute', zIndex: 2, top: 0, left: 0, width: '100%', height: '100%' }}
					colors={[COLOR.WHITE, COLOR.NONE]}></LinearGradient>
				<ImageHoc exist={product.img_exists} style={stylesMenuItem.img} source={{ uri: product.img_url }} />
			</View>
			{/* OUTLINE BOX */}
			<Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, stylesMenuItem.outline, { opacity }]} />
		</TouchableOpacity>
	)
}

const useShadowOpacity = (count: number) => {
	const op_states = { show: 1, hide: 0 }
	const ACTIVE = count > 0
	const initial_opacity = ACTIVE ? op_states.show : op_states.hide
	const opacity = useRef(new Animated.Value(initial_opacity)).current
	useEffect(() => {
		Animated.timing(opacity, { toValue: ACTIVE ? op_states.show : op_states.hide, useNativeDriver: true }).start()
	}, [count])
	return { opacity }
}

const MARGIN_VERTICAL = 20
const stylesMenuItem = StyleSheet.create({
	container: {
		marginBottom: MARGIN_VERTICAL,
		marginHorizontal: 20,
		borderRadius: 10,
		height: MENU_ITEM_HEIGHT - MARGIN_VERTICAL,
		backgroundColor: COLOR.WHITE,
		flexDirection: 'row',
		borderColor: COLOR.YELLOW,
		...getShadow(1),
	},
	img: {
		width: '100%',
		height: '100%',
		flex: 4,
		zIndex: 1,
		borderTopRightRadius: RADIUS,
		borderBottomRightRadius: RADIUS,
	},
	outline: {
		zIndex: 2,
		borderRadius: RADIUS,
		borderColor: COLOR.YELLOW,
		borderWidth: 2,
	},
	textBox: { flex: 1, justifyContent: 'space-around', paddingVertical: 5, zIndex: 3, paddingLeft: 10 },
})

export default React.memo(MenuItem, (prev, next) => {
	return prev.product.quantity === next.product.quantity
})
