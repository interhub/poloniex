import { MASK } from './../vars/MASK'

/** 
@class for validate params (email/name/phone/date/other...)
*/
const validateTool = {
	email(email: string): boolean {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(String(email).toLowerCase())
	},
	name(name: string): boolean {
		return name.length > 1
	},
	phone(phone: string): boolean {
		return phone.length === MASK.PHONE.length
	},
	date(date: string): boolean {
		return date.length === MASK.DATE.length
	},

}

export default validateTool