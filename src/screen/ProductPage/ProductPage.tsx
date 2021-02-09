import { useRoute } from '@react-navigation/native'
import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { HeaderBackIcons } from '../../components/BackIcon'
import ButtonToggle from '../../components/ButtonToggle'
import ImageHoc from '../../components/ImageHoc'
import PlusMinus from '../../components/PlusMinus'
import { MenuPresentHeader } from '../../components/HeadersBlack'
import TextLine from '../../components/TextLine'
import getShadow from '../../config/getShadow'
import useMenu from '../../hook/state/useMenu'
import { useProductIndex, useSelectorStringHook } from '../../hook/state/useSelectorStateHook'
import { ROUTE_TYPE } from '../../type/types'
import { COLOR } from '../../vars/COLOR'
import SIZE from '../../vars/SIZE'
import BottomRecoms from './BottomRecoms'
import { SCREEN_NAME } from '../../vars/SCREEN_NAME'
import useAnimateImageZoom from '../../hook/layout/useAnimateImageZoom'

const ProductPage = () => {
	const { changeCount } = useMenu()
	const { params: { index } } = useRoute<ROUTE_TYPE<SCREEN_NAME.PRODUCT_PAGE>>()

	if (!Number.isInteger(index)) return null //CHECK FOR EXIST (0!, 1, 2, index product)

	useSelectorStringHook('menu') //ADD FOR REACTIVE UPDATING
	const product = useProductIndex(index)
	const onPlus = () => changeCount(product).PLUS()
	const onMinus = () => changeCount(product).MINUS_HARD()
	const imageStyle = useAnimateImageZoom()


	return (
		<View style={[styles.container]}>
			{/* PRODUCT TITLE CART HEADER */}
			<MenuPresentHeader />
			<ScrollView>
				{/* CONTENT WHITE BOX */}
				<View style={styles.whiteBox}>
					{/* BACK ICON */}
					<View style={styles.backBox}>
						<HeaderBackIcons title={'Выбрать ещё'} />
					</View>
					{/* TEXT NAMES BOX */}
					<View style={styles.textBox}>
						<TextLine size={22} tint color={COLOR.GRAY}>
							{product.category}
						</TextLine>
						<TextLine size={28} bold style={{ marginVertical: 10 }}>
							{product.name}
						</TextLine>
						<TextLine size={20} tint>
							{product.weight}
						</TextLine>
						<TextLine size={16} tint color={COLOR.GRAY_DARK} style={{ marginVertical: 10 }}>
							{product.description}
						</TextLine>
					</View>
					{/* IMAGE BOX */}
					<View style={styles.imgBox}>
						<Animated.Image style={[styles.img, imageStyle]} source={{ uri: product.img_url }} />
					</View>
					{/* ADD BTN BOX */}
					<View style={styles.addBtnBox}>
						{product.quantity == 0 ? <View /> :
							<PlusMinus size={60} plus minus onPlus={onPlus} onMinus={onMinus}
								value={product.quantity} price={product.price_formatted} />}
						<ButtonToggle active onPress={onPlus}>
							{`Добавить ${product.price_formatted}`}
						</ButtonToggle>
					</View>
					{/* RECOMENDS BLOCK */}
					<BottomRecoms recoms={product.related_products} />
				</View>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLOR.GRAY_LIGHT,
	},
	whiteBox: {
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25,
		borderRadius: 25,
		backgroundColor: '#FFFFFF',
		flex: 1,
		marginBottom: 120,
		minHeight: SIZE.height * 0.7,
		marginTop: 20,
		...getShadow(1)
	},
	backBox: {
		paddingTop: 10,
	},
	textBox: {
		padding: 20
	},
	imgBox: {
		height: SIZE.width * 0.65,
		overflow: 'hidden',
		borderRadius: 12,
	},
	img: {
		width: '100%',
		height: '100%',
	},
	addBtnBox: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
})

export default ProductPage
