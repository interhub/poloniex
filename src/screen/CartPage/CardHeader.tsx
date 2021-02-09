import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { HeaderBackIcons } from '../../components/BackIcon'
import TextLine from '../../components/TextLine'
import layoutAnimation from '../../config/layoutAnimation'
import useMenu from '../../hook/state/useMenu'
import useSafeSize from '../../hook/layout/useSafeSize'


const CartHeader = () => {
	const { goBack } = useNavigation()
	const { cartClear } = useMenu()

	const onClear = () => {
		layoutAnimation()
		cartClear()
	}
	const { top } = useSafeSize()

	return <View style={[headerStyles.cartHeaderBox, { paddingTop: top }]} >
		<TouchableOpacity onPress={goBack} style={headerStyles.leftBox}  >
			<HeaderBackIcons title={'Выбрать ещё'} />
		</TouchableOpacity>
		<TouchableOpacity onPress={onClear} style={headerStyles.rightBox} >
			<TextLine>
				Очистить
			</TextLine>
		</TouchableOpacity>
	</View>
}



const headerStyles = StyleSheet.create({
	cartHeaderBox: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	leftBox: {
		flex: 2,
		marginLeft: -15
	},

	rightBox: {
		flex: 1,
		alignItems: 'flex-end'
	}
})


export default CartHeader