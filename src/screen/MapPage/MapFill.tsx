import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import MapView, { Polygon } from 'react-native-maps'
import ImageHoc from '../../components/ImageHoc'
import useLoading from '../../hook/state/useLoading'
import { useSelectorStringHook } from '../../hook/state/useSelectorStateHook'
import locationTool, { LocationType } from '../../tool/locationTool'
import { Cityes } from '../../vars/CITYES'
import { COLOR } from '../../vars/COLOR'
import MapFindBtn from './MapFindBtn'

const LINE_WIDTH = 3

const MapFill = () => {
	const { location: storeLocation } = useSelectorStringHook('location')
	const { address } = useSelectorStringHook('address')

	const { loading } = useLoading()
	const mapRef = useRef<MapView | null>(null)

	const onRegionChangeComplete = (loc: LocationType) => {
		locationTool.setLocationFullState(loc)
	}

	const goToLocation = (loc: LocationType) => {
		mapRef.current?.animateToRegion(loc)
	}

	const setCurrentLocationStart = async () => {
		const user_location = await locationTool.findMe()
		goToLocation(user_location)
	}

	const isFocused = useIsFocused()

	useEffect(() => {
		if (!address) setCurrentLocationStart()
		else goToLocation(storeLocation)
	}, [isFocused])

	const cityZone = Cityes.map((city) => city.cityZoneCoordinates.map(({ latitude, longitude }) => ({ latitude, longitude })))
	const deliveryZone = Cityes.map((city) => city.deliveryZoneCoordinates.map(({ latitude, longitude }) => ({ latitude, longitude })))

	return (
		<>
			<MapView onRegionChangeComplete={onRegionChangeComplete} ref={mapRef} initialRegion={storeLocation} style={{ flex: 1 }}>
				{cityZone.map((zone, key) => {
					return <Polygon key={key} coordinates={zone} strokeWidth={LINE_WIDTH} strokeColor={COLOR.YELLOW} />
				})}
				{deliveryZone.map((zone, key) => {
					return <Polygon key={key} coordinates={zone} strokeWidth={LINE_WIDTH} strokeColor={COLOR.RED} />
				})}
			</MapView>
			<View pointerEvents={'none'} style={[StyleSheet.absoluteFillObject, { justifyContent: 'center', alignItems: 'center', zIndex: 100 }]}>
				{!loading && <ImageHoc source={require('../../img/icon/map_marker.png')} style={{ width: 30, height: 30 }} />}
				{loading && <ActivityIndicator color={COLOR.BLACK_LIGHT} size={'large'} />}
			</View>
			<MapFindBtn onPress={setCurrentLocationStart} />
		</>
	)
}

export default MapFill
