import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useWindowDimensions } from 'react-native'
import { useMemo } from 'react'

/** 
@hook for get layout sizes and display padding
*/
const useSafeSize = () => {
	const screen = useWindowDimensions()
	const size = useSafeAreaInsets()
	const { bottom, top } = useMemo(() => size, [])
	const height = screen.height - (top + bottom)
	return { top, bottom, height }
}

export default useSafeSize