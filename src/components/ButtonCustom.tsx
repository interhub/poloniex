import React from 'react'
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import useLoadingState from '../hook/state/useLoadingState'
import { COLOR } from '../vars/COLOR'
import TextLine, { TextLinePropsType } from './TextLine'

const BTN_SIZE = 55
interface ButtonCustomPropsType extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
	disabled?: boolean
	loading?: boolean
	icon?: () => JSX.Element
	onPress?: () => void
	textProps?: TextLinePropsType
	children: string
}


const ButtonCustom = (props: ButtonCustomPropsType) => {
	const { disabled, onPress, children, textProps = {} } = props
	const { loading } = useLoadingState()

	const onPressHandler = () => {
		if (!disabled && onPress) onPress()
	}

	return (
		<TouchableOpacity
			onPress={onPressHandler}
			style={[styles.btnBox, props.style]}
			{...props}>
			{!loading && <TextLine numberOfLines={1} {...textProps} >{children}</TextLine>}
			{loading && <ActivityIndicator color={COLOR.GREEN} />}
		</TouchableOpacity>)
}

const styles = StyleSheet.create({
	btnBox: {
		width: '100%',
		height: BTN_SIZE,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLOR.GREEN,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default React.memo(ButtonCustom)