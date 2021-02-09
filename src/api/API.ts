import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import useLoadingPromise from '../hook/state/useLoadingPromise'
import { TableInfoItemType } from '../type/types'
import { LOCATION } from '../vars/LOCATION'


type TableInfoResponse = {
	[T in string]: TableInfoItemType
}
class ToolsAPI {
	constructor() {
		this.server.interceptors.request.use((req: AxiosRequestConfig) => {
			//TODO ADD SERVER REQUEST AGREGATE
			return req
		})
		this.server.interceptors.response.use((res: AxiosResponse) => {
			//TODO ADD SERVER RESPONSE AGREGATE
			return res
		})
	}

	protected server = axios.create({
		baseURL: LOCATION.POLONIEX_API,
	})

	public setLocation(loc: string) {
		this.server.defaults.baseURL = loc
	}

}
class API extends ToolsAPI {
	getTableInfo = async (): Promise<AxiosResponse<TableInfoResponse>> => await useLoadingPromise(this.server.get(`public?command=returnTicker`))
}

export default new API()
