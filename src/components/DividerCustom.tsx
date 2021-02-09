import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'
import { COLOR } from '../vars/COLOR'


const DividerCustom = ({ style }: { style?: ViewStyle }) => {
	return <View style={[styles.line, style]} />
}

const styles = StyleSheet.create({
	line: {
		height: 1,
		backgroundColor: COLOR.GRAY,
		width: '100%'
	}
})


export default DividerCustom

