import { MASK } from '../vars/MASK'

/** 
function formatting phone before display to application and after send to server backend 
work on two modes (SHORT - make is minimal format/ LONG - make is full display length format)
*/
const formatPhone = {
	SHORT(phone: string): string {
		return phone?.replace(/\s|-|\(|\)|\+/g, '') || ''
	},
	LONG(phone: string): string {
		const PHONE_CHAR_ARR = this.SHORT(phone).split('')//.split('').splice(1); //SLICE WITHOUT FIRST 7 DIG
		return MASK.PHONE.split('').map((char: string, index: number) => {
			const pickFirstPhoneChar = () => PHONE_CHAR_ARR.splice(0, 1) //PICK UP FIRST PHONE ARRAY CHAR
			const getCurrentMaskChar = () => char
			if (index === 1) return pickFirstPhoneChar()                     //GET CURRENT CYCLE MASK CHAR (map)
			return char === '9' ? pickFirstPhoneChar() : getCurrentMaskChar()
		}).join('')
	}
}

export default formatPhone