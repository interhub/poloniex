import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import ScrollViewContainer from '../../../components/ScrollViewContainer';
import TextLine from '../../../components/TextLine';
import useUpdateInfo from '../../../hook/load_config/useUpdateInfo';
import { useSelectorProp } from '../../../hook/state/useSelectorProp';
import { COLOR } from '../../../vars/COLOR';
import { SCREEN_NAME } from '../../../vars/SCREEN_NAME';
import SIZE from '../../../vars/SIZE';
import TableBoxItem from './TableBoxItem';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import { TABLE_SIZE } from './TABLE_SIZE';


const TablePage = () => {

    const { table_info } = useSelectorProp('table_info')
    const RENDER_NUMS = Math.ceil(SIZE.height / TABLE_SIZE.ROW_HEIGHT) || 15
    const { updateTableInfo } = useUpdateInfo()

    return (
        <View style={styles.container}>
            <ScrollViewContainer
                bounces={false}
                horizontal>
                <View>
                    <TableHeader />
                    <FlatList
                        refreshControl={<RefreshControl colors={[COLOR.GREEN]} refreshing={false} onRefresh={updateTableInfo} />}
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
        </View>
    );
}

// <ButtonCustom onPress={goToChart}>
//                             Go to CHART
//                         </ButtonCustom>


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TablePage

