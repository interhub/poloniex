import { LayoutAnimation } from 'react-native'

/** 
call layout animation with change state for flexbox maket 
*/
export default (preset = LayoutAnimation.Presets.easeInEaseOut) => LayoutAnimation.configureNext(preset)