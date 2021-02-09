import React from 'react'
import TextLine from '../../components/TextLine'
export const CART_TITLE_HEIGHT = 40
const CartTitle = ({ children }: { children: string }) => <TextLine style={{ height: CART_TITLE_HEIGHT, padding: 3 }} size={20} >{children}</TextLine>

export default React.memo(CartTitle, (prev, next) => prev.children === next.children)

