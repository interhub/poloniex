import { GoogleSignin } from '@react-native-community/google-signin'
import auth from '@react-native-firebase/auth'
import axios from 'axios'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import API from '../api/API'
import formatPhone from './formatPhone'

class SignInSocialConfigureTool {
	constructor() {
		GoogleSignin.configure({
			webClientId: '435676661434-vot9fa83g4g3stkgt2vdg5t4upk5r2r4.apps.googleusercontent.com',
			scopes: [
				'https://www.googleapis.com/auth/userinfo.profile', //PROFILE INFO CHECK
			],
		})
	}

}

/** 
class for use auth signIn mobile api SDK
*/
class SignInSocialTool extends SignInSocialConfigureTool {
	/** 
	google login with Firebase and GoogleSignIn SDK
	*/
	loginGoogle = async (): Promise<boolean> => {
		const { idToken } = await GoogleSignin.signIn()
		const googleCredential = auth.GoogleAuthProvider.credential(idToken, 'kpN1Cqe_xYjC1L01o67SUTMV')
		const userInfo = await auth().signInWithCredential(googleCredential)
		const email = userInfo?.user?.email || ''
		const displayName = userInfo?.user.displayName || ''
		const phone_number = userInfo?.user?.providerData[0]?.phoneNumber || ''
		const { data: { success } } = await API.authSocial({ date_of_birth: '', email, name: displayName, phone_number: formatPhone.SHORT(phone_number) })
		await GoogleSignin.signOut()
		return success

	}

	/** 
	Facebook login without firebase (not worked ?)
	use Facebook API (auth) and Facebook SDK
	*/
	loginFacebook = async (): Promise<boolean> => {
		const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
		if (result.isCancelled) return false
		const data = await AccessToken.getCurrentAccessToken()
		if (!data) return false
		const accessToken = data.accessToken
		const profileFields = ['email', 'first_name', 'last_name', 'gender', 'picture', 'birthday']
		const res = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}&fields=${profileFields.join(',')}`)
		const name = `${res.data?.first_name} ${res.data?.last_name}`
		const date_of_birth = res?.data?.birthday || ''
		const email = res?.data?.email || ''
		const { data: { success } } = await API.authSocial({ date_of_birth, email, name, phone_number: '' })
		return success
	}
}

export default new SignInSocialTool()