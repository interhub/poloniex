import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AboutPage = () => {
    return (
        <View style={styles.container}>
            <Text>AboutPage</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AboutPage

