import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { COLOR } from '../vars/COLOR'


const DividerCustom = ({ style }: { style?: ViewStyle }) => {
	return <View style={[styles.line, style]} />
}

const styles = StyleSheet.create({
	line: {
		height: 0.5,
		backgroundColor: COLOR.GRAY_LIGHT,
		width: '100%'
	}
})


export default DividerCustom

