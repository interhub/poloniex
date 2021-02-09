import { useDispatch } from 'react-redux';
import API from '../../api/API';
import waitSleep from '../../config/waitSleep';
import { setTableInfoAction } from '../../store/actions';
import useErrorString from "../state/useErrorString";

const useUpdateInfo = () => {
    const { setError } = useErrorString()
    const dispatch = useDispatch()
    const updateTableInfo = async () => {
        try {
            const { data } = await API.getTableInfo()
            const table_info = Object.keys(data).map((key_value, key_index) => {
                return { ...data[key_value], name: key_value }
            })
            dispatch(setTableInfoAction(table_info))
            setError('')
        } catch (e) {
            console.log(e, 'request error')
            setError('Ошибка загрузки данных')
        }
    }
    return { updateTableInfo }
}

export default useUpdateInfo