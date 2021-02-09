import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLOR } from '../vars/COLOR'
import ButtonCustom from './ButtonCustom'
import ButtonToggle from './ButtonToggle'
import TextLine from './TextLine'
interface PlusMinusProps {
	plus?: boolean
	minus?: boolean
	onPlus?: () => void
	onMinus?: () => void
	value?: number
	size?: number
	price?: string
}

const BTN_HEIGHT = 40

//PLUS MINUS BTN COMPONENT (NEED BOOLEAN INFO FOR PROPS @minus @plus)
const PlusMinus = ({ minus, plus, onMinus, onPlus, value = 0, size = 0, price = '' }: PlusMinusProps) => {
	const icon_props = {
		size: 24,
		color: COLOR.BLACK_LIGHT
	}
	const btn_props = {
		color: COLOR.GRAY_LIGHT,
		style: { height: BTN_HEIGHT, elevation: 0 }
	}

	const EMPTY = value === 0
	return (
		<View style={[styles.cont]} >
			{minus && !EMPTY &&
				<View style={styles.itemBox} >
					<ButtonCustom {...btn_props} onPress={onMinus} >
						<AntDesign name="minus" {...icon_props} />
					</ButtonCustom>
				</View>}
			{plus && !EMPTY &&
				<View style={styles.itemBox}>
					<ButtonCustom {...btn_props} onPress={onPlus} >
						<AntDesign name="plus" {...icon_props} />
					</ButtonCustom>
				</View>}
			{EMPTY &&
				<ButtonToggle center onPress={onPlus} active margin={0} style={{ height: size || BTN_HEIGHT }} testID="add" >
					{`Добавить ${price}`}
				</ButtonToggle>}
			{!EMPTY &&
				<View style={styles.textBox} >
					<TextLine style={{ marginLeft: 5 }}>
						{`${value} шт`}
					</TextLine>
				</View>}
		</View>
	)
}

const styles = StyleSheet.create({
	cont: {
		flexDirection: 'row',
	},
	itemBox: {
		marginRight: 8
	},
	textBox: {
		justifyContent: 'center'
	}
})

export default React.memo(PlusMinus, (prev, next) => {
	return prev.value === next.value
})

