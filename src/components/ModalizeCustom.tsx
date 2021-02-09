import React, { MutableRefObject } from 'react'
import { Keyboard } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-paper'
import { COLOR } from '../vars/COLOR'

interface ModalizeCustomProps extends React.ComponentPropsWithoutRef<typeof Modalize> {
    ref: MutableRefObject<Modalize | null>
}

const ModalizeCustom = React.forwardRef<Modalize, ModalizeCustomProps>((props, ref) => {
	return <Portal>
		<Modalize
			openAnimationConfig={{ timing: { duration: 500 } }}
			closeAnimationConfig={{ timing: { duration: 500 } }}
			adjustToContentHeight
			{...props}
			onOpen={() => { Keyboard.dismiss(); if (props.onOpen) { props.onOpen() } }}
			modalStyle={[{ backgroundColor: COLOR.WHITE }, props.modalStyle]}
			ref={ref}
		/>
	</Portal>
})

export default ModalizeCustom

