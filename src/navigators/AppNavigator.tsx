import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { enableScreens } from 'react-native-screens'
import getScreenAnimation, { SCREEN_ANIMATION } from '../config/getScreenAnimation'
import navigateRef from '../config/navigateRef'
import useLoadResource from '../hook/load_config/useLoadResource'
import CartPage from '../screen/CartPage/CartPage'
import DemoMenu from '../screen/DemoMenu/DemoMenu'
import LoginStart from '../screen/Login/LoginStart'
import MapPage from '../screen/MapPage/MapPage'
import ProductPage from '../screen/ProductPage/ProductPage'
import RegistrPage from '../screen/Registr/RegistrPage'
import SalePage from '../screen/SalePage/SalePage'
import SmsAuth from '../screen/SmsAuth/SmsAuth'
import { COLOR } from '../vars/COLOR'
import { SCREEN_NAME } from '../vars/SCREEN_NAME'
import PayNavigator from './PayNavigator'
import TabsProfileNavigator from './TabsProfileNavigator'

enableScreens()

const Stack = createStackNavigator()

const AppNavigator = () => {
	const { isAuth, isLoaded } = useLoadResource()

	if (!isLoaded) {
		return null
	}

	return (
		<NavigationContainer ref={navigateRef} >
			<Stack.Navigator
				screenOptions={{ cardStyle: { backgroundColor: COLOR.WHITE } }}
				detachInactiveScreens={false}
				headerMode={'screen'}
				initialRouteName={isAuth ? SCREEN_NAME.PROFILE : SCREEN_NAME.LOGIN}>
				<Stack.Screen
					options={{ ...getScreenAnimation(SCREEN_ANIMATION.TOP) }}
					name={SCREEN_NAME.LOGIN}
					component={LoginStart} />
				<Stack.Screen
					options={{ ...getScreenAnimation(SCREEN_ANIMATION.LEFT) }}
					name={SCREEN_NAME.REGISTR}
					component={RegistrPage} />
				<Stack.Screen
					options={{ ...getScreenAnimation(SCREEN_ANIMATION.LEFT) }}
					name={SCREEN_NAME.SMS_AUTH}
					component={SmsAuth} />
				<Stack.Screen
					options={{ ...getScreenAnimation(SCREEN_ANIMATION.TOP) }}
					name={SCREEN_NAME.DEMO_MENU}
					component={DemoMenu} />
				{isAuth && <>
					<Stack.Screen
						options={{ ...getScreenAnimation(SCREEN_ANIMATION.LEFT) }}
						name={SCREEN_NAME.PRODUCT_PAGE}
						component={ProductPage} />
					<Stack.Screen
						options={{ ...getScreenAnimation(SCREEN_ANIMATION.ZOOM) }}
						name={SCREEN_NAME.SALE_PAGE}
						component={SalePage} />
					<Stack.Screen
						options={{ ...getScreenAnimation(SCREEN_ANIMATION.TOP) }}
						name={SCREEN_NAME.CART_PAGE}
						component={CartPage} />
					<Stack.Screen
						options={{ ...getScreenAnimation(SCREEN_ANIMATION.LEFT) }}
						name={SCREEN_NAME.MAP_PAGE}
						component={MapPage} />
					<Stack.Screen
						options={{ ...getScreenAnimation(SCREEN_ANIMATION.LEFT) }}
						name={SCREEN_NAME.PAY}
						component={PayNavigator} />
				</>}
				<Stack.Screen
					options={{ ...getScreenAnimation(SCREEN_ANIMATION.TOP) }}
					name={SCREEN_NAME.PROFILE}
					component={TabsProfileNavigator} />
			</Stack.Navigator>
		</NavigationContainer>

	)
}

export default AppNavigator
