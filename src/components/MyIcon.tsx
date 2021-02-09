import React, { useEffect, useRef } from 'react'
import { Animated, ImageSourcePropType } from 'react-native'
import { isEqual } from '../config/isEqual'

const NAV_ICON_SIZE = 40

interface PropsIcon {
	source: ImageSourcePropType
	size?: number
	color?: string
	active?: boolean
}

const MyIcon = ({
	source, size = NAV_ICON_SIZE, color, active
}: PropsIcon) => {
	const scale = useRef(new Animated.Value(0)).current
	const animStyle = {
		transform: [{ scale }]
	}

	useEffect(() => {
		Animated.spring(scale, { toValue: active ? 1.1 : 1, useNativeDriver: true }).start()
	}, [active])

	return (
		<Animated.Image
			fadeDuration={0}
			resizeMode="contain"
			style={[
				{
					height: size,
					width: size,
					tintColor: color,
				},
				animStyle
			]}
			source={source} />
	)
}

export default React.memo(MyIcon, (prev, next) => {
	return isEqual(prev, next)
})
