import React, { useEffect, useRef } from 'react'
import { Animated, Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TextLine from '../../components/TextLine'
import getShadow from '../../config/getShadow'
import { COLOR } from '../../vars/COLOR'
import SIZE from '../../vars/SIZE'


interface CodeInputProps {
    value: string
    onChange: (val: string) => void
    error: string
}

const CodeInputAnimateHook = (error = '') => {
	const pos_state = { show: 1, hide: 0 }
	const opacity = useRef(new Animated.Value(pos_state.hide)).current
	useEffect(() => {
		Animated.spring(opacity, { toValue: error ? pos_state.show : pos_state.hide, useNativeDriver: false }).start()
	}, [error])

	const errorStyle = {
		opacity,
		transform: [{ translateX: opacity.interpolate({ inputRange: [0, 1], outputRange: [5, 0] }) }]
	}
	return { errorStyle }
}

const CodeInput = ({ error, onChange, value }: CodeInputProps) => {
	//LOGIC CHANGE VALUE CONFIG
	const MAX_LEN = 5
	const inputRef = useRef<TextInput | null>(null)
	const setFocus = () => inputRef.current?.focus()
	const setBlur = () => inputRef.current?.blur()
	useEffect(() => {
		if (value?.length === MAX_LEN) {
			Keyboard.dismiss()
			setBlur()
		}
	}, [value])
	useEffect(() => {
		const subs = Keyboard.addListener('keyboardDidHide', setBlur)
		return () => { subs.remove() }
	}, [])

	//ANIMATION CONFIG
	const { errorStyle } = CodeInputAnimateHook(error)

	return (
		<>
			<TextInput returnKeyType={'go'} ref={inputRef} style={styles.hide} onChangeText={onChange} autoFocus keyboardType={'number-pad'} maxLength={MAX_LEN} />
			<TouchableOpacity activeOpacity={0.8} onPress={setFocus} style={styles.container}>
				{new Array(MAX_LEN).fill(1).map((_, key) => {
					const VAL = value[key] || '_'
					const color = error ? COLOR.RED : VAL !== '_' ? COLOR.BLACK_LIGHT : COLOR.GRAY
					return <View key={key} style={styles.itemBox} >
						<TextLine color={color} size={30} >
							{VAL}
						</TextLine>
					</View>
				})}
			</TouchableOpacity>
			<Animated.View style={[{ padding: 5 }, errorStyle]} >
				<TextLine size={15} color={COLOR.RED} style={{ margin: 5 }} center>{error}</TextLine>
			</Animated.View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	hide: {
		position: 'absolute',
		opacity: 0,
		top: -SIZE.height
		// display: 'none'
	},
	itemBox: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 8,
		margin: '1.5%',
		backgroundColor: COLOR.GRAY_LIGHT,
		width: SIZE.width * 0.1,
		borderRadius: 5,
		...getShadow(1),
	}
})


export default CodeInput

