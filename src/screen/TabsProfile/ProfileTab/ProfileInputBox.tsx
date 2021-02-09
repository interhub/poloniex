import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import React, { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import { useDispatch } from 'react-redux'
import API, { ChangeUserInfoType } from '../../../api/API'
import ButtonCustom from '../../../components/ButtonCustom'
import TextInputCustom, { TextInputCustomProps } from '../../../components/TextInputCustom'
import useLoading from '../../../hook/state/useLoading'
import { useSelectorStringHook } from '../../../hook/state/useSelectorStateHook'
import { setUserAction } from '../../../store/actions'
import formatPhone from '../../../tool/formatPhone'
import validateTool from '../../../tool/validateTool'
import { NAV_TYPE } from '../../../type/types'
import { MASK } from '../../../vars/MASK'
import { SCREEN_NAME } from '../../../vars/SCREEN_NAME'


const ProfileInputBox = () => {
	const { navigate } = useNavigation<NAV_TYPE>()
	const { loading } = useLoading()
	const { user: { date_of_birth, email, name, phone_number }, user } = useSelectorStringHook('user')

	const dispatch = useDispatch()
	const { handleChange, values, submitForm } = useFormik({
		initialValues: {
			name,
			date_of_birth,
			email,
			phone_number: formatPhone.LONG(phone_number)
		}, onSubmit: (values) => {
			// console.log(values, 'values')
		}
	})

	const inputPropsData: TextInputCustomProps[] = [
		{ label: 'Имя', placeholder: 'Имя', value: values.name, onChangeText: handleChange('name') },
		{ label: 'Дата рождения', placeholder: 'Дата рождения', value: values.date_of_birth, onChangeText: handleChange('date_of_birth'), mask: MASK.DATE },
		{ label: 'Эл.почта', placeholder: 'Эл.почта', value: values.email, onChangeText: handleChange('email'), },
		{ label: 'Телефон', placeholder: 'Телефон', value: values.phone_number, onChangeText: handleChange('phone_number'), mask: MASK.PHONE },
	]

	const IS_EDIT_PHONE = formatPhone.SHORT(values.phone_number) !== formatPhone.SHORT(phone_number)
	const IS_EDIT_SOME = IS_EDIT_PHONE || name !== values.name || date_of_birth !== values.date_of_birth || email !== values.email

	const isValide =
		validateTool.email(values.email) &&
		validateTool.phone(values.phone_number) &&
		validateTool.name(values.name) &&
		(values.date_of_birth ? validateTool.date(values.date_of_birth) : true)


	const { height } = useAnimateBtnHeight(IS_EDIT_SOME)

	const changeRequest = async (verification_code: string) => {
		const { date_of_birth, email, name } = values
		const new_user_data: ChangeUserInfoType = verification_code ? { verification_code, ...values } : { name, email, date_of_birth }
		const res = await API.changeUser(new_user_data)
		dispatch(setUserAction({ ...user, ...values }))
		return res.data
	}

	const goToSmsChange = () => {
		const callback = async (code: string) => {
			const res = await changeRequest(code)
			if (res.success) return navigate(SCREEN_NAME.PROFILE)
			else dispatch(setUserAction({ ...user }))
		}
		navigate(SCREEN_NAME.SMS_AUTH, { callback, phone_number: values.phone_number })
	}
	const onPressSave = () => {
		IS_EDIT_PHONE ? goToSmsChange() : changeRequest('')
	}

	const DISABLED = !IS_EDIT_SOME || !isValide || loading

	return (
		<View >
			{inputPropsData.map((props, key) => {
				return <TextInputCustom {...props} key={key} />
			})}
			<Animated.View style={{ height, overflow: 'hidden' }} >
				<ButtonCustom loading={loading} disabled={DISABLED} onPress={onPressSave} bold={false} style={{ marginVertical: 10 }} >
					Сохранить
				</ButtonCustom>
			</Animated.View>
		</View>
	)
}

const useAnimateBtnHeight = (IS_EDIT: boolean) => {
	const size_state = {
		show: 70,
		hide: 0
	}
	const height = useRef(new Animated.Value(size_state.hide)).current
	useEffect(() => {
		const new_state = IS_EDIT ? size_state.show : size_state.hide
		Animated.timing(height, { toValue: new_state, useNativeDriver: false, duration: 200 }).start()
	}, [IS_EDIT])
	return { height }
}


export default ProfileInputBox

