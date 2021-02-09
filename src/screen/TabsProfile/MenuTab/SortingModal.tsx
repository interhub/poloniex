import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import ButtonCustom from '../../../components/ButtonCustom'
import ButtonToggle from '../../../components/ButtonToggle'
import ModalizeCustom from '../../../components/ModalizeCustom'
import TextLine from '../../../components/TextLine'
import layoutAnimation from '../../../config/layoutAnimation'
import { useSelectorStringHook } from '../../../hook/state/useSelectorStateHook'
import { setSortingAction } from '../../../store/actions'
import state from '../../../store/state'
import { COLOR } from '../../../vars/COLOR'
import IS_IOS from '../../../vars/IS_IOS'
import { SORTING } from '../../../vars/SORTING'


const SortingModal = ({ open = false, setOpen }: { open: boolean, setOpen: (open: boolean) => void }) => {

	const { sorting } = useSelectorStringHook('sorting')
	const modalizeRef = useRef<Modalize>(null)
	const hide = () => setOpen(false)
	const [localSorting, setLocalSorting] = useState<SORTING>(sorting)

	const dispatch = useDispatch()

	const onSelectType = (type: SORTING) => {
		if (IS_IOS) layoutAnimation()
		dispatch(setSortingAction(type))
	}

	const onReset = () => {
		setLocalSorting(state.sorting)
		onSelectType(state.sorting) //RESET DEFAULT
		hide()
	}

	const onApply = () => {
		setTimeout(() => { onSelectType(localSorting) }, 100)
		hide()
	}

	useEffect(() => {
		open ? modalizeRef.current?.open() : modalizeRef.current?.close()
	}, [open])

	const onClose = () => setOpen(false)

	const { bottom } = useSafeAreaInsets()

	const SORT_TYPES = [
		{ title: 'Цена по возрастанию', active: localSorting === SORTING.PRICE_INC, onSelect: () => setLocalSorting(SORTING.PRICE_INC) },
		{ title: 'Цена по убыванию', active: localSorting === SORTING.PRICE_DEC, onSelect: () => setLocalSorting(SORTING.PRICE_DEC) },
		{ title: 'Новинки', active: localSorting === SORTING.NEWS, onSelect: () => setLocalSorting(SORTING.NEWS) },
	]

	return <ModalizeCustom
		onClose={onClose}
		ref={modalizeRef}>
		{/* ITEMS BOX */}
		<View style={{ paddingHorizontal: 15 }} >
			<TextLine style={{ marginVertical: 20 }} >
				Сортировать
			</TextLine>
			{SORT_TYPES.map(({ active, title, onSelect }, key) => {
				return <ButtonToggle key={key} onPress={onSelect} active={active} >
					{title}
				</ButtonToggle>
			})}
		</View>
		{/* BTN BOX */}
		<View
			style={[{ paddingBottom: 10 + bottom, padding: 10 }, styles.sortingBottomBox]}>
			<View style={{ flex: 1, paddingHorizontal: 5 }} >
				<ButtonCustom onPress={onReset} labaelColor={COLOR.GRAY} color={COLOR.GRAY_DARK}  >
					Сбросить
				</ButtonCustom>
			</View>
			<View style={{ flex: 1, paddingHorizontal: 5 }} >
				<ButtonCustom onPress={onApply}>
					Показать
				</ButtonCustom>
			</View>
		</View>
	</ModalizeCustom>
}


const styles = StyleSheet.create({

	sortingBottomBox: {
		flexDirection: 'row', borderTopRightRadius: 15, borderTopLeftRadius: 15, marginTop: 15,
		backgroundColor: COLOR.BLACK_LIGHT
	}
})

export default SortingModal