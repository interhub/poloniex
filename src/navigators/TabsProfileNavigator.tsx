import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Animated, useWindowDimensions, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MyIcon from '../components/MyIcon'
import HistoryTab from '../screen/TabsProfile/HistoryTab/HistoryTab'
import MenuTab from '../screen/TabsProfile/MenuTab/MenuTab'
import ProfileTab from '../screen/TabsProfile/ProfileTab/ProfileTab'
import { COLOR } from '../vars/COLOR'
import { SCREEN_NAME_TABS } from '../vars/SCREEN_NAME'
import { ICON_SIZE } from '../vars/SIZE'

const Tab = createBottomTabNavigator()

const TabsProfileNavigator = () => {
	return <>
		<Tab.Navigator
			screenOptions={{
				unmountOnBlur: false,
			}}
			initialRouteName={SCREEN_NAME_TABS.MENU_TAB}
			sceneContainerStyle={{ backgroundColor: COLOR.WHITE }}
			tabBarOptions={{
				keyboardHidesTabBar: true,
				activeTintColor: COLOR.BLACK,
				inactiveTintColor: COLOR.GRAY,
				tabStyle: { flexDirection: 'row', backgroundColor: COLOR.WHITE }
			}}
			tabBar={props => <BottomTabBar {...props} />}
			lazy={true}>
			<Tab.Screen
				name={SCREEN_NAME_TABS.HISTORY_TAB}
				component={HistoryTab} />
			<Tab.Screen
				name={SCREEN_NAME_TABS.MENU_TAB}
				component={MenuTab} />
			<Tab.Screen
				name={SCREEN_NAME_TABS.PROFILE_TAB}
				component={ProfileTab} />
		</Tab.Navigator>
		<StatusBar style={'light'} translucent={true} backgroundColor={COLOR.NONE} />
	</>
}


const TAB_INFO = [
	{ source: require('../img/icon/tabs/1.png'), key: 0 },
	{ source: require('../img/icon/tabs/2.png'), key: 1 },
	{ source: require('../img/icon/tabs/3.png'), key: 2 },
]

const BottomTabBar = ({ state, tabStyle }: BottomTabBarProps) => {
	return (
		<View style={[tabStyle]}>
			{TAB_INFO.map((_, key) => <TabItem info={TAB_INFO[key]} key={key} state={state} />)}
		</View >
	)
}


const TabItem = ({ state, info }: { state: BottomTabBarProps['state'], info: typeof TAB_INFO[0] }) => {
	const { height } = useWindowDimensions()
	const PADDING = height * 0.022
	const navigation = useNavigation()
	const { bottom } = useSafeAreaInsets()
	const IS_FOCUSED = state.index === info.key
	const ICON_COLOR = IS_FOCUSED ? COLOR.BLACK_LIGHT : COLOR.GRAY

	return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
		<TouchableOpacity style={{ paddingBottom: bottom + PADDING, paddingTop: PADDING, paddingHorizontal: PADDING }} onPress={() => {
			navigation.navigate(state.routeNames[info.key])
		}} >
			<MyIcon active={IS_FOCUSED} size={ICON_SIZE} color={ICON_COLOR} source={info.source} />
		</TouchableOpacity>
	</View>

}


export default TabsProfileNavigator
