import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import ButtonCustom from '../../components/ButtonCustom'
import ScrollViewContainer from '../../components/ScrollViewContainer'
import SocialLogin from '../../components/SocialLogin'
import TextLine from '../../components/TextLine'
import { ROUTE_TYPE } from '../../type/types'
import APP_NAME from '../../vars/APP_NAME'
import { COLOR } from '../../vars/COLOR'
import { SCREEN_NAME } from '../../vars/SCREEN_NAME'
import RegistrInputBox from './RegistrInputBox'

const RegistrStart = () => {
	const { goBack } = useNavigation()
	const { params: { phone_number = '' } = {} } = useRoute<ROUTE_TYPE<SCREEN_NAME.REGISTR>>()

	return (
		<View style={styles.container}>
			<ScrollViewContainer>
				{/* TITLE TOP BOX */}
				<View style={{ flex: 1, justifyContent: 'center' }}>
					<TextLine>
						Регистрация в
					</TextLine>
					<TextLine bold size={30}>
						{APP_NAME}
					</TextLine>
				</View>
				{/* INPUT FORM BOX */}
				<RegistrInputBox phone_number={phone_number} />
				{/* SOCIAL LOGIn BOX */}
				<View style={{ flex: 3, justifyContent: 'center' }}>
					{/* <SocialLogin /> */}
				</View>
				{/* GO BACK BOX */}
				<View style={{ flex: 1, justifyContent: 'flex-end' }}>
					<ButtonCustom bold={false} color={COLOR.GRAY_LIGHT} style={{ marginVertical: 10 }} onPress={goBack}>
						Авторизироваться
					</ButtonCustom>
				</View>
			</ScrollViewContainer>
		</View>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}

})

export default RegistrStart
