import { LogBox, Platform, UIManager } from 'react-native'

export default () => {
    LogBox.ignoreLogs([
        'Native splash screen is already hidden',
        'Non-serializable values',
        '_reactNativeCodePush.default.sync',
        'moment.updateLocale',
        'Require cycle: src/api/API.ts ->',
    ])

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
    }
} 