import React from 'react'
import { Text } from 'react-native'
import { shallowEqual } from 'react-redux'
import { isEqual } from '../config/isEqual'
import { FONT_NAME } from '../font/FONT_NAME'
import { COLOR } from '../vars/COLOR'

interface TextLinePropsType extends React.ComponentPropsWithoutRef<typeof Text> {
	children: string | JSX.Element | any,
	color?: string,
	size?: number,
	bold?: boolean,
	tint?: boolean,
	center?: boolean,
}

const TextLine = ({ children, tint, color = COLOR.BLACK_LIGHT, size = 18, bold = false, center, ...props }: TextLinePropsType) => {
	return (<Text
		{...props}
		style={[ {
			color,
			fontSize: size,
			textAlign: center ? 'center' : 'left',
			fontFamily: bold ? FONT_NAME.BOLD : (tint ? FONT_NAME.TINT : FONT_NAME.NORM),
		},props.style,]}
	>
		{children}
	</Text>)
}

export default React.memo(TextLine, shallowEqual)
