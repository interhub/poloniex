import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { shallowEqual } from 'react-redux'
import { COLOR } from '../vars/COLOR'
import TextLine from './TextLine'

const BTN_HEIGHT = 55

export interface ButtonToggleProps extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
	active?: boolean,
	children: JSX.Element | string,
	margin?: number
	center?: boolean
	textProp?: { center?: boolean, color?: string, tint?: boolean, size?: number },
	right?: JSX.Element
}

const ButtonToggle = ({ active = false, children, margin = 5, textProp, right, ...props }: ButtonToggleProps) => {
	const backgroundColor = active ? COLOR.YELLOW : COLOR.GRAY_LIGHT
	return <TouchableOpacity {...props} style={[{ backgroundColor, margin, justifyContent: right ? 'space-between' : 'center' }, styles.btn, props.style]} onPress={props.onPress} >
		<TextLine center={props.center} size={18} {...textProp} >
			{children}
		</TextLine>
		{right}
	</TouchableOpacity>
}

const styles = StyleSheet.create({
	btn: {
		alignItems: 'center',
		padding: 10,
		borderRadius: 8,
		height: BTN_HEIGHT,
		flexDirection: 'row'
	},
})

export default React.memo(ButtonToggle, shallowEqual)

