import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import ButtonToggle from '../../components/ButtonToggle'
import TextLine from '../../components/TextLine'
import useMenu from '../../hook/state/useMenu'
import { ProductType, StateType } from '../../type/types'
import { COLOR } from '../../vars/COLOR'

const BottomRecoms = ({ recoms = [] }: { recoms: number[] }) => {
	const { changeCount } = useMenu()
	const products = useSelector<StateType, ProductType[]>(({ menu }) => menu.products.filter((prod) => recoms.includes(prod.id)))
	if (!products.length) return null

	return (
		<View style={styles.recomBox} >
			<TextLine size={18} color={COLOR.GRAY_DARK} >
				Дополнительно
			</TextLine>
			{products.map((prod, key) => {
				const ACTIVE = prod.quantity > 0
				const onPress = () => ACTIVE ? changeCount(prod).REMOVE() : changeCount(prod).PLUS()
				return <ButtonToggle margin={0} style={{ marginVertical: 5 }} onPress={onPress} active={ACTIVE} key={key} >
					{prod.name}
				</ButtonToggle>
			})}
		</View>
	)
}

const styles = StyleSheet.create({
	recomBox: {
		padding: 20
	}
})

export default BottomRecoms

