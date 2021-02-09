import React from 'react'
import { Image, ImageBackground, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import layoutAnimation from '../config/layoutAnimation'
import useSafeSize from '../hook/layout/useSafeSize'
import useMenu from '../hook/state/useMenu'
import APP_NAME from '../vars/APP_NAME'
import { COLOR } from '../vars/COLOR'
import SIZE from '../vars/SIZE'
import { HeaderBackIcons } from './BackIcon'
import CartIconBox from './CartIconBox'
import TextLine from './TextLine'

interface BlackHeaderBackgroundProps {
	left?: React.ReactNode
	center?: React.ReactNode
	right?: React.ReactNode
}

const BlackHeaderBackground = ({ left = null, center = null, right = null }: BlackHeaderBackgroundProps) => {
	const { top } = useSafeSize()

	return <ImageBackground fadeDuration={1000} source={require('../img/bg/header_bg.png')} style={[styles.container, { paddingTop: top + 10 }]}>
		<View style={{ flex: 1 }} >
			{left}
		</View>
		<View style={{ flex: 1 }} >
			{center}
		</View>
		<View style={{ flex: 1, alignItems: 'flex-end' }} >
			{right}
		</View>
	</ImageBackground>
}

const LeftLogoTitle = () => {
	return <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
		<Image style={{ height: '100%', flex: 1, marginRight: 5 }} resizeMode={'contain'} source={require('../../assets/icon.png')} />
		<TextLine bold color={COLOR.WHITE} >{APP_NAME}</TextLine>
	</View>
}

const ClearCartButton = () => {
	const { cartClear } = useMenu()

	const onClear = () => {
		layoutAnimation()
		cartClear()
	}
	return <TouchableOpacity onPress={onClear} style={styles.row} >
		<TextLine color={COLOR.WHITE} >
			Очистить
		</TextLine>
	</TouchableOpacity>
}

export const MenuPresentHeader = () => {
	return (
		<BlackHeaderBackground
			left={<LeftLogoTitle />}
			right={<CartIconBox color={COLOR.WHITE} />}
		/>
	)
}

export const CartHeader = () => {
	return <BlackHeaderBackground
		left={<HeaderBackIcons color={COLOR.WHITE} title={'Выбрать ещё'} />}
		right={<ClearCartButton />}
	/>
}

export const TabTitleHeader = ({ title }: { title: string }) => {
	return <BlackHeaderBackground
		center={<TextLine center bold color={COLOR.WHITE}>{title}</TextLine>}
		right={<CartIconBox color={COLOR.WHITE} />}
	/>
}


export const PayTitleHeader = () => {
	const DIFF = SIZE.width * 0.08
	return <BlackHeaderBackground
		center={<TextLine size={16} color={COLOR.WHITE} style={{ width: SIZE.width, marginLeft: -DIFF }} >{'Адрес получения и оплата'}</TextLine>}
		left={<HeaderBackIcons color={COLOR.WHITE} />}
	/>
}

export const PayBackHeader = ({ title = '' }: { title?: string }) => {
	return <BlackHeaderBackground
		left={<HeaderBackIcons color={COLOR.WHITE} title={title} />}
	/>
}


const styles = StyleSheet.create({
	container: {
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLOR.BLACK_LIGHT,
		height: 100,
		width: SIZE.width
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	}
})

