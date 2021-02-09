import { Action } from '@reduxjs/toolkit'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import useLoadingPromise from '../hook/state/useLoadingPromise'
import state from '../store/state'
import { store } from '../store/store'
import formatPhone from '../tool/formatPhone'
import locationTool from '../tool/locationTool'
import notificationTool from '../tool/notificationTool'
import LOCATION from '../vars/LOCATION'
import { logOutNavigation } from './../config/navigateRef'
import { setErrorStringAction, setHistoryAction, setLoadingAction, setMenuAction, setSalesAction, setTokenAction, setUserAction } from './../store/actions'
import { HistoryOrderType, MenuType, SaleActionType, TokenType, UserType } from './../type/types'

export type ResType<T = {}> = {
	success: boolean
	error_message: string
} & T

export type AuthDataType = ResType<{
	token: TokenType
	user: UserType
	menu: MenuType
	history: HistoryOrderType[]
	promotions: SaleActionType[]
}>

export type ChangeUserInfoType = {
	name?: string
	phone_number?: string
	email?: string
	date_of_birth?: string
	notifications_token?: string
	verification_code?: string
}

class ToolsAPI {
	constructor() {
		this.server.interceptors.request.use((req: AxiosRequestConfig) => {
			if (req?.data?.phone_number) {
				req.data.phone_number = formatPhone?.SHORT(req.data.phone_number)
			}
			return req
		})
		this.server.interceptors.response.use(
			(res: AxiosResponse) => {
				//use 403 error response interceptor
				return res
			},
			(err) => {
				if (err.toString().includes('403')) {
					logOutNavigation()
					store.dispatch(setTokenAction(''))
					store.dispatch(setUserAction(state.user))
				}
			}
		)
	}
	// SETTING API TOOLS
	protected dispatch(action: Action) {
		store.dispatch<Action>(action)
	}
	protected getHeaderWithToken(): { headers: { Authorization: TokenType } } {
		return { headers: { Authorization: `Bearer ${this.getUserToken()}` } }
	}
	private getUserToken(): TokenType {
		return store.getState().token
	}
	protected server = axios.create({
		baseURL: LOCATION,
	})
	public setLocation(loc: string) {
		this.server.defaults.baseURL = loc
	}
	protected setErrorDisplay(err: string) {
		this.dispatch(setErrorStringAction(err))
	}
	/** 
	method await 2 second before update some
	*/
	private async sleep() {
		return await new Promise((ok) => setTimeout(ok, 2000))
	}
	/** 
	update all user date for auth start app or every app open
	*/
	protected async useAllUserDataUpdate(data: AuthDataType) {
		if (data.success) {
			this.dispatch(setMenuAction(data.menu))
			this.dispatch(setUserAction(data.user))
			this.dispatch(setTokenAction(data.token))
			this.dispatch(setSalesAction(data.promotions))
			this.dispatch(setHistoryAction(data.history))
			await this.sleep()
			await notificationTool.update()
		} else {
			this.setErrorDisplay(data.error_message)
		}
	}
	onLoadHandler = (state: boolean) => {
		this.dispatch(setLoadingAction(state))
	}
}

class API extends ToolsAPI {
	getSms = async ({ phone_number }: { phone_number: string }): Promise<AxiosResponse<ResType<{ menu?: MenuType }>>> => {
		return await this.server.post<ResType>('/api/auth/sms', { phone_number })
	}

	authPhone = async ({ code, phone_number }: { phone_number: string; code: string }): Promise<AxiosResponse<AuthDataType>> => {
		const res = await useLoadingPromise(this.server.post<AuthDataType>('/api/auth', { phone_number, verification_code: code }))
		this.useAllUserDataUpdate(res.data)
		return res
	}

	authSocial = async (user: { name: string; email: string; phone_number: string; date_of_birth: string }): Promise<AxiosResponse<AuthDataType>> => {
		const res = await this.server.post<AuthDataType>('/api/auth/social', user)
		this.useAllUserDataUpdate(res.data)
		return res
	}
	registration = async ({ name, email, phone_number, code }: { name: string; email: string; phone_number: string; code: string }): Promise<AxiosResponse<AuthDataType>> => {
		const res = await useLoadingPromise(this.server.post<AuthDataType>('/api/users', { phone_number, verification_code: code, email, name }))
		this.useAllUserDataUpdate(res.data)
		return res
	}
	getAllInfo = async (): Promise<AxiosResponse<AuthDataType>> => {
		const res = await useLoadingPromise(this.server.get<AuthDataType>('/api/data', this.getHeaderWithToken()))
		this.useAllUserDataUpdate(res.data)
		return res
	}
	checkUserExist = async ({ phone_number }: { phone_number: string }): Promise<AxiosResponse<ResType<{ user_exists?: boolean }>>> => {
		return await useLoadingPromise(this.server.get<ResType<{ user_exists?: boolean }>>(`/api/users/${formatPhone.SHORT(phone_number)}`))
	}

	getMenuSet = async (): Promise<AxiosResponse<ResType<{ menu?: MenuType }>>> => {
		const res = await this.server.get<ResType<{ menu?: MenuType }>>('/api/products') //, this.getHeaderWithToken())
		const { data: { menu } } = res
		if (menu)
			this.dispatch(setMenuAction(menu))
		return res
	}

	getSalesSet = async () => {
		const res = await this.server.get<ResType<{ promotions?: SaleActionType[] }>>('/api/promotions') //, this.getHeaderWithToken())
		const { data: { promotions = [] } } = res
		if (promotions)
			this.dispatch(setSalesAction(promotions))
		return res
	}

	changeProductServer = async ({ id, modification_id, quantity }: { id: number; modification_id: number; quantity: number }): Promise<AxiosResponse<ResType<{ total_amount?: number }>>> => {
		return await this.server.put<ResType<{ total_amount?: number }>>(`/api/products/${id}/${modification_id}`, { quantity }, this.getHeaderWithToken())
	}
	removeProductServer = async ({ id, modification_id }: { id: number; modification_id: number; quantity: number }): Promise<AxiosResponse<ResType<{ total_amount?: number }>>> => {
		return await this.server.delete<ResType<{ total_amount?: number }>>(`/api/products/${id}/${modification_id}`, this.getHeaderWithToken())
	}
	removeAllCart = async () => {
		return await this.server.delete<ResType<{ total_amount?: number }>>('/api/products', this.getHeaderWithToken())
	}

	changeUser = async (info: ChangeUserInfoType): Promise<AxiosResponse<ResType>> => {
		const res = await useLoadingPromise(this.server.put<ResType>('/api/users', info, this.getHeaderWithToken()))
		if (!res?.data?.success)
			this.setErrorDisplay(res?.data.error_message)
		return res
	}

	payRequest = async (): Promise<AxiosResponse<ResType<{ payment_url?: string }>>> => {
		const { order_info, address } = store.getState()
		return await useLoadingPromise(this.server.post<ResType<{ payment_url?: string }>>('/api/orders', { order_info, address, }, this.getHeaderWithToken()))
	}

	cancelOrder = async ({ id }: { id: number }) => {
		const res = await useLoadingPromise(this.server.delete<ResType<{ history: HistoryOrderType[] }>>(`/api/orders/${id}`, this.getHeaderWithToken()))
		if (res?.data?.history)
			this.dispatch(setHistoryAction(res.data.history))
		return res
	}
}

export default new API()
