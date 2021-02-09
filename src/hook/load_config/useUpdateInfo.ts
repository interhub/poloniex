import { TableInfoResponse } from './../../api/API';
import { useDispatch } from 'react-redux';
import API from '../../api/API';
import { setTableInfoAction } from '../../store/actions';
import { TableInfoItemType } from '../../type/types';
import useErrorString from "../state/useErrorString";

const convertDataObjectType = (data: TableInfoResponse): TableInfoItemType[] => {
    const table_info = Object.keys(data).map((key_value, key_index) => {
        return { ...data[key_value], name: key_value }
    })
    return table_info
}

const useUpdateInfo = () => {
    const { setError } = useErrorString()
    const dispatch = useDispatch()
    const updateTableInfo = async () => {
        try {
            const { data } = await API.getTableInfo()
            dispatch(setTableInfoAction(convertDataObjectType(data)))
            setError('')
        } catch (e) {
            console.log(e, 'request error')
            setError('Ошибка загрузки данных')
        }
    }
    return { updateTableInfo }
}

export default useUpdateInfo