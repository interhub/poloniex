import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { COLOR } from '../vars/COLOR'
import TextLine from './TextLine'

export const HeaderBackIcons = React.memo(({ color = COLOR.BLACK_LIGHT, title = '' }: { color?: string, title?: string }) => {
	const { goBack } = useNavigation()
	return <View >
		<TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} onPress={goBack}>
			<Entypo name="chevron-left" size={32} color={color} />
			<TextLine color={color} >
				{title}
			</TextLine>
		</TouchableOpacity>
	</View>
})