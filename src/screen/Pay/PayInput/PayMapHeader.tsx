import React, { useEffect, useRef } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import MapBoxSmall from '../../../components/MapBoxSmall'
import TextLine from '../../../components/TextLine'
import useOrder from '../../../hook/state/useOrder'
import { useSelectorStringHook } from '../../../hook/state/useSelectorStateHook'
import deliveryPriceTool from '../../../tool/deliveryPriceTool'
import APP_NAME from '../../../vars/APP_NAME'

const PayMapHeader = () => {
    const { order_info: { is_delivery, } } = useOrder()

    return (
        <View>
            {is_delivery && <MapBoxSmall />}
            {!is_delivery && <ShopLocationMap />}
        </View>
    )
}




const ShopLocationMap = () => {
    const MAP_BOX_HEIGHT = 210
    const RADIUS = 15

    const { location } = useSelectorStringHook('location')
    const markerRef = useRef<Marker>(null)

    const city = deliveryPriceTool.getNearestCityForUser(location)

    useEffect(() => {
        setTimeout(() => {
            markerRef.current?.showCallout()
        }, 1500)
    }, [])

    if (!city.shops.length) return null

    const shopLocation = city.shops[0]
    const shopAddress = city.shops[0].address

    return <View>
        <TextLine >
            Адрес самовывоза:
        </TextLine>
        <TextLine bold style={{ marginVertical: 10 }} >
            {shopAddress}
        </TextLine>
        <MapView initialRegion={{ ...location, ...shopLocation }} style={{ height: MAP_BOX_HEIGHT, borderRadius: RADIUS, marginBottom: 10 }} >
            <Marker ref={markerRef} coordinate={shopLocation} description={shopAddress} title={APP_NAME} />
        </MapView>
    </View>
}

export default PayMapHeader

