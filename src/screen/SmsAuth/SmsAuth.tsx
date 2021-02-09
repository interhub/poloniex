import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Keyboard, View } from 'react-native'
import API from '../../api/API'
import ButtonCustom from '../../components/ButtonCustom'
import ScrollViewContainer from '../../components/ScrollViewContainer'
import TextLine from '../../components/TextLine'
import useErrorString from '../../hook/state/useErrorString'
import useLoading from '../../hook/state/useLoading'
import { ROUTE_TYPE } from '../../type/types'
import { COLOR } from '../../vars/COLOR'
import { SCREEN_NAME } from '../../vars/SCREEN_NAME'
import CodeInput from './CodeInput'
import ResendTimerBox from './ResendTimerBox'

const SmsAuth = () => {
	const navigation = useNavigation()
	const { error, setError } = useErrorString()
	const { params: { callback = () => false, phone_number = '' } = {} } = useRoute<ROUTE_TYPE<SCREEN_NAME.SMS_AUTH>>()
	if (!phone_number) console.warn('none phone_number from navigation params')
	const goBack = () => {
		navigation.goBack()
	}
	const [isReadyTimer, setIsReadyTimer] = useState(false)
	const getSms = () => {
		API.getSms({ phone_number })
	}

	useEffect(getSms, [])

	const [code, setCode] = useState('')
	const { loading } = useLoading()

	const input_end = async () => {
		if (code.length < 5) return setError(' ')
		callback(code)
	}

	const hide_key = () => Keyboard.dismiss()

	useEffect(() => {
		if (code.length === 5) {
			input_end()
			hide_key()
		}
		setError('')
	}, [code])

	return (
		<ScrollViewContainer >
			<View style={{ flex: 2, justifyContent: 'center' }} >
				<TextLine>
					Проверка
				</TextLine>
			</View>

			<View style={{ flex: 2, justifyContent: 'flex-end' }} >
				<TextLine color={COLOR.GRAY_DARK} center>
					{`Отправили код на Ваш номер\n${phone_number}`}
				</TextLine>
			</View>

			<View style={{ flex: 3, justifyContent: 'center' }} >
				<CodeInput value={code} onChange={setCode} error={error} />
			</View>

			<View style={{ flex: 2 }} >
				<ButtonCustom disabled={loading} loading={loading} bold={false} style={{ marginTop: 10 }} onPress={input_end} >
					Начать
				</ButtonCustom>
			</View>

			<View style={{ flex: 2 }} >
				<ResendTimerBox isReadyTimer={isReadyTimer} onResend={getSms} setIsReadyTimer={setIsReadyTimer} />
			</View>

			<View style={{ flex: 2, justifyContent: 'flex-end' }} >
				<ButtonCustom bold={false} color={COLOR.GRAY_LIGHT} style={{ marginTop: 10 }} onPress={goBack} >
					Изменить номер
				</ButtonCustom>
			</View>
		</ScrollViewContainer>
	)
}


export default SmsAuth
