import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import getScreenAnimation, { SCREEN_ANIMATION } from '../config/getScreenAnimation'
import navigateRef from '../config/navigateRef'
import useLoadResource from '../hook/load_config/useLoadResource'
import { COLOR } from '../vars/COLOR'
import { SCREEN_NAME } from '../vars/SCREEN_NAME'
import TabsProfileNavigator from './TabsProfileNavigator'

const Stack = createStackNavigator()

const AppNavigator = () => {
	const { isLoaded } = useLoadResource()

	if (!isLoaded) {
		return null
	}

	return (
		<>
			<NavigationContainer ref={navigateRef} >
				<Stack.Navigator
					screenOptions={{ cardStyle: { backgroundColor: COLOR.WHITE } }}
					detachInactiveScreens={false}
					headerMode={'screen'}
					initialRouteName={SCREEN_NAME.LOAD_PAGE}>
					<Stack.Screen
						options={{ ...getScreenAnimation(SCREEN_ANIMATION.TOP) }}
						name={SCREEN_NAME.LOAD_PAGE}
						component={TabsProfileNavigator} />
					<Stack.Screen
						options={{ ...getScreenAnimation(SCREEN_ANIMATION.TOP) }}
						name={SCREEN_NAME.TABS_PAGE}
						component={TabsProfileNavigator} />
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar style={'dark'} translucent={true} backgroundColor={COLOR.NONE} />
		</>
	)
}

export default AppNavigator
