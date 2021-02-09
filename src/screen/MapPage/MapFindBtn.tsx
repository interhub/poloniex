import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import getShadow from '../../config/getShadow'
import { COLOR } from '../../vars/COLOR'

const MapFindBtn = ({ onPress }: { onPress: () => void }) => {
	return (
		<View style={styles.container} >
			<TouchableOpacity onPress={onPress} style={styles.btn}>
				<MaterialIcons name="my-location" size={24} color={COLOR.BLACK_LIGHT} />
			</TouchableOpacity>
		</View>
	)
}
const BTN_SIZE = 45

const styles = StyleSheet.create({
	container: {
		borderRadius: BTN_SIZE / 2,
		backgroundColor: COLOR.WHITE,
		position: 'absolute',
		bottom: '18%',
		right: '9%',
		zIndex: 2000,
		...getShadow(3)
	},
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: BTN_SIZE,
		height: BTN_SIZE,
	}
})

export default MapFindBtn

