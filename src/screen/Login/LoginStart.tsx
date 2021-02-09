import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import 'react-native-gesture-handler'
import API from '../../api/API'
import ButtonCustom from '../../components/ButtonCustom'
import ScrollViewContainer from '../../components/ScrollViewContainer'
import TextInputCustom from '../../components/TextInputCustom'
import TextLine from '../../components/TextLine'
import useErrorString from '../../hook/state/useErrorString'
import useLoading from '../../hook/state/useLoading'
import formatPhone from '../../tool/formatPhone'
import validateTool from '../../tool/validateTool'
import { NAV_TYPE } from '../../type/types'
import APP_NAME from '../../vars/APP_NAME'
import { COLOR } from '../../vars/COLOR'
import DEV from '../../vars/DEV'
import { MASK } from '../../vars/MASK'
import { SCREEN_NAME } from '../../vars/SCREEN_NAME'

const LoginStart = () => {
	const { navigate, reset } = useNavigation<NAV_TYPE>()
	const [phone_number, set_phone_number] = useState(DEV ? formatPhone.LONG('79622639809') : '')

	const { setError, error } = useErrorString()
	const { loading } = useLoading()

	const goToReg = () => {
		navigate(SCREEN_NAME.REGISTR, { phone_number })
	}
	const goToProfile = () => {
		reset({ routes: [{ name: SCREEN_NAME.PROFILE }] })
	}
	const goToDemoMenu = () => {
		navigate(SCREEN_NAME.DEMO_MENU)
	}
	useEffect(() => {
		setError('')
	}, [phone_number])

	const goToSms = async () => {
		const { data: { user_exists = false } } = await API.checkUserExist({ phone_number })

		if (!user_exists) return setError('Пользователь не найден')//goToReg()

		const callback = async (code: string) => {
			const { data: { success } } = await API.authPhone({ code, phone_number })
			if (success) goToProfile()
		}
		navigate(SCREEN_NAME.SMS_AUTH, { phone_number, callback })
	}

	const isValide = validateTool.phone(phone_number)

	return (<View style={styles.container}>
		<ScrollViewContainer>
			<View style={{ flex: 2, justifyContent: 'center' }} >
				<TextLine>
					Авторизация в
				</TextLine>
				<TextLine bold size={30}>
					{APP_NAME}
				</TextLine>
			</View>
			<View style={{ flex: 5, justifyContent: 'center' }} >
				<TextInputCustom onSubmitEditing={goToSms} returnKeyType={'go'} value={phone_number} onChangeText={set_phone_number} mask={MASK.PHONE} placeholder={'+7'} label={'Номер телефона'} />
				<TextLine size={16} color={COLOR.RED} >{' ' + error}</TextLine>
			</View>
			<View style={{ flex: 2 }} >
				<ButtonCustom loading={loading} disabled={!isValide} bold={false} style={{ marginTop: 10 }} onPress={goToSms} >
					Получить код
				</ButtonCustom>
			</View>
			<View style={{ flex: 2, paddingTop: 10 }} >
				{/* <SocialLogin /> */}
			</View>
			<View style={{ flex: 3, justifyContent: 'flex-end' }} >
				<ButtonCustom color={COLOR.YELLOW} bold={false} onPress={goToDemoMenu} >
					Меню
				</ButtonCustom>
				<ButtonCustom color={COLOR.GRAY_LIGHT} bold={false} style={{ marginTop: 15 }} onPress={goToReg} >
					Регистрация
				</ButtonCustom>
			</View>
		</ScrollViewContainer>
	</View>)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default LoginStart