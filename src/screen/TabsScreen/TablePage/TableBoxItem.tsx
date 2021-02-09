import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import TextLine from '../../../components/TextLine';
import { COLOR } from '../../../vars/COLOR';
import { TABLE_SIZE } from './TABLE_SIZE';

interface TableBoxItemProps extends React.ComponentPropsWithoutRef<typeof TextLine> {
    value?: string
    isAnimate?: boolean
}

const TableBoxItem = ({ value = '', isAnimate, ...props }: TableBoxItemProps) => {
    const animteBoxStyle = useAnimateBoxValues(value)

    return <Animated.View style={[styles.tableBox, (isAnimate && animteBoxStyle)]} >
        <TextLine numberOfLines={1} center {...props} >{value}</TextLine>
    </Animated.View>
}


const useAnimateBoxValues = (value: string) => {
    const animate_state = {
        start: 0,
        end: 10
    }
    const val = useRef(new Animated.Value(animate_state.start)).current
    const duration = 400
    const easing = Easing.sin
    const inputRange = Object.values(animate_state)
    const scale = val.interpolate({ inputRange, outputRange: [1, 1.01] })
    var backgroundColor = val.interpolate({
        inputRange,
        outputRange: [COLOR.NONE, COLOR.GREEN]
    });

    useEffect(() => {
        return () => {
            Animated.sequence([
                Animated.timing(val, { toValue: animate_state.end, useNativeDriver: false, duration, easing }),
                Animated.timing(val, { toValue: animate_state.start, useNativeDriver: false, duration, easing }),
            ]).start()
        }
    }, [value])

    return { transform: [{ scale }], backgroundColor }
}

const styles = StyleSheet.create({
    tableBox: {
        width: TABLE_SIZE.BOX_WIDTH,
        height: TABLE_SIZE.ROW_HEIGHT,
        justifyContent: 'center',
        padding: 5,
    }
})

export default TableBoxItem

