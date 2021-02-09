/** 
check equal json string state for memoizing react updates children
*/
export const isEqual = (prev: Object, next: Object) => {
	return JSON.stringify(prev) === JSON.stringify(next)
}

