import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import ImageHoc from '../../../components/ImageHoc';
import ScrollViewContainer from '../../../components/ScrollViewContainer';
import TextLine from '../../../components/TextLine';
import { COLOR } from '../../../vars/COLOR';
import SIZE from '../../../vars/SIZE';
import AboutFooter from './AboutFooter';
import AboutImage from './AboutImage';
import about_info from './about_info';

const AboutPage = () => {
    return (
        <ScrollViewContainer >
            <View style={styles.container}>
                <TextLine size={30} >
                    Ваш универсальный магазин для
                    </TextLine>
                <TextLine size={40} bold color={COLOR.GREEN}>
                    криптоторгов
                </TextLine>
                <TextLine bold style={{ marginVertical: 20 }} >
                    Торгуйте Bitcoin, Ethereum, USDT и лучшими альткоинами на легендарной криптовалютной бирже.
                </TextLine>
                {about_info.map((text, key) => {
                    return <TextLine key={key} style={{ marginVertical: 20 }} >
                        {text}
                    </TextLine>
                })}
                <AboutFooter />
                <AboutImage />
            </View>
        </ScrollViewContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: SIZE.height,
        padding: 10
    },
});

export default AboutPage

