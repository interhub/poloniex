import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import useLoadingPromise from '../hook/state/useLoadingPromise'
import { useSelectorStringHook } from '../hook/state/useSelectorStateHook'
import signInSocialTool from '../tool/signInSocialTool'
import { NAV_TYPE } from '../type/types'
import { SCREEN_NAME } from '../vars/SCREEN_NAME'
import TextLine from './TextLine'

const SocialLogin = () => {

	return (
		<View style={styles.container}>
			<TextLine center >
				Войти через соцсети
			</TextLine>
			<IconBox />
		</View>
	)
}

const ICON_SIZE = 40

const IconBox = () => {
	const { navigate } = useNavigation<NAV_TYPE>()
	const goToProfile = () => navigate(SCREEN_NAME.PROFILE)
	const { loading } = useSelectorStringHook('loading')

	const useAuthPromise = async (authPromise: Promise<boolean>) => {
		if (loading) return
		const success = await useLoadingPromise(authPromise)
		if (success) goToProfile()
	}

	const facebookLogin = () => useAuthPromise(signInSocialTool.loginFacebook())

	const googleLogin = async () => useAuthPromise(signInSocialTool.loginGoogle())

	return <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
		<TouchableOpacity onPress={facebookLogin} style={[{ backgroundColor: '#4B88F4' }, styles.iconBox]} >
			<FontAwesome name="facebook-f" size={23} color="#fff" style={{ margin: 5, }} />
		</TouchableOpacity>
		<TouchableOpacity onPress={googleLogin} style={[{ backgroundColor: '#F35D40' }, styles.iconBox]}   >
			<AntDesign name="google" size={23} color="#fff" style={{ margin: 5 }} />
		</TouchableOpacity>
	</View>
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
	},
	iconBox: {
		borderRadius: 5,
		margin: 5,
		width: ICON_SIZE,
		height: ICON_SIZE,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default SocialLogin

