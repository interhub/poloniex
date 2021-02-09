import * as SplashScreen from 'expo-splash-screen'
import { useLayoutEffect, useState } from 'react'
import useCodePush from './useCodePush'
import useFontLoad from './useFontLoad'
import useUpdateInfo from './useUpdateInfo'


SplashScreen.preventAutoHideAsync()

/**
 * @hook important hook for initialize user store state from server
 */
export default () => {
	const [isLoaded, setIsLoaded] = useState(false)

	const { syncCodePush } = useCodePush()
	const { loadFont } = useFontLoad()
	const { startUpdates } = useUpdateInfo()

	const loadAppResource = async () => {
		try {
			await syncCodePush()
			loadFont()
		} catch (e) {
			console.warn(e, 'ERR LOAD RESOURCE AND SPASH')
		} finally {
			setIsLoaded(true)
			SplashScreen.hideAsync()
			startUpdates()
		}
	}

	useLayoutEffect(() => {
		loadAppResource()
	}, [])

	return {
		isLoaded,
	}
}
