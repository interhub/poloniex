import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import TextLine from '../../../components/TextLine';
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
    return { backgroundColor: 'red' }
}

const styles = StyleSheet.create({
    tableBox: {
        width: TABLE_SIZE.BOX_WIDTH,
        height: TABLE_SIZE.ROW_HEIGHT,
        justifyContent: 'center',
        padding: 5
    }
})

export default TableBoxItem

