import Constants from 'expo-constants';
import React from 'react';
import TextLine from '../../../components/TextLine';

const AboutFooter = () => {
    const VERSION = Constants.nativeAppVersion
    return (
        <TextLine size={15} style={{ marginVertical: 30 }} center >
            Версия: {VERSION}
        </TextLine>
    );
}

export default AboutFooter

