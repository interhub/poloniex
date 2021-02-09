import React from 'react';
import { View } from 'react-native';
import TextLine from '../../../components/TextLine';
import { TABLE_SIZE } from './TABLE_SIZE';

interface TableBoxItemProps extends React.ComponentPropsWithoutRef<typeof TextLine> {
    name?: string
}

const TableBoxItem = ({ name = '', ...props }: TableBoxItemProps) => {
    return <View style={{ width: TABLE_SIZE.BOX_WIDTH, height: TABLE_SIZE.ROW_HEIGHT }} >
        <TextLine numberOfLines={1} center {...props} >{name}</TextLine>
    </View>
}

export default TableBoxItem

