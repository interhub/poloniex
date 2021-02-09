import React, { useRef, useState } from 'react'
import { ActivityIndicator, Animated, NativeScrollEvent, NativeSyntheticEvent, SectionList, SectionListData, View } from 'react-native'
import TextLine from '../../../components/TextLine'
import { useSelectorStringHook } from '../../../hook/state/useSelectorStateHook'
import { ProductType } from '../../../type/types'
import { COLOR } from '../../../vars/COLOR'
import SIZE from '../../../vars/SIZE'
import { SORTING } from '../../../vars/SORTING'
import MenuCategorySlider from './MenuCategorySlider'
import MenuItem from './MenuItem'
import MenuSaleSider from './MenuSaleSider'
import { MENU_SIZE } from './MenuSizes'
const sectionListGetItemLayout = require('react-native-section-list-get-item-layout').default

type ListItemType = ProductType
type ListDataType = {
	category_name: string
	data: ListItemType[],
	index: number
}

const get_sort_products = (prods: ProductType[], sort: SORTING): ProductType[] => {
	const products = [...prods]
	switch (sort) {
		case SORTING.PRICE_INC: return products.sort((a, b) => a.price - b.price)
		case SORTING.PRICE_DEC: return products.sort((a, b) => b.price - a.price)
		case SORTING.NEWS: return products.sort((a, b) => b.timestamp - a.timestamp)
	}
}

const MenuTabList = () => {
	const { menu } = useSelectorStringHook('menu')
	const { sorting } = useSelectorStringHook('sorting')

	// CATEGORY INDEX STATE
	const [index, setViewIndex] = useState(0)
	const { onScroll, sliderStyle } = useAnimateMenuHook(setViewIndex)

	const sectionRef = useRef<SectionList<ListItemType, ListDataType> | null>(null)

	const scrollToSection = (sectionIndex = 0) => {
		sectionRef.current?.scrollToLocation({ animated: true, itemIndex: 0, sectionIndex, viewOffset: MENU_SIZE.MENU_TITLE_HEIGHT, })
	}

	const DATA: ListDataType[] = menu.categories.map((cat) => ({
		category_name: cat.name,
		data: get_sort_products(menu.products, sorting).filter((prod) => prod.category === cat.name),
		index: cat.index
	}))

	return (
		<View>
			<Animated.View style={[{ zIndex: 10, position: 'absolute' }, sliderStyle]} >
				<MenuCategorySlider index={index} scrollMenu={scrollToSection} />
			</Animated.View>
			<Animated.SectionList
				ref={sectionRef}
				showsVerticalScrollIndicator={false}
				scrollEventThrottle={1}
				onScroll={onScroll}
				removeClippedSubviews={true}
				initialNumToRender={4}
				ListHeaderComponent={MenuHeader}
				windowSize={4}
				maxToRenderPerBatch={4}
				ListFooterComponent={() => <View style={{ height: SIZE.height / 2 }} />}
				keyExtractor={({ index: product_index, name }, index) => product_index?.toString() || name}
				renderSectionHeader={({ section: { data, category_name, index, }, }: { section: SectionListData<ListItemType, ListDataType> }) => <TitleMenu>{category_name}</TitleMenu>}
				renderItem={({ item: product, index }) => {
					return <MenuItem product={product} />
				}}
				ListEmptyComponent={() => <ActivityIndicator color={COLOR.BLACK_LIGHT} />}
				sections={DATA}
				getItemLayout={sectionListGetItemLayout({
					getItemHeight: () => MENU_SIZE.MENU_ITEM_HEIGHT,
					getSectionHeaderHeight: () => MENU_SIZE.MENU_TITLE_HEIGHT,
					listHeaderHeight: MENU_SIZE.MENU_TITLE_HEIGHT * 2 + (MENU_SIZE.SALE_SLIDER_HEIGHT + MENU_SIZE.CAT_SLIDER_HEIGHT),
				})}
				onScrollToIndexFailed={({ index, averageItemLength, highestMeasuredFrameIndex }) => {
					console.warn('warn scroll', index)
				}}
			/>
		</View>
	)
}

const useAnimateMenuHook = (setIndexState: (ind: number) => void) => {
	const { menu } = useSelectorStringHook('menu')
	const menu_arr = menu.categories.map((cat) => (menu.products.filter((prod) => prod.category === cat.name).length))
	//SET NEW CALCULATE INDEX BY SCROLL WAY SIZE (y)
	const getUpdateIndex = (y = 0) => {
		const FIRST_POINT = Math.round(MENU_SIZE.MENU_TITLE_HEIGHT + MENU_SIZE.SALE_SLIDER_HEIGHT + MENU_SIZE.CAT_SLIDER_HEIGHT - MENU_SIZE.MENU_ITEM_HEIGHT)
		const REAL_Y = y - FIRST_POINT
		const getHeightLenByData = (section_len: number) => Math.round(MENU_SIZE.MENU_TITLE_HEIGHT + section_len * MENU_SIZE.MENU_ITEM_HEIGHT)
		const ALL_POINTS_HEIGHTS = menu_arr
			.map((section_len, key, arr) => getHeightLenByData(section_len))
		const RES: any[] = []
		ALL_POINTS_HEIGHTS.map((sizes, key, arr) => {
			RES.push(sizes + (RES[key - 1] || 0))
		})
		const NEW_INDEX = (RES.findIndex((point: any) => point > REAL_Y))
		setIndexState(NEW_INDEX)
	}
	//GET SLIDER POSITION CONFIG
	const pos_state = {
		initial: 0,
		head: ((MENU_SIZE.MENU_TITLE_HEIGHT * 2) + MENU_SIZE.SALE_SLIDER_HEIGHT)
	}
	const posY = useRef(new Animated.Value(pos_state.initial)).current
	const onScroll = Animated.event([{
		nativeEvent: { contentOffset: { y: posY } }
	}], {
		useNativeDriver: true,
		listener: ({ nativeEvent: { contentOffset: { y } } }: NativeSyntheticEvent<NativeScrollEvent>) => {
			getUpdateIndex(Math.round(y))
		}
	})
	const translateY = posY.interpolate({ inputRange: [pos_state.initial, pos_state.head], outputRange: [pos_state.initial, -(pos_state.head + 1/*"1" need for SMALL DEVICE DEBUG PIXEL*/)], extrapolateRight: 'clamp' })
	const sliderStyle = {
		top: pos_state.head,
		transform: [{ translateY }],
	}
	return { onScroll, sliderStyle }
}


const TitleMenu = ({ children }: { children: string }) => <View style={{ height: MENU_SIZE.MENU_TITLE_HEIGHT, paddingLeft: 20, justifyContent: 'center' }}>
	<TextLine size={20} >{children}</TextLine>
</View>

const MenuHeader = () => {
	return <>
		<TitleMenu>
			Акции
		</TitleMenu>
		<MenuSaleSider />
		<TitleMenu>
			Меню
		</TitleMenu>
		<View style={{ height: MENU_SIZE.CAT_SLIDER_HEIGHT }} />
	</>
}

export default MenuTabList

