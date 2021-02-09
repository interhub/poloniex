import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import getShadow from '../config/getShadow'
import { useSelectorStringHook } from '../hook/state/useSelectorStateHook'
import MapFill from '../screen/MapPage/MapFill'
import { NAV_TYPE } from '../type/types'
import { COLOR } from '../vars/COLOR'
import { SCREEN_NAME } from '../vars/SCREEN_NAME'
import TextLine from './TextLine'

const MAP_BOX_HEIGHT = 210
const RADIUS = 15

const MapBoxSmall = () => {
	const { address } = useSelectorStringHook('address')
	const { navigate } = useNavigation<NAV_TYPE>()
	const goToMapPage = () => {
		navigate(SCREEN_NAME.MAP_PAGE)
	}

	return (
		// SHADOW BOX
		<View style={styles.container}>
			{/* CONTENT BOX */}
			<View style={styles.content} >
				{/* MAP BOX */}
				<View style={{ flex: 2 }} >
					<MapFill />
				</View>
				{/* ADDRESS BOX */}
				<TouchableOpacity onPress={goToMapPage} style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }} >
					<View style={{ flex: 1, paddingLeft: 20 }} >
						<TextLine size={13} center>
							{address?.trim() || 'Место доставки'}
						</TextLine>
					</View>
					<View style={{ width: 30 }} >
						<MaterialIcons name="navigate-next" size={24} color="black" />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		height: MAP_BOX_HEIGHT,
		borderRadius: RADIUS,
		backgroundColor: COLOR.WHITE,
		...getShadow(1)
	},
	content: {
		borderRadius: RADIUS,
		overflow: 'hidden',
		flex: 1,

	}
})

export default React.memo(MapBoxSmall)
