import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ScrollViewContainer from '../../../components/ScrollViewContainer';
import TextLine from '../../../components/TextLine';
import { useSelectorProp } from '../../../hook/state/useSelectorProp';
import { SCREEN_NAME } from '../../../vars/SCREEN_NAME';
import SIZE from '../../../vars/SIZE';
import TableBoxItem from './TableBoxItem';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { TABLE_SIZE } from './TABLE_SIZE';


const TablePage = () => {
    const { navigate } = useNavigation()
    const goToChart = () => navigate(SCREEN_NAME.CHART_PAGE)
    const { table_info } = useSelectorProp('table_info')
    const RENDER_NUMS = Math.ceil(SIZE.height / TABLE_SIZE.ROW_HEIGHT) || 15
    console.log(RENDER_NUMS)
    return (
        <View style={styles.container}>
            <ScrollViewContainer bounces={false} horizontal>
                <View>
                    <TableHeader />
                    <FlatList
                        windowSize={RENDER_NUMS}
                        initialNumToRender={RENDER_NUMS}
                        data={table_info}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return <TableRow item={item} />
                        }}
                    />
                </View>
            </ScrollViewContainer>
            {/*         <ButtonCustom onPress={goToChart}>
                            Go to CHART
                        </ButtonCustom> */}
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

