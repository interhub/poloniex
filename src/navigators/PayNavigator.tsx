import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import getScreenAnimation, { SCREEN_ANIMATION } from '../config/getScreenAnimation'
import PayInputScreen from '../screen/Pay/PayInput/PayInputScreen'
import PayProcess from '../screen/Pay/PayProcess/PayProcess'
import PaySuccess from '../screen/Pay/PaySuccess/PaySuccess'
import { SCREEN_NAME_PAY } from '../vars/SCREEN_NAME'

const Stack = createStackNavigator()

const PayNavigator = () => {

	return (
		<Stack.Navigator detachInactiveScreens={false} headerMode={'screen'}>
			<Stack.Screen
				options={{...getScreenAnimation(SCREEN_ANIMATION.LEFT)}}
				name={SCREEN_NAME_PAY.PAY_INPUT}
				component={PayInputScreen}/>
			<Stack.Screen
				options={{...getScreenAnimation(SCREEN_ANIMATION.FADE)}}
				name={SCREEN_NAME_PAY.PAY_PROCESS}
				component={PayProcess}/>
			<Stack.Screen
				options={{...getScreenAnimation(SCREEN_ANIMATION.LEFT)}}
				name={SCREEN_NAME_PAY.PAY_SUCCESS}
				component={PaySuccess}/>
		</Stack.Navigator>
	)
}

export default PayNavigator
