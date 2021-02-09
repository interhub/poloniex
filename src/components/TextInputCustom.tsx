import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { TextInputMask } from 'react-native-masked-text'
import { FONT_NAME } from '../font/FONT_NAME'
import { COLOR } from '../vars/COLOR'
import IS_IOS from '../vars/IS_IOS'
import TextLine from './TextLine'


const INPUT_HEIGHT = 30

export interface TextInputCustomProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
	label?: string,
	placeholder?: string,
	mask?: string,
}


const TextInputCustom = ({ label = '', mask = '', placeholder = '', ...props }: TextInputCustomProps) => {

	const input_props = {
		maxLength: mask ? mask.length : 500,
		style: styles.input,
		...props
	}

	return (
		<View style={[styles.container]}>
			{/* BLOCK LABEL */}
			<Animated.View pointerEvents={'none'} style={[{ position: 'absolute', bottom: 0, left: 5, transform: [{ translateY: -30 }] }]} >
				<TextLine color={COLOR.BLACK_LIGHT} size={18} >
					{label}
				</TextLine>
			</Animated.View>

			{/* BLOCK LABEL */}
			<Animated.View pointerEvents={'none'} style={[{ position: 'absolute', bottom: 0, left: 5, transform: [{ translateY: IS_IOS ? -5 : -8 }] }]} >
				{props.value === '' &&
					<TextLine tint color={COLOR.GRAY} size={16} >
						{placeholder}
					</TextLine>
				}
			</Animated.View>

			{/* BLOCK INPUT */}
			<View style={styles.inputBox}>
				{!mask && <TextInput {...input_props} />}
				{!!mask && <TextInputMask
					{...input_props}
					type={'cel-phone'}
					options={{
						maskType: 'BRL',
						withDDD: true,
						dddMask: mask
					}}
				/>}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		borderBottomColor: COLOR.GRAY,
		borderBottomWidth: 1,
		paddingBottom: 5,
		height: 2 * INPUT_HEIGHT,
	},
	inputBox: {
		position: 'absolute',
		width: '100%',
		bottom: 5,
	},
	input: {
		fontFamily: FONT_NAME.TINT,
		fontSize: 16,
		padding: 0,
		paddingLeft: 5,
		bottom: 0,
		color: COLOR.BLACK_LIGHT
	}
})

// export default React.memo(TextInputCustom, (prev, next) => {
//     return prev.value?.toString() === next.value?.toString()
// })

export default TextInputCustom