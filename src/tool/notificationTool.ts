import messaging, { firebase } from '@react-native-firebase/messaging'
import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'
import API from '../api/API'
import IS_IOS from '../vars/IS_IOS'
const defaultAppMessaging = firebase.messaging()

/** 
@class for set up notification and set up initial notification response from system mobile api
*/
class NotificationConfigTool {
	constructor() {
		this.initialize()
	}
	channel_id = 'liverpool'

	/** 
	set up initialize notification handler
	*/
	private initialize = async () => {
		if (!IS_IOS)
			await this.setAndroidChannel()
		defaultAppMessaging.onMessage((message) => {
			const body = message?.notification?.body || ''
			const title = message?.notification?.title || ''
			this.showNotification({ body, title })

		})
		await Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: true,
				shouldSetBadge: true,
			}),
		})
	}

	/** 
	method for display notification from open application
	*/
	private showNotification = async (data: Notifications.NotificationContentInput) => {
		// console.log(data)
		await Notifications.scheduleNotificationAsync({
			content: data,
			trigger: {
				seconds: 1,
				channelId: this.channel_id
			}
		})
	}

	/** 
	set android channel 
	*/
	private setAndroidChannel = async () => {
		await Notifications.setNotificationChannelAsync(this.channel_id, {
			name: this.channel_id,
			importance: Notifications.AndroidImportance.HIGH,
		})
	}

	/** 
	get push token (return string token from Promise)
	*/
	protected getPushToken = async (): Promise<string> => {
		if (IS_IOS) {
			const success = await this.requestPermission()
			if (!success) return ''
		}
		return await defaultAppMessaging.getToken()
	}

	/** 
	request permission for notification
	*/
	protected async requestPermission(): Promise<boolean> {
		const authStatus = await messaging().requestPermission()
		return (
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL
		)
	}
}

/** 
@class extended for use notification config from NotificationConfigTool (interface)
*/
class NotificationTool extends NotificationConfigTool {
	/** 
	update notification token to server and subscribe
	*/
	public update = async (): Promise<boolean> => {
		const notifications_token = await this.getPushToken()
		if (notifications_token) {
			// console.log(notifications_token, 'TOKEN PUSH', Platform.OS)
			await API.changeUser({ notifications_token })
			return true
		}
		return false
	}
	/** 
	unsubscribe to notification
	*/
	public remove = async () => {
		return await API.changeUser({ notifications_token: '' })
	}
}
export default new NotificationTool()