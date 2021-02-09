import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import useAnimateImageZoom from '../../../hook/layout/useAnimateImageZoom';

const IMG_SIZE = 150
const AboutImage = () => {
    const imgAnimateStyle = useAnimateImageZoom()
    return <View style={{ height: IMG_SIZE, overflow: 'hidden' }} >
        <Animated.Image style={[{ width: '100%', height: IMG_SIZE }, imgAnimateStyle]} source={{ uri: 'https://fxzone.ru/wp-content/uploads/poloniex-otzyvy.png' }} />
    </View>
}

export default AboutImage

