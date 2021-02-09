import { NavigationContainerRef } from '@react-navigation/native'
import React from 'react'

/** 
navigation ref for change navigation state without navigation context and without react components
*/
const navigationRef = React.createRef<NavigationContainerRef>()

export default navigationRef 
