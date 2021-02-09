import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DividerCustom from '../../../components/DividerCustom';
import { isEqual } from '../../../config/isEqual';
import { NAV_TYPE, TableInfoItemType } from '../../../type/types';
import { COLOR } from '../../../vars/COLOR';
import { SCREEN_NAME } from '../../../vars/SCREEN_NAME';
import TableBoxItem from './TableBoxItem';
import { TABLE_SIZE } from './TABLE_SIZE';

const TableRow = ({ item }: { item: TableInfoItemType }) => {

    const { navigate } = useNavigation<NAV_TYPE>()
    const goToChart = () => navigate(SCREEN_NAME.CHART_PAGE, { id: item?.id })

    return <>
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={goToChart} style={{ width: TABLE_SIZE.BOX_WIDTH, height: TABLE_SIZE.ROW_HEIGHT }} >
                <TableBoxItem color={COLOR.GREEN} bold value={item?.name} />
            </TouchableOpacity>
            <TableBoxItem isAnimate value={item?.last} />
            <TableBoxItem isAnimate value={item?.highestBid} />
            <TableBoxItem isAnimate value={item?.percentChange} />
        </View>
        <DividerCustom />
    </>
}

export default React.memo(TableRow, isEqual)

