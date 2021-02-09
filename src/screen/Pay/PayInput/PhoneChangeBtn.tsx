import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import ButtonToggle from '../../../components/ButtonToggle'
import TextLine from '../../../components/TextLine'
import { useSelectorStringHook } from '../../../hook/state/useSelectorStateHook'
import formatPhone from '../../../tool/formatPhone'
import { SCREEN_NAME, SCREEN_NAME_TABS } from '../../../vars/SCREEN_NAME'

const PhoneChangeBtn = () => {
	const { user: { phone_number } } = useSelectorStringHook('user')

	const { navigate } = useNavigation<any>()
	const goToPhoneAdd = () => {
		navigate(SCREEN_NAME.PROFILE, { screen: SCREEN_NAME_TABS.PROFILE_TAB, })
	}

	const isHavePhone = !!formatPhone.SHORT(phone_number)

	return (
		<>
			<TextLine style={{ marginTop: 13, marginLeft: 5 }} >Телефон</TextLine>
			<ButtonToggle onPress={goToPhoneAdd} active={!phone_number} right={<Entypo name="chevron-small-right" size={24} color="black" />} >
				{isHavePhone ? formatPhone.LONG(phone_number) : 'Добавить номер'}
			</ButtonToggle>
		</>
	)
}

export default PhoneChangeBtn

