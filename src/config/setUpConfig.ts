import { enableScreens } from 'react-native-screens';
import { LogBox, Platform, UIManager } from 'react-native'

export default () => {
    enableScreens()

    LogBox.ignoreLogs([
        'Non-serializable values',
        '_reactNativeCodePush.default.sync',
    ])

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    }
} 