import React from 'react'
import { ScrollView } from 'react-native'
import useSafeSize from '../hook/layout/useSafeSize'
import { COLOR } from '../vars/COLOR'

interface ScrollViewContainerProps extends React.ComponentPropsWithoutRef<typeof ScrollView> { children: any }

const ScrollViewContainer = ({ children = null, ...props }: ScrollViewContainerProps) => {
	const { bottom, top, height } = useSafeSize()
	return (
		<ScrollView
			keyboardShouldPersistTaps={'handled'}
			showsVerticalScrollIndicator={false}
			{...props}
			contentContainerStyle={[{ minHeight: height, padding: 20, paddingTop: top }, props.style]}  >
			{children}
		</ScrollView>
	)
}

export default ScrollViewContainer

