import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ButtonCustom from '../../../components/ButtonCustom';
import { SCREEN_NAME } from '../../../vars/SCREEN_NAME';

const TablePage = () => {
    const { navigate } = useNavigation()
    const goToChart = () => {
        navigate(SCREEN_NAME.CHART_PAGE)
    }
    return (
        <View style={styles.container}>
            <Text>TablePage</Text>
            <ButtonCustom onPress={goToChart}>
                Go to CHART
            </ButtonCustom>
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

export default TablePage

