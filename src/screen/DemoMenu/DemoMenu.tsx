import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PayBackHeader } from '../../components/HeadersBlack'
import { COLOR } from '../../vars/COLOR'
import MenuTabList from '../TabsProfile/MenuTab/MenuTabList'

const DemoMenu = () => {

	return (
		<View style={styles.container}>
			<StatusBar style={'light'} translucent={true} backgroundColor={COLOR.NONE} />
			<PayBackHeader title={'Войти'} />
			<MenuTabList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default DemoMenu

