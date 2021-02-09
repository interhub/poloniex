import { Alert } from 'react-native'

const TIMEOUT = 1000

/** 
alert display message
*/
export default ((message = '', title = '') => {
	let ready = true
	return (message = '', title = '') => {
		if (!ready) return
		ready = false
		setTimeout(() => {
			ready = true
		}, TIMEOUT)

		Alert.alert(title, message, [{ text: 'OK', onPress: () => console.log('OK') }], { cancelable: false })
	}
})()
