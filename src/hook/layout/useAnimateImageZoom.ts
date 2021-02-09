import { useEffect, useRef } from 'react'
import { Animated } from 'react-native'

/** 
animate zoom image Animated hook from native react native
*/
const useAnimateImageZoom = () => {
    const pos_state = { start: 1.1, end: 1 }
    const duration = 10000
    const scale = useRef(new Animated.Value(pos_state.start)).current
    useEffect(() => {
        const loop = () => Animated.sequence([
            Animated.timing(scale, { toValue: pos_state.end, useNativeDriver: true, duration }),
            Animated.timing(scale, { toValue: pos_state.start, useNativeDriver: true, duration }),
        ]).start(loop)
        loop()
    }, [])
    return {
        transform: [{ scale }]
    }
}
export default useAnimateImageZoom