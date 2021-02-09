import { SCREEN_NAME } from './../vars/SCREEN_NAME'
import { NavigationContainerRef } from '@react-navigation/native'
import React from 'react'

/** 
navigation ref for change navigation state without navigation context and without react components
*/
const navigationRef = React.createRef<NavigationContainerRef>()

/** 
call logout (for 403 error)
*/
export const logOutNavigation = () => navigationRef.current?.reset({ routes: [{ name: SCREEN_NAME.LOGIN }] })
export default navigationRef 
