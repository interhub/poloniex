import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import 'moment/locale/ru'
import React, { useMemo, useRef, useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import ButtonToggle from '../../../components/ButtonToggle'
import DividerCustom from '../../../components/DividerCustom'
import ImageHoc from '../../../components/ImageHoc'
import Message from '../../../components/Message'
import TextLine from '../../../components/TextLine'
import useMenu from '../../../hook/state/useMenu'
import { store } from '../../../store/store'
import { HistoryOrderType, NAV_TYPE, ProductType } from '../../../type/types'
import { COLOR } from '../../../vars/COLOR'
import { SCREEN_NAME } from '../../../vars/SCREEN_NAME'
import HistoryCancelModal from './HistoryCancelModal'


const IMG_SIZE = 55

const HistoryItem = ({ history }: { history: HistoryOrderType }) => {
	if (!history) return null
	const { changeCount, cartClear } = useMenu()
	const [localLoading, setLocalLoading] = useState(false)
	const { navigate } = useNavigation<NAV_TYPE>()
	const modalRef = useRef<Modalize>(null)
	const onRepeatOrderPress = async () => {
		try {
			setLocalLoading(true)
			await cartClear()
			for (let i = 0; i < history.products.length; i++) {
				const new_product = { ...history.products[i], index: getIndexByProduct(history.products[i]) }
				await changeCount(new_product).SET({ in_cart: true, quantity: history.products[i].quantity })
			}
			navigate(SCREEN_NAME.CART_PAGE)
		} catch (e) {
			console.warn(e)
			Message('Возникла ошибка загрузки')
		} finally {
			setLocalLoading(false)
		}
	}
	const onBreakOrderPress = () => {
		if (!history.can_be_canceled) return
		modalRef.current?.open()
	}

	const date_time = useMemo(() => moment(history.datetime_created).format('DD MMM HH:mm'), [])

	return (
		<>
			<View>
				{/* TOP DATE STATUS BOX */}
				<View style={styles.textBox}>
					<TextLine color={COLOR.GRAY_DARK}>
						{date_time}
					</TextLine>
					<TextLine color={COLOR.GRAY}>
						{history.status}
					</TextLine>
				</View>
				{/* ROW ITEMS BOX FOR PRODUCTS */}
				{history.products.map((product, key) => {
					return <HisroryRowItem product={product} key={key} />
				})}
				<DividerCustom />
				<TextLine center style={{ marginVertical: 10 }} >
					Итого: {history.total_formatted}
				</TextLine>
				{/* BTN FOOTER ITEM BOX */}
				{history.can_be_repeated &&
					<ButtonToggle active onPress={onRepeatOrderPress} center>
						{
							localLoading ?
								<ActivityIndicator color={COLOR.BLACK_LIGHT} /> :
								'Повторить'
						}
					</ButtonToggle>}
				{/* CANCEL BTN */}
				{history.can_be_canceled &&
					<ButtonToggle onPress={onBreakOrderPress} center textProp={{ color: COLOR.GRAY_DARK, tint: true }}>
						Отменить заказ
                </ButtonToggle>}
				<DividerCustom />
			</View>
			<HistoryCancelModal id={history.id} modalRef={modalRef} />
		</>
	)
}

const HisroryRowItem = ({ product }: { product: ProductType }) => {
	const { navigate } = useNavigation<NAV_TYPE>()
	const goToProduct = () => {
		const index = getIndexByProduct(product)
		navigate(SCREEN_NAME.PRODUCT_PAGE, { index })
	}

	return <TouchableOpacity onPress={goToProduct} style={styles.itemRowBox}>
		<View style={styles.imgBox}>
			<ImageHoc style={styles.img} source={{ uri: product.img_url }} />
		</View>
		<View style={{ paddingLeft: 20, flex: 1 }}>
			<TextLine>
				{product.name}
			</TextLine>
		</View>
		<View style={{ flex: 1, alignItems: 'flex-end' }}>
			<TextLine size={15}>
				{`${product.quantity} x ${product.price_formatted}`}
			</TextLine>
		</View>
	</TouchableOpacity>
}

const getIndexByProduct = (product: ProductType): number => {
	return store.getState().menu.products.find((prod) => prod.id === product.id && prod.modification_id === product.modification_id)?.index || 0
}

const styles = StyleSheet.create({
	textBox: {
		flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10
	},
	imgBox: {
		height: IMG_SIZE,
	},
	img: {
		width: IMG_SIZE,
		height: '100%',
		borderRadius: 10
	},
	itemRowBox: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5
	}
})

export default React.memo(HistoryItem)

