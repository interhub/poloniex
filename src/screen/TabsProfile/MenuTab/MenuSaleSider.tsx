import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import ImageHoc from '../../../components/ImageHoc'
import TextLine from '../../../components/TextLine'
import { useSelectorStringHook } from '../../../hook/state/useSelectorStateHook'
import { NAV_TYPE, SaleActionType } from '../../../type/types'
// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { COLOR } from '../../../vars/COLOR'
import { SCREEN_NAME } from '../../../vars/SCREEN_NAME'
import { MENU_SIZE } from './MenuSizes'

const SLIDER_HEIGHT = MENU_SIZE.SALE_SLIDER_HEIGHT

const MenuSaleSider = () => {

	const navigation = useNavigation<NAV_TYPE>()
	const { sales } = useSelectorStringHook('sales')
	const { token } = useSelectorStringHook('token')
	const IS_AUTH = !!token

	const goToSalePage = (sale: SaleActionType) => {
		if (IS_AUTH)
			navigation.navigate(SCREEN_NAME.SALE_PAGE, { sale })
	}

	return <View>
		<FlatList
			showsHorizontalScrollIndicator={false}
			style={{ height: SLIDER_HEIGHT, paddingLeft: 20 }}
			ListFooterComponent={() => <View style={{ width: SLIDER_HEIGHT }} />}
			ListEmptyComponent={() => <View style={{ justifyContent: 'center' }} ><TextLine color={COLOR.GRAY} >Пусто...</TextLine></View>}
			horizontal
			data={sales}
			renderItem={({ item: sale, index }) => {
				return <TouchableOpacity onPress={() => goToSalePage(sale)} style={styles.sale_item}  >
					<ImageHoc exist={!!sale.image} source={{ uri: sale.image }} style={{ width: '100%', height: '100%' }} />
					<SaleItemTitle title={sale.title} />
				</TouchableOpacity>
			}}
			keyExtractor={({ image }, index) => image?.toString()}
		/>
	</View>
}

const SaleItemTitle = ({ title }: { title: string }) => {
	return <View style={{ backgroundColor: COLOR.YELLOW, position: 'absolute', borderRadius: 5, bottom: 10, left: 8, padding: 5, width: '80%' }} >
		<TextLine size={14} bold >
			{title}
		</TextLine>
	</View>
}


const styles = StyleSheet.create({
	sale_item: {
		height: SLIDER_HEIGHT,
		width: SLIDER_HEIGHT,
		backgroundColor: COLOR.BLACK_LIGHT,
		borderRadius: 10,
		marginRight: 10,
		overflow: 'hidden'
	}
})

export default React.memo(MenuSaleSider)