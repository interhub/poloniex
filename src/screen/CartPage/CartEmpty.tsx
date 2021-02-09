import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MyIcon from '../../components/MyIcon'
import TextLine from '../../components/TextLine'

const CartEmpty = () => {
	return (
		<View style={styles.container}>
			<MyIcon size={100} source={require('../../img/icon/cart_empty.png')} />
			<TextLine bold size={22} style={{ marginVertical: 20 }} >
                В корзине пока пусто
			</TextLine>
			<TextLine center tint size={16}  >
				{'Добавленные товары будут\nотображаться тут'}
			</TextLine>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20
	},
})

export default CartEmpty

