import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { COLOR } from '../../vars/COLOR';

const LoadingPage = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} color={COLOR.GREEN} />
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

export default LoadingPage

