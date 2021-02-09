import React, { useEffect, useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { PortalModalTotal } from '../../components/PortalModals'
import { CartHeader } from '../../components/HeadersBlack'
import { useSelectorMemoHook } from '../../hook/state/useSelectorStateHook'
import selector from '../../selector/selector'
import { ProductType } from '../../type/types'
import CartEmpty from './CartEmpty'
import CartFooter from './CartFooter'
import CartItem, { CART_ITEM_HEIGHT } from './CartItem'
import CartTitle, { CART_TITLE_HEIGHT } from './CartTitle'
import { COLOR } from '../../vars/COLOR'

const CartPage = () => {
	const scrollRef = useRef<FlatList | null>(null)
	const cart = useSelectorMemoHook(selector.cart)

	useEffect(() => {
		scrollToEnd()
	}, [])

	const scrollToEnd = () => {
		setTimeout(() => {
			scrollRef.current?.scrollToOffset({ offset: cart.length * CART_ITEM_HEIGHT, animated: true })
		}, 100)
	}

	const IS_EMPTY = !cart.length

	return (
		<View style={styles.container}>
			<CartHeader />
			{!IS_EMPTY &&
				<>
					<FlatList
						style={{ flex: 1, padding: 13 }}
						ref={scrollRef}
						data={cart}
						keyExtractor={({ index: product_index }, index) => product_index.toString()}
						ListHeaderComponent={() => <CartTitle>Заказ</CartTitle>}
						renderItem={({ item: product, index }: { item: ProductType, index: number }) => {
							return <CartItem product={product} />
						}}
						getItemLayout={(item, index) => ({ index, length: CART_ITEM_HEIGHT, offset: index * CART_ITEM_HEIGHT + CART_TITLE_HEIGHT })}
						ListFooterComponent={CartFooter}
						removeClippedSubviews={false}
						initialNumToRender={cart.length}
						showsVerticalScrollIndicator={false} />
					<PortalModalTotal />
				</>}
			{IS_EMPTY && <CartEmpty />}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLOR.WHITE
	},

})

export default CartPage
