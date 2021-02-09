import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextLine from '../../../components/TextLine';
import openInBrowser from '../../../tool/openInBrowser';
import { COLOR } from '../../../vars/COLOR';

const AboutLink = () => {

    return (
        <TextLine color={COLOR.GRAY_LIGHT} onPress={() => openInBrowser('https://poloniex.com/')} size={15} style={{ marginVertical: 20, textDecorationLine: 'underline' }} center >
            https://poloniex.com/
        </TextLine>
    );
}


export default AboutLink

