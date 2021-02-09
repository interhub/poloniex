import * as Linking from 'expo-linking'
import Message from '../components/Message'

/** 
open links in browser or deep linked links
*/
export default (url: string) => {
	if (!url)
		return Message('Пустая ссылка')
	if (!Linking.canOpenURL(url))
		return Message('Не получается открыть ссылку')
	Linking.openURL(url)
}