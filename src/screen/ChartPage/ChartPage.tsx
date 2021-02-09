import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderBackIcons } from '../../components/BackIcon';
import ScrollViewContainer from '../../components/ScrollViewContainer';
import TextLine from '../../components/TextLine';
import selector from '../../selector/selector';
import { ROUTE_TYPE } from '../../type/types';
import { COLOR } from '../../vars/COLOR';
import { SCREEN_NAME } from '../../vars/SCREEN_NAME';
import TABLE_CETEGORIES from '../TabsScreen/TablePage/TABLE_CETEGORIES';

const ChartPage = () => {
    const { params: { id } } = useRoute<ROUTE_TYPE<SCREEN_NAME.CHART_PAGE>>()
    const item = useSelector(selector.currencyById(id))

    if (!id || !item) return null

    return (
        <ScrollViewContainer>
            <View style={{ padding: 10 }} >
                <HeaderBackIcons />
                <TitleRowItem property={'Параметры'} />
                <TitleRowItem property={TABLE_CETEGORIES[0]} value={item.name} />
                <TitleRowItem property={TABLE_CETEGORIES[1]} value={item.last} />
                <TitleRowItem property={TABLE_CETEGORIES[2]} value={item.highestBid} />
                <TitleRowItem property={TABLE_CETEGORIES[3]} value={item.percentChange} />
            </View>
        </ScrollViewContainer>
    );
}

const TitleRowItem = ({ property = '', value = '' }: { property: string, value?: string }) => {
    return <View style={{ marginVertical: 20 }} >
        <TextLine size={20} >
            {property}
        </TextLine>
        <TextLine bold size={20} color={COLOR.GREEN} >
            {value}
        </TextLine>
    </View>
}


export default ChartPage

