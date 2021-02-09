import React from 'react';
import { View } from 'react-native';
import TextLine from '../../../components/TextLine';
import TableBoxItem from './TableBoxItem';
import TABLE_CETEGORIES from './TABLE_CETEGORIES';


const TableHeader = () => {
    return <View style={{ flexDirection: 'row' }} >
        {TABLE_CETEGORIES.map((value, key) => {
            return <TableBoxItem value={value} key={key} />
        })}
    </View >
}



export default TableHeader

