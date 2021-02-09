/** 
get shadow state for layout style
*/
export default function getShadow(val = 1): Object {
	return {
		elevation: val,
		shadowColor: '#000',
		shadowOpacity: val / 5,
		shadowOffset: { height: 1, width: 0 }
	}
} 