import React from 'react'
import { Text } from 'react-native'
import { FONT_NAME } from '../font/FONT_NAME'
import { COLOR } from '../vars/COLOR'
export interface TextLinePropsType extends React.ComponentPropsWithoutRef<typeof Text> {
	children: string | JSX.Element | any,
	color?: string,
	size?: number,
	bold?: boolean,
	tint?: boolean,
	center?: boolean,
}

const TextLine = (props: TextLinePropsType) => {

	const textStyle = getTextStyleByProp(props)

	return (<Text
		{...props}
		style={textStyle}>
		{props.children}
	</Text>)
}

const getTextStyleByProp = ({ color = COLOR.WHITE, size = 18, center = false, bold = false, tint = false, ...props }: TextLinePropsType): TextLinePropsType['style'] => {
	return [{
		color,
		fontSize: size,
		textAlign: center ? 'center' : 'left',
		fontFamily: bold ? FONT_NAME.BOLD : (tint ? FONT_NAME.TINT : FONT_NAME.NORM),
	},
	props.style]
}

export default React.memo(TextLine)
