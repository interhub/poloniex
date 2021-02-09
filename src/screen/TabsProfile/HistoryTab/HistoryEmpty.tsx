import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MyIcon from '../../../components/MyIcon'
import TextLine from '../../../components/TextLine'

const HistoryEmpty = () => {
	return (
		<View style={styles.container}>
			<MyIcon size={120} source={require('../../../img/icon/history_empty.png')} />
			<TextLine center bold size={22} style={{ marginVertical: 20 }} >
				{'Вы не сделали ни\nодного заказа'}
			</TextLine>
			<TextLine center tint size={16}  >
				{'Выберите из меню ваши любимые блюда \n и мы доставим в удобное вам время'}
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

export default HistoryEmpty

