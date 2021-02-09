import codePush from 'react-native-code-push'

/** 
TIME BEFORE RESET APP START (AFTER UPDATE)
*/
const SLEEP_TIME = 1000

/**  
@hook for code push reload and update
*/
const useCodePush = () => {
	const syncCodePush = async (): Promise<boolean> => {
		return new Promise((ok) => {
			codePush.sync({ installMode: codePush.InstallMode.IMMEDIATE, },
				(status) => {
					switch (status) {
						case codePush.SyncStatus.UP_TO_DATE: return ok(true)
						case codePush.SyncStatus.UNKNOWN_ERROR: return ok(true)
					}
				},
				async (progress) => {
					if (progress.receivedBytes === progress.totalBytes) {
						setTimeout(ok, SLEEP_TIME, true)
					}
				})
		})
	}
	return { syncCodePush }
}
export default useCodePush