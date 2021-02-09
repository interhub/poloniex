import React from 'react'
import { Button } from 'react-native-paper'
import { COLOR } from '../vars/COLOR'
import TextLine from './TextLine'

//@ts-ignore
interface ButtonOrangePropsType extends React.ComponentPropsWithoutRef<typeof Button> {
    disabled?: boolean,
    mode?: 'outlined' | 'contained' | 'text',
    loading?: boolean,
    onPress?: () => void,
    icon?: () => JSX.Element,
    bold?: boolean,
    color?: string,
    labaelColor?: string
    children: string | JSX.Element | undefined | any
    accessibilityComponentType?: any
    accessibilityTraits?: any
}


const ButtonCustom = ({
	children = '', bold = true, labaelColor = COLOR.BLACK_LIGHT, disabled = false, mode = 'contained', loading = false, uppercase = false, onPress, icon, color = COLOR.YELLOW, style = {}, ...props
}: ButtonOrangePropsType) => {
	return (
		<Button
			accessibilityComponentType
			accessibilityTraits
			onPress={() => {
				if (!disabled && onPress) onPress()
			}}
			loading={loading}
			mode={mode}
			contentStyle={{ height: '100%' }}
			disabled={false}
			uppercase={uppercase}
			compact
			icon={icon}
			style={[{
				elevation: 1,
				width: '100%',
				height: 55,
				borderRadius: 10,
				borderWidth: mode === 'outlined' ? 1 : 0,
				borderColor: mode === 'outlined' ? COLOR.GRAY : '#fff',
			}, (disabled ? {
				borderColor: COLOR.GRAY,
				backgroundColor: COLOR.GRAY
			} : {}), style]}
			color={color}
			{...props}
		>
			{!loading ? <TextLine style={[props.labelStyle]} bold={bold} size={18} color={labaelColor}>{children}</TextLine> : ''}
		</Button>)
}

export default React.memo(ButtonCustom)