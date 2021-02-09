import { FontAwesome } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import DividerCustom from '../../components/DividerCustom'
import ImageHoc from '../../components/ImageHoc'
import PlusMinus from '../../components/PlusMinus'
import TextLine from '../../components/TextLine'
import layoutAnimation from '../../config/layoutAnimation'
import useMenu from '../../hook/state/useMenu'
import { NAV_TYPE, ProductType } from '../../type/types'
import { COLOR } from '../../vars/COLOR'
import { SCREEN_NAME } from '../../vars/SCREEN_NAME'
import SIZE from '../../vars/SIZE'

export const CART_ITEM_HEIGHT = SIZE.width * 0.3

const CartItem = (({ product }: { product: ProductType }) => {
	const { changeCount } = useMenu()
	const onPlus = () => changeCount(product).PLUS()
	const onMinus = () => changeCount(product).MINUS_CART()
	const isFocused = useIsFocused()
	const onDelete = () => {
		changeCount(product).REMOVE()
		layoutAnimation()
	}

	const navigation = useNavigation<NAV_TYPE>()
	const goToProductPage = () => {
		if (isFocused)
			navigation.push(SCREEN_NAME.PRODUCT_PAGE, { index: product.index })
	}

	return <View>
		<TouchableOpacity onPress={goToProductPage} style={stylesItem.container}>
			{/* LEFT IMG BOX */}
			<View style={stylesItem.imgBox}>
				<ImageHoc exist={product.img_exists} style={stylesItem.img} source={{ uri: product.img_url }} />
			</View>
			{/* CENTER TEXT BOX BTNS */}
			<View style={stylesItem.centerBox}>
				<View>
					<TextLine numberOfLines={2} size={18}>
						{product.name}
					</TextLine>
				</View>
				<View>
					<TextLine tint size={15} >
						{product.weight}
					</TextLine>
				</View>
				<View >
					<PlusMinus onPlus={onPlus} onMinus={onMinus} plus minus value={product.quantity} />
				</View>
			</View>
			{/* RIGHT PRICE BOX */}
			<View style={stylesItem.rightBox}>
				<TextLine size={19}>
					{product.price_formatted}
				</TextLine>
				<TouchableOpacity onPress={onDelete} style={stylesItem.dropBox} >
					<FontAwesome name="trash-o" size={26} color={COLOR.GRAY_DARK} />
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
		<DividerCustom style={{ marginVertical: 12 }} />
	</View >
})


const stylesItem = StyleSheet.create({
	imgBox: { justifyContent: 'center', width: CART_ITEM_HEIGHT },
	centerBox: { flex: 3, paddingLeft: 10, justifyContent: 'space-between' },
	rightBox: { flex: 1, alignItems: 'flex-end', justifyContent: 'space-between' },
	container: {
		flexDirection: 'row',
		height: CART_ITEM_HEIGHT,
	},
	img: {
		width: '100%',
		height: CART_ITEM_HEIGHT,
		borderRadius: 10,
	},
	dropBox: {
		width: 41,
		height: 41,
		marginLeft: 5,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: COLOR.GRAY_LIGHT
	}
})

export default React.memo(CartItem, (prev, next) => {
	return prev.product.quantity === next.product.quantity
})