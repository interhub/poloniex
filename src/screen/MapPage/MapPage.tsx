import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapFill from './MapFill'
import MapPageHeader from './MapPageHeader'


const MapPage = () => {

	return (
		<View style={styles.container}>
			<MapPageHeader />
			<MapFill />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default MapPage

