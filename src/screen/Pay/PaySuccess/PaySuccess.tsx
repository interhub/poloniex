import React from 'react'
import { StyleSheet, View } from 'react-native'
import DividerCustom from '../../../components/DividerCustom'
import MyIcon from '../../../components/MyIcon'
import ScrollViewContainer from '../../../components/ScrollViewContainer'
import TextLine from '../../../components/TextLine'
import { useSelectorStringHook } from '../../../hook/state/useSelectorStateHook'
import SIZE from '../../../vars/SIZE'
import HistoryItem from '../../TabsProfile/HistoryTab/HistoryItem'
import { PayBackHeader } from '../../../components/HeadersBlack'

const PaySuccess = () => {
	const { history } = useSelectorStringHook('history')
	const last_history = history[0]

	return (
		<>
			<PayBackHeader title={'Меню'} />
			<ScrollViewContainer>
				<View style={styles.topBox}>
					<MyIcon size={150} source={require('../../../img/icon/pay_success.png')} />
					<TextLine bold size={20}>
						Заказ оформлен!
					</TextLine>
					{/* <TextLine size={16} >
                    Примерное время доставки 45 минут
                </TextLine> */}
				</View>
				<DividerCustom />
				<HistoryItem history={last_history} />
			</ScrollViewContainer>
		</>
	)
}

const styles = StyleSheet.create({
	topBox: {
		alignItems: 'center',
		justifyContent: 'space-around',
		height: SIZE.height / 3
	}
})

export default PaySuccess

