import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MenuPresentHeader } from '../../../components/HeadersBlack'
import MenuTabList from './MenuTabList'

const MenuTab = () => {
	return (
		<View style={styles.container}>
			<MenuPresentHeader />
			<MenuTabList />
		</View>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
})

export default React.memo(MenuTab)
