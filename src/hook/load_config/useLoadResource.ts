import * as SplashScreen from 'expo-splash-screen'
import { useLayoutEffect, useState } from 'react'
import API from '../../api/API'
import { useSelectorStringHook } from '../state/useSelectorStateHook'
import useCodePush from './useCodePush'
import useFontLoad from './useFontLoad'


SplashScreen.preventAutoHideAsync()

/**
 * @hook important hook for initialize user store async storage token and set current state and asset cache images
 */
export default () => {
	const [isLoaded, setIsLoaded] = useState(false)
	const { token } = useSelectorStringHook('token')

	const isAuth = !!token
	const { syncCodePush } = useCodePush()
	const { loadFont } = useFontLoad()
	const getApiRequest = async () => {
		if (isAuth)
			await API.getAllInfo()
		else {
			await Promise.all([
				API.getMenuSet(),
				API.getSalesSet()
			])
		}
	}
	const loadAppResource = async () => {
		try {
			await syncCodePush()
			await Promise.all([
				loadFont(),
				getApiRequest()
			])
		} catch (e) {
			console.warn(e, 'ERR LOAD RESOURCE AND SPASH')
		} finally {
			setIsLoaded(true)
			SplashScreen.hideAsync()
		}
	}

	useLayoutEffect(() => {
		loadAppResource()
	}, [])

	return {
		isLoaded,
		isAuth,
	}
}
