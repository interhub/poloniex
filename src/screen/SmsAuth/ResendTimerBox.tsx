import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import TextLine from '../../components/TextLine'
import { COLOR } from '../../vars/COLOR'

const ResendTimerBox = ({ isReadyTimer, setIsReadyTimer, onResend }: { isReadyTimer: boolean, setIsReadyTimer: (ready: boolean) => void, onResend: () => void }) => {
	//COUNTER TIMER
	const TIMER_TIME = 30

	const [countTime, setCountTime] = useState(isReadyTimer ? 0 : TIMER_TIME)
	useEffect(() => {
		if (countTime) {
			const timer = setTimeout(setCountTime, 1000, countTime - 1)
			return () => clearTimeout(timer)
		} else {
			setIsReadyTimer(true)
		}
	}, [countTime])

	//START TIME if set not ready 
	useEffect(() => {
		if (!isReadyTimer) {
			setCountTime(TIMER_TIME)
		}
	}, [isReadyTimer])

	const resend = () => {
		setIsReadyTimer(false)
		if (isReadyTimer) onResend()
	}

	const IS_SHOW = !!countTime

	return <TouchableOpacity onPress={resend} style={{}}>
		<View style={{ opacity: IS_SHOW ? 1 : 0 }} >
			<TextLine size={18} color={COLOR.GRAY} center>
				{countTime.toString()}
			</TextLine>
		</View>
		<TextLine size={18} color={!countTime ? COLOR.BLACK_LIGHT : COLOR.GRAY_LIGHT} style={{ margin: 30 }} center>
            Запросить код повторно
		</TextLine>
	</TouchableOpacity>

}

export default ResendTimerBox