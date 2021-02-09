import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import API from '../../../api/API'
import WebView from 'react-native-webview'
import ButtonCustom from '../../../components/ButtonCustom'
import { PayBackHeader } from '../../../components/HeadersBlack'
import TextLine from '../../../components/TextLine'
import { SCREEN_NAME, SCREEN_NAME_PAY } from '../../../vars/SCREEN_NAME'
import LOCATION from '../../../vars/LOCATION'
import Message from '../../../components/Message'

const REDIRECT_LINK = {
	SUCCESS: LOCATION + '/api/orders/success',
	FAIL: LOCATION + '/api/orders/failure',
}

const PayProcess = () => {
	const navigation = useNavigation<any>()
	const { params: { payment_url = '' } = {} } = useRoute<any>()

	if (!payment_url) {
		return <TextLine center>Ссылка на покупку отсутствует</TextLine>
	}
	const [isRedirected, setIsRedirected] = useState(false)

	const goToSuccess = async () => {
		setIsRedirected(true)
		await API.getAllInfo()
		return navigation.replace(SCREEN_NAME.PAY, { screen: SCREEN_NAME_PAY.PAY_SUCCESS })
	}

	const onFail = () => {
		setIsRedirected(true)
		Message('Ошибка оплаты')
		navigation.goBack()
	}

	const onNavigationStateChange = ({ url }: { url: string }) => {
		if (isRedirected) return
		switch (true) {
			case url?.includes(REDIRECT_LINK.SUCCESS):
				return goToSuccess()
			case url?.includes(REDIRECT_LINK.FAIL):
				return onFail()
			default:
				return
		}
	}

	return (
		<View style={styles.container}>
			<PayBackHeader />
			<WebView onNavigationStateChange={onNavigationStateChange} source={{ uri: payment_url }} style={{ flex: 1 }}></WebView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})

export default PayProcess
