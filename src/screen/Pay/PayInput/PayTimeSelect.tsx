import { Entypo } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-paper'
import ButtonToggle from '../../../components/ButtonToggle'
import ModalizeCustom from '../../../components/ModalizeCustom'
import TextLine from '../../../components/TextLine'
import useOrder from '../../../hook/state/useOrder'
import { COLOR } from '../../../vars/COLOR'
import IS_IOS from '../../../vars/IS_IOS'
const PayTimeSelect = () => {
	const modalRef = useRef<Modalize | null>(null)
	const { order_info: { order_time, } } = useOrder()
	const setOpenSelect = () => {
		modalRef.current?.open()
	}

	// const hideSelect = () => {
	// 	modalRef.current?.close()
	// } 

	const time_title = order_time === 0 ? 'Как можно скорее' : moment(order_time).format('DD.MM.YYYY - HH.mm ч')

	return (
		<>
			<TextLine bold style={{ marginLeft: 5, marginTop: 30, marginBottom: 15 }}>
				Время доставки
			</TextLine>
			<ButtonToggle onPress={setOpenSelect} right={<Entypo name="chevron-small-down" size={24} color="black" />} >
				{time_title}
			</ButtonToggle>
			<Portal>
				<ModalizeCustom ref={modalRef} >
					<SelectModalContent />
				</ModalizeCustom>
			</Portal>
		</>
	)
}

export const SelectModalContent = () => {
	const { order_info: { order_time }, setOrderProp } = useOrder()

	const [showPicker, setShowPicker] = React.useState(false)
	const onSelectPicker = (order_time?: number) => {
		setOrderProp('order_time', order_time || 0)
	}
	const onPressFast = () => {
		setOrderProp('order_time', 0)
	}

	const time_title = order_time === 0 ? 'Выбрать время' : moment(order_time).format('DD.MM.YYYY - HH.mm ч')

	return <View style={{ padding: 20 }} >
		<TextLine bold >
			Время доставки
		</TextLine>
		<ButtonToggle active={!order_time} onPress={onPressFast} margin={10} >
			Как можно скорее
		</ButtonToggle>
		<ButtonToggle active={!!order_time} onPress={() => { setShowPicker(true) }} margin={10} >
			{time_title}
		</ButtonToggle>
		{showPicker && <DatePickerBox setShowPicker={setShowPicker} onSelect={onSelectPicker} />}
	</View>
}

const DatePickerBox = ({ setShowPicker, onSelect }: { setShowPicker: (show: boolean) => void, onSelect: (time: number) => void }) => {
	const [showDate, setShowDate] = useState(true)
	const { order_info: { order_time } } = useOrder()
	const initial = order_time ? new Date(order_time) : new Date()
	const [date, setDate] = useState(initial)
	const [showTime, setShowTime] = useState(false)

	const hide = () => {
		setShowDate(false)
		setShowTime(false)
		setShowPicker(false)
	}
	const onChangeIos = (event: any, new_date_time: any) => {
		if (!new_date_time) return hide()
		setDate(new_date_time)
		onSelect(new Date(new_date_time).valueOf())
	}
	const onChangeAndroidDate = (event: any, new_date_time: any) => {
		if (!new_date_time) return hide()
		setDate(new_date_time)
		setShowDate(false)
		setShowTime(true)
	}

	const onChangeAndroidTime = (event: any, new_date_time: any) => {
		if (!new_date_time) return hide()
		setShowDate(false)
		setShowTime(false)
		setShowPicker(false)
		const day = new Date(date).setHours(new Date(new_date_time).getHours())
		const result = new Date(new Date(day).setMinutes(new Date(new_date_time).getMinutes()))
		onSelect(result.valueOf())
	}

	return <View >
		{IS_IOS && showDate && <DateTimePicker
			value={date}
			minimumDate={new Date()}
			locale={'rus'}
			textColor={COLOR.BLACK_LIGHT}
			display={'spinner'}
			mode={'datetime'}
			onChange={onChangeIos}
		/>}
		{!IS_IOS && showDate && <DateTimePicker
			value={new Date()}
			minimumDate={new Date()}
			display={'spinner'}
			locale={'rus'}
			mode={'date'}
			onChange={onChangeAndroidDate}
		/>}
		{!IS_IOS && showTime && <DateTimePicker
			value={new Date()}
			minimumDate={new Date()}
			display={'spinner'}
			locale={'rus'}
			mode={'time'}
			onChange={onChangeAndroidTime}
		/>}
	</View>
}

export default PayTimeSelect

