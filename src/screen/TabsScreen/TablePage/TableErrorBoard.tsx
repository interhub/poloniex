import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import TextLine from '../../../components/TextLine';
import useErrorString from '../../../hook/state/useErrorString';
import { COLOR } from '../../../vars/COLOR';

const TableErrorBoard = () => {
    const { error, height } = useAimateErrorBox()
    return (
        <Animated.View style={[styles.board, { height }]}>
            <TextLine center>{error}</TextLine>
        </Animated.View>
    );
}

const useAimateErrorBox = () => {
    const { error } = useErrorString()
    const board_size = {
        show: 100,
        hide: 0
    }
    const height = useRef(new Animated.Value(board_size.hide)).current
    useEffect(() => {
        Animated.timing(height, { toValue: !!error ? board_size.show : board_size.hide, useNativeDriver: false }).start()
    }, [error])
    return { height, error }
}

const styles = StyleSheet.create({
    board: {
        width: '100%',
        justifyContent: 'flex-end',
        backgroundColor: COLOR.ERROR
    },
});

export default TableErrorBoard

