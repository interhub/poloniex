import React, { MutableRefObject } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Modalize } from 'react-native-modalize'
import API from '../../../api/API'
import ButtonToggle from '../../../components/ButtonToggle'
import ModalizeCustom from '../../../components/ModalizeCustom'
import TextLine from '../../../components/TextLine'
import useLoading from '../../../hook/state/useLoading'
import useSafeSize from '../../../hook/layout/useSafeSize'
import { COLOR } from '../../../vars/COLOR'

interface HistoryCancelModalProps {
    modalRef: MutableRefObject<Modalize | null>,
    id: number
}

const HistoryCancelModal = ({ modalRef, id }: HistoryCancelModalProps) => {
    const setClose = () => modalRef.current?.close()
    const { bottom } = useSafeSize()
    const { loading } = useLoading()

    const onCancelEndPress = async () => {
        await API.cancelOrder({ id })
        setClose()
    }

    return <ModalizeCustom ref={modalRef} >
        <View style={styles.modalBox} >
            <TextLine center bold style={{ margin: 10 }} >{'Вы уверены что хотите\nотменить заказ?'}</TextLine>
            <View style={[styles.row, { paddingBottom: bottom }]} >
                <ButtonToggle onPress={setClose} style={{ flex: 1, marginRight: 10 }} >
                    Отмена
                </ButtonToggle>
                <ButtonToggle onPress={onCancelEndPress} active style={{ flex: 1 }} >
                    {loading ? <ActivityIndicator color={COLOR.BLACK_LIGHT} /> : 'Да'}
                </ButtonToggle>
            </View>
        </View>
    </ModalizeCustom>
}


const styles = StyleSheet.create({
    modalBox: {
        padding: 20
    },
    row: {
        flexDirection: 'row',
    },

})

export default HistoryCancelModal