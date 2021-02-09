import React from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import ButtonCustom from '../../../components/ButtonCustom'
import MapBoxSmall from '../../../components/MapBoxSmall'
import ScrollViewContainer from '../../../components/ScrollViewContainer'
import { TabTitleHeader } from '../../../components/HeadersBlack'
import TextLine from '../../../components/TextLine'
import { logOutResetAction } from '../../../store/actions'
import state from '../../../store/state'
import { COLOR } from '../../../vars/COLOR'
import ProfileInputBox from './ProfileInputBox'

const ProfileTab = () => {
	const dispatch = useDispatch()
	const logOut = () => {
		dispatch(logOutResetAction(state))
	}
	return (
		<View>
			<TabTitleHeader title={'Профиль'} />
			<ScrollViewContainer style={{ paddingBottom: 200, paddingTop: 0 }} >
				{/* TEXT INPUTS BOX */}
				<ProfileInputBox />
				<ProfileTitle >
					Адрес
				</ProfileTitle>
				{/* MAPS BOX */}
				<MapBoxSmall />
				{/* LOG OUT BOX */}
				<ButtonCustom bold={false} color={COLOR.GRAY_LIGHT} style={{ marginTop: 40 }} onPress={logOut} >
					Выйти
				</ButtonCustom>
			</ScrollViewContainer>
		</View>)
}

const ProfileTitle = ({ children }: { children: string }) => <TextLine style={{ paddingLeft: 5, marginTop: 30, marginBottom: 10 }} >{children}</TextLine>


export default ProfileTab
