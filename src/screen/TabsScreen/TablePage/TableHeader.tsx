import React from 'react';
import { View } from 'react-native';
import TableBoxItem from './TableBoxItem';
import TABLE_CETEGORIES from './TABLE_CETEGORIES';


const TableHeader = () => {
    return <View style={{ flexDirection: 'row' }} >
        {TABLE_CETEGORIES.map((name, key) => {
            return <TableBoxItem name={name} key={key} />
        })}
    </View >
}



export default TableHeader

