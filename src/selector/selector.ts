import { StateType } from './../type/types';
import { createSelector } from '@reduxjs/toolkit'

const selector = {
    currencyById: (id: number) => {
        const getTableInfo = ({ table_info = [] }: StateType) => table_info
        return createSelector(
            getTableInfo,
            (table_info) => table_info.find((info) => info.id === id)
        )
    }
}
export default selector