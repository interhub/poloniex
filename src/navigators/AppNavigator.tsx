import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import getScreenAnimation, { SCREEN_ANIMATION } from '../config/getScreenAnimation'
import navigateRef from '../config/navigateRef'
import useLoadResource from '../hook/load_config/useLoadResource'
import LoadingPage from '../screen/LoadingPage/LoadingPage'
import { COLOR } from '../vars/COLOR'
import { SCREEN_NAME } from '../vars/SCREEN_NAME'
import TabsNavigator from './TabsNavigator'

const Stack = createStackNavigator()

const AppNavigator = () => {
	const { isLoaded } = useLoadResource()

	return (
		<>
			<NavigationContainer ref={navigateRef} >
				<Stack.Navigator
					detachInactiveScreens={false}
					headerMode={'screen'}
					initialRouteName={SCREEN_NAME.LOAD_PAGE}>
					{!isLoaded && <Stack.Screen
						options={{ ...getScreenAnimation(SCREEN_ANIMATION.TOP) }}
						name={SCREEN_NAME.LOAD_PAGE}
						component={LoadingPage} />}
					{isLoaded && <Stack.Screen
						options={{ ...getScreenAnimation(SCREEN_ANIMATION.FADE) }}
						name={SCREEN_NAME.TABS_PAGE}
						component={TabsNavigator} />}
				</Stack.Navigator>
			</NavigationContainer>
			<StatusBar style={'light'} translucent={true} backgroundColor={COLOR.NONE} />
		</>
	)
}

export default AppNavigator
