/** 
check equal json string equal for memoizing comparison 
*/
export const isEqual = (prev: Object, next: Object) => {
	return JSON.stringify(prev) === JSON.stringify(next)
}

