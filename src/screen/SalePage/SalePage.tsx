import { useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import WebView from 'react-native-webview'
import { HeaderBackIcons } from '../../components/BackIcon'
import CartIconBox from '../../components/CartIconBox'
import TextLine from '../../components/TextLine'
import useAnimateImageZoom from '../../hook/layout/useAnimateImageZoom'
import { ROUTE_TYPE } from '../../type/types'
import { COLOR } from '../../vars/COLOR'
import { SCREEN_NAME } from '../../vars/SCREEN_NAME'
import SIZE from '../../vars/SIZE'

const IMAGE_HEIGHT = SIZE.height / 3

const SalePage = () => {
	const { params: { sale } } = useRoute<ROUTE_TYPE<SCREEN_NAME.SALE_PAGE>>()
	if (!sale) return null

	const imageStyle = useAnimateImageZoom()

	return (
		<View style={styles.container}>
			<SaleHeader />
			<View style={styles.imgBox} >
				<Animated.Image source={{ uri: sale.image }} style={[styles.img, imageStyle]} />
			</View>
			<View style={{ flex: 1, paddingHorizontal: 20 }} >
				<TextLine size={22} bold style={{ marginVertical: 20 }} >
					{sale.title}
				</TextLine>
				<WebView
					source={{
						html: `
                <html>
                <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                </head>
                <body>
                ${sale.content}
                </body>
                </html>` }}
					style={{ width: '100%', height: '100%' }} />
				{/* <TextLine size={18} tint >
                    {sale.content}
                </TextLine> */}
			</View>
		</View>
	)
}

const SaleHeader = () => {
	return <>
		<StatusBar translucent={true} animated backgroundColor={COLOR.BLACK_LIGHT + '00'} style={'light'} />
		<LinearGradient
			style={styles.saleHeader}
			colors={['rgba(0,0,0,0.8)', 'transparent']}>
			<HeaderBackIcons color={COLOR.GRAY} />
			<CartIconBox />
		</LinearGradient >
	</>
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	saleHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		paddingTop: 50,
		position: 'absolute',
		top: 0,
		width: '100%',
		zIndex: 10,
		maxHeight: 200,
	},
	img: {
		width: '100%',
		height: IMAGE_HEIGHT,
		zIndex: 1,
		top: 0,
	},
	imgBox: {
		height: IMAGE_HEIGHT,
		overflow: 'hidden'
	}
})

export default SalePage

