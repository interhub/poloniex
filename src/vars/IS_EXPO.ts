import Constants from 'expo-constants'

/** 
constant use for check is expo application or bare application state (by doc from https://docs.expo.io/bare/exploring-bare-workflow/ )
*/
export default Constants.appOwnership === 'expo'