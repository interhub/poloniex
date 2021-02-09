import React from 'react'
import { ViewStyle } from 'react-native'
import { Divider } from 'react-native-paper'


const DividerCustom = ({ style }: { style?: ViewStyle }) => {
	return (
		<Divider accessibilityComponentType accessibilityTraits style={[style]} />
	)
}


export default DividerCustom

