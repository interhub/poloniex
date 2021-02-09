import SLEEP_TIME from "../vars/SLEEP_TIME"

const waitSleep = async () => await new Promise((ok) => setTimeout(ok, SLEEP_TIME))
export default waitSleep