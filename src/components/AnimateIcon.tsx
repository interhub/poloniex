import React, { useEffect, useRef } from 'react'
import { Animated, ImageSourcePropType } from 'react-native'

const ICON_SIZE = 35

interface PropsIcon {
    source: ImageSourcePropType
    color?: string
    active: boolean
}

const AnimateIcon = (props: PropsIcon) => {
    const { source, color, active } = props
    const { animStyle } = useAnimateIconStyle(active)

    return (
        <Animated.Image
            fadeDuration={0}
            resizeMode="contain"
            style={[
                {
                    height: ICON_SIZE,
                    width: ICON_SIZE,
                    tintColor: color,
                },
                animStyle
            ]}
            source={source} />
    )
}

const useAnimateIconStyle = (active: boolean) => {
    const scale = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.spring(scale, { toValue: active ? 1.1 : 1, useNativeDriver: true }).start()
    }, [active])

    const animStyle = {
        transform: [{ scale }]
    }

    return { animStyle }
}

export default React.memo(AnimateIcon)
