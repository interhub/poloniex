import React, { useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
// import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { COLOR } from '../../../vars/COLOR'
import SIZE from '../../../vars/SIZE'
import { MaterialIcons } from '@expo/vector-icons'
import SortingModal from './SortingModal'
import ButtonToggle from '../../../components/ButtonToggle'
import { MENU_SIZE } from './MenuSizes'
import useMenu from '../../../hook/state/useMenu'
import { CategoryType } from '../../../type/types'
import { store } from '../../../store/store'

const SLIDER_HEIGHT = MENU_SIZE.CAT_SLIDER_HEIGHT - 8
const SLIDER_CONTAINER_HEIGHT = MENU_SIZE.CAT_SLIDER_HEIGHT
const ITEM_WIDTH = 100
const PADDING = 5

interface MenuCategorySliderProps { index: number, scrollMenu: (ind: number) => void }

const MenuCategorySlider = ({ scrollMenu, index }: MenuCategorySliderProps) => {

	const { categories } = store.getState().menu
	const MAX_INDEX = categories.length
	const MIN_INDEX = 0

	const listRef = useRef<FlatList | null>(null)
	const scrollCatToIndex = (index: number) => {
		if (index === 0 || index === 1) {
			listRef.current?.scrollToOffset({ offset: 0, animated: true })
		} else {
			listRef.current?.scrollToIndex({ index: index - 1, animated: true })
		}
	}

	useEffect(() => {
		if (index >= MAX_INDEX || index < MIN_INDEX) return
		scrollCatToIndex(index)
	}, [index])

	return (
		<View style={{ backgroundColor: COLOR.WHITE, width: SIZE.width, height: SLIDER_CONTAINER_HEIGHT, paddingVertical: 3 }} >
			<FlatList
				ref={listRef}
				showsHorizontalScrollIndicator={false}
				style={{ height: SLIDER_HEIGHT, paddingLeft: 20 }}
				ListFooterComponent={() => <View style={{ width: SLIDER_HEIGHT }} />}
				ListHeaderComponent={SortingOpenButton}
				horizontal
				data={categories}
				renderItem={({ item, index: key, }: { item: CategoryType, index: number, }) => {
					const ACTIVE = key === index
					const onPress = () => scrollMenu(key)
					return (
						<ButtonToggle center onPress={onPress} active={ACTIVE} margin={0} style={styles.category_item} >
							{item.name}
						</ButtonToggle>
					)
				}}
				keyExtractor={({ name }, index) => name}
			/>
		</View>
	)
}


const SortingOpenButton = () => {
	const [openSortingModal, setOpenSortingModal] = useState(false)
	const onPress = () => setOpenSortingModal(!openSortingModal)
	return <>
		<TouchableOpacity onPress={onPress} style={{ width: SLIDER_HEIGHT, height: SLIDER_HEIGHT, justifyContent: 'center', alignItems: 'center', marginRight: 10, backgroundColor: COLOR.BLACK_LIGHT, borderRadius: SLIDER_HEIGHT }} >
			<MaterialIcons name="filter-list" size={30} color={COLOR.WHITE} />
		</TouchableOpacity>
		<SortingModal open={openSortingModal} setOpen={setOpenSortingModal} />
	</>
}

const styles = StyleSheet.create({
	category_item: {
		height: SLIDER_HEIGHT,
		minWidth: ITEM_WIDTH,
		borderRadius: 10,
		marginRight: 10,
	}
})
export default React.memo(MenuCategorySlider, (prev, next) => {
	return prev.index === next.index
})



