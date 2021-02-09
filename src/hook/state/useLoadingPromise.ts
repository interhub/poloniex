import { setLoadingAction } from '../../store/actions'
import { store } from '../../store/store'

const setLoadingState = (state: boolean) => store.dispatch(setLoadingAction(state))

const useLoadingPromise = async <T = {}>(promise: Promise<T>): Promise<T> => {
    setLoadingState(true)
    const result = await promise
    setLoadingState(false)
    return result
}

export default useLoadingPromise