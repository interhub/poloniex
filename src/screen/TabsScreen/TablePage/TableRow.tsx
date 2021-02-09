import React from 'react';
import { View } from 'react-native';
import { isEqual } from '../../../config/isEqual';
import { TableInfoItemType } from '../../../type/types';
import { COLOR } from '../../../vars/COLOR';
import TableBoxItem from './TableBoxItem';
import { TABLE_SIZE } from './TABLE_SIZE';

const TableRow = ({ item }: { item: TableInfoItemType }) => {
    console.log('update item', item?.name)
    return <View style={{}}>
        <View style={{ width: TABLE_SIZE.BOX_WIDTH, height: TABLE_SIZE.ROW_HEIGHT, backgroundColor: COLOR.GRAY_LIGHT }} >
            <TableBoxItem center={false} style={{ marginLeft: 5 }} name={item?.name} />
        </View>
    </View>
}

export default React.memo(TableRow, isEqual)

