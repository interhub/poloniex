import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import API from '../../api/API'
import ButtonCustom from '../../components/ButtonCustom'
import TextInputCustom, { TextInputCustomProps } from '../../components/TextInputCustom'
import TextLine from '../../components/TextLine'
import openInBrowser from '../../tool/openInBrowser'
import validateTool from '../../tool/validateTool'
import { NAV_TYPE } from '../../type/types'
import { COLOR } from '../../vars/COLOR'
import DEV from '../../vars/DEV'
import { LINKS } from '../../vars/LINKS'
import { MASK } from '../../vars/MASK'
import { SCREEN_NAME } from '../../vars/SCREEN_NAME'

const RegistrInputBox = ({ phone_number }: { phone_number: string }) => {

	const { navigate, reset } = useNavigation<NAV_TYPE>()

	const { values, handleChange } = useFormik({
		initialValues: {
			name: DEV ? 'Test Name' : '',
			email: DEV ? 'test@gmail.com' : '',
			phone_number
		},
		onSubmit: async (values) => {
			// console.log(values)
		}
	})

	const goToProfile = () => {
		reset({ routes: [{ name: SCREEN_NAME.PROFILE }] })
	}

	const goToSms = () => {
		const callback = async (code: string) => {
			const { data: { success } } = await API.registration({ code, ...values })
			if (success) goToProfile()
		}
		navigate(SCREEN_NAME.SMS_AUTH, { callback, phone_number: values.phone_number })
	}
	const goToBrowser = () => {
		openInBrowser(LINKS.OFERTA)
	}

	const isValide =
		validateTool.email(values.email) &&
		validateTool.phone(values.phone_number) &&
		validateTool.name(values.name)

	const inputPropsData: TextInputCustomProps[] = [
		{ value: values.name, onChangeText: handleChange('name'), placeholder: 'Ваше имя', label: 'Имя' },
		{ value: values.email, onChangeText: handleChange('email'), placeholder: 'Эл. почта', label: 'Почта' },
		{ value: values.phone_number, onChangeText: handleChange('phone_number'), placeholder: '+7', label: 'Номер телефона', mask: MASK.PHONE },
	]

	return (
		<>
			<View style={{ flex: 6, justifyContent: 'space-around' }}>
				{inputPropsData.map((props, key) => {
					return <TextInputCustom {...props} key={key} />
				})}
			</View>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<ButtonCustom disabled={!isValide} bold={false} style={{ marginVertical: 10 }} onPress={goToSms} >
					Получить код
				</ButtonCustom>
				<TextLine size={16} color={COLOR.GRAY} tint >
					Нажимая кнопку “Получить код” Вы соглашаетесь с <Text onPress={goToBrowser} style={{ color: COLOR.GRAY_DARK, textDecorationLine: 'underline' }}>условиями оферты</Text>.
				</TextLine>
			</View>
		</>
	)
}

export default RegistrInputBox

