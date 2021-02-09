import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import { HeaderBackIcons } from '../../components/BackIcon'
import ButtonToggle from '../../components/ButtonToggle'
import getShadow from '../../config/getShadow'
import useSafeSize from '../../hook/layout/useSafeSize'
import { useSelectorStringHook } from '../../hook/state/useSelectorStateHook'
import locationTool from '../../tool/locationTool'
import { COLOR } from '../../vars/COLOR'




const MapPageHeader = () => {
	const { top } = useSafeSize()

	return (
		<View style={[styles.container, { top }]}>
			<View style={{ flexDirection: 'row', alignItems: 'center', }} >
				<View >
					<HeaderBackIcons />
				</View>
				<View style={{ paddingHorizontal: 10 }} >
					<MapSearchLine />
				</View>
			</View>
			<MapAddressTopRow />
		</View>
	)
}


const MapAddressTopRow = () => {
	const { address } = useSelectorStringHook('address')
	const navigation = useNavigation()
	const [isDisplayAddress, setIsDisplayAddress] = useState(false)
	useEffect(() => {
		return () => {
			setIsDisplayAddress(true)
		}
	}, [address])

	const onPressAddress = () => {
		navigation.goBack()
	}

	if (!isDisplayAddress || !address?.trim()) return null
	return <View style={{ paddingHorizontal: 10 }} >
		<ButtonToggle onPress={onPressAddress} active textProp={{ size: 13 }} >
			{address}
		</ButtonToggle>
	</View>
}

const MapSearchLine = () => {
	const onInput = (text: string) => {
		locationTool.setLocationByString(text + ' ')
	}
	const { address, } = useSelectorStringHook('address')
	const defaultValue = useMemo(() => (address || ''), [])

	return <View style={styles.inputBox}>
		<FontAwesome name="search" size={24} color={COLOR.GRAY_DARK} />
		<TextInput selectTextOnFocus defaultValue={defaultValue} onChangeText={onInput} placeholder={'Введите адрес'} placeholderTextColor={COLOR.GRAY_DARK} style={styles.input} maxLength={100} textContentType={'fullStreetAddress'} />
	</View>
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 10,
		alignSelf: 'center',
		position: 'absolute',
		width: '100%',
		zIndex: 1000,
		backgroundColor: '#FFF',
		borderRadius: 20,
		...getShadow(3)
	},
	inputBox: {
		backgroundColor: COLOR.GRAY_LIGHT,
		flex: 1,
		height: 45,
		borderRadius: 10,
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 15
	},
	input: {
		paddingLeft: 10,
		fontSize: 16,
		color: COLOR.GRAY_DARK,
		width: '80%',
		height: 45
	}
})

export default MapPageHeader

