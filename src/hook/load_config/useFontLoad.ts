import { FONT_NAME } from '../../font/FONT_NAME'
import { loadAsync } from 'expo-font'

/** 
@hook load font recource local 
*/
const useFontLoad = () => {
	const loadFont = async () => {
		await loadAsync({
			[FONT_NAME.NORM]: require('../../font/ProximaNova-Semibold.ttf'),
			[FONT_NAME.BOLD]: require('../../font/ProximaNova-Extrabld.ttf'),
			[FONT_NAME.TINT]: require('../../font/ProximaNova-Light.ttf'),
		})
	}
	return { loadFont }
}
export default useFontLoad