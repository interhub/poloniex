import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useWindowDimensions, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import AnimateIcon from '../components/AnimateIcon'
import getShadow from '../config/getShadow'
import AboutPage from '../screen/TabsScreen/AboutPage/AboutPage'
import TablePage from '../screen/TabsScreen/TablePage/TablePage'
import { COLOR } from '../vars/COLOR'
import { TABS_NAME } from '../vars/SCREEN_NAME'

const Tab = createBottomTabNavigator()

const TabsNavigator = () => {
	return <Tab.Navigator
		screenOptions={{
			unmountOnBlur: false,
		}}
		initialRouteName={TABS_NAME.ABOUT_PAGE}
		sceneContainerStyle={{ backgroundColor: COLOR.DARK_BLUE }}
		tabBar={(props: BottomTabBarProps) => <BottomTabBar {...props} />}
		lazy={false}
		tabBarOptions={{
			keyboardHidesTabBar: true,
			tabStyle: { flexDirection: 'row', backgroundColor: COLOR.DARK_BLUE, ...getShadow(4) }
		}}>
		<Tab.Screen
			name={TABS_NAME.ABOUT_PAGE}
			component={AboutPage} />
		<Tab.Screen
			name={TABS_NAME.TABLE_PAGE}
			component={TablePage} />
	</Tab.Navigator>
}

const TAB_INFO = [
	{ source: require('../img/icon/1.png'), key: 0 },
	{ source: require('../img/icon/2.png'), key: 1 },
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
	const PADDING_TABS = height * 0.022
	const navigation = useNavigation()
	const { bottom } = useSafeAreaInsets()
	const IS_FOCUSED = state.index === info.key
	const ICON_COLOR = IS_FOCUSED ? COLOR.GREEN : COLOR.WHITE

	return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
		<TouchableOpacity style={{ paddingBottom: bottom + PADDING_TABS, paddingTop: PADDING_TABS, paddingHorizontal: PADDING_TABS }} onPress={() => {
			navigation.navigate(state.routeNames[info.key])
		}} >
			<AnimateIcon active={IS_FOCUSED} color={ICON_COLOR} source={info.source} />
		</TouchableOpacity>
	</View>

}


export default TabsNavigator
