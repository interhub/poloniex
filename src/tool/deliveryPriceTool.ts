import { setOrderInfoAction } from '../store/actions'
import { store } from '../store/store'
import { City, Cityes } from './../vars/CITYES'
import { LocationType } from './locationTool'
class DeliveryPriceTool {
	/** 
	set delivery price and exist delivery state
	*/
	private setStoreDeliveryExistState(exist_delivery: boolean) {
		const { order_info } = store.getState()
		store.dispatch(setOrderInfoAction({ ...order_info, exist_delivery }))
	}

	/** 
	 проверить пересечение двух точек   @param(1 точка границы первая , 2 точка границы первая вторая, 3 пользователь, 4 центр города center  , итого получаем два отрезка - отрезок границы и отрезок от центра города до пользователя (проверяем все отрезки границы поочереди перебирая координаты города из Cityes  массива)) 
	 формулы расчета пересечения двух отрезков доступны по ссылке = http://algolist.ru/maths/geom/intersect/lineline2d.php (важно использовать именно пересечение отрезков, а не прямых , тк прямые не пересекаются, только если они параллельны )
	*/
	private isInterLines(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
		const Ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
		const Ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
		return Ua >= 0 && Ua <= 1 && Ub >= 0 && Ub <= 1
	}

	/** 
	проверка числа на четность или нечетность
	*/
	private isEvenNumber(num: number): boolean {
		return num % 2 === 0
	}

	/** 
	set delivery exist state use check zone CITY or ALL DELIVERY ZONE or NOT DELIVERY ZONE
	*/
	private setByZoneAndTotal(isCity: boolean, isDeliveryZone: boolean) {
		if (isCity || isDeliveryZone) this.setStoreDeliveryExistState(true)
		else this.setStoreDeliveryExistState(false)
	}

	/** 
	поочереди перебираем все точки границы города в массивах объекта города и проверяем пересечение отрезков (если число пересечений четное, то пользователь находится в пределах области города иначе за пределами)
	*/
	public setDeliveryPriceByLocation(userLocation: LocationType) {
		/** 
		city entries
		*/
		for (let cityIndex = 0; cityIndex < Cityes.length; cityIndex++) {
			//количество пересечений отрезков для определения четности значений по алгоритму по ссылке isInterLines()
			const inters = {
				ofCityZone: 0,
				ofDeliveryZone: 0,
			}

			const { cityZoneCoordinates, deliveryZoneCoordinates, center } = Cityes[cityIndex]
			const { longitude: x3, latitude: y3 } = userLocation
			const { longitude: x4, latitude: y4 } = center
			//check for exist city coordinates
			if (cityZoneCoordinates.length < 3 || deliveryZoneCoordinates.length < 3) return
			/** 
			city zone coordinates check entries
			*/
			for (let zoneIndex = 0; zoneIndex < cityZoneCoordinates.length; zoneIndex++) {
				const { longitude: x1, latitude: y1 } = cityZoneCoordinates[zoneIndex]
				const { longitude: x2, latitude: y2 } = cityZoneCoordinates[zoneIndex + 1] ? cityZoneCoordinates[zoneIndex + 1] : cityZoneCoordinates[0] //if coordinate is last then use first coordinate for cicle figure
				if (this.isInterLines(x1, y1, x2, y2, x3, y3, x4, y4)) inters.ofCityZone++
			}
			/** 
			delivery full zone check for check exist delivery full
			*/
			for (let zoneIndex = 0; zoneIndex < deliveryZoneCoordinates.length; zoneIndex++) {
				const { longitude: x1, latitude: y1 } = deliveryZoneCoordinates[zoneIndex]
				const { longitude: x2, latitude: y2 } = deliveryZoneCoordinates[zoneIndex + 1] ? deliveryZoneCoordinates[zoneIndex + 1] : deliveryZoneCoordinates[0] //if coordinate is last then use first coordinate for cicle figure
				if (this.isInterLines(x1, y1, x2, y2, x3, y3, x4, y4)) inters.ofDeliveryZone++
			}

			const inCityZone = this.isEvenNumber(inters.ofCityZone)
			const inDeliveryZone = this.isEvenNumber(inters.ofDeliveryZone)

			// console.log(inCityZone, inters.ofCityZone, 'inCityZone', inDeliveryZone, inters.ofDeliveryZone, 'inDeliveryZone')

			this.setByZoneAndTotal(inCityZone, inDeliveryZone)

			/** 
			break cicle if something city finded (by first) (otherwise be check last city in Cityes list)
			*/
			if (inCityZone || inDeliveryZone) break
		}
	}

	/** 
	get Nearest for user location (check module for vectors from user to city center use Math.hypot)
	*/
	public getNearestCityForUser = (location: LocationType): City => {
		const { latitude, longitude } = location
		if (Cityes.length < 2)
			return Cityes[0]
		return Cityes.reduce((a, b) => {
			const isA = Math.hypot((a.center.latitude - latitude), (a.center.longitude - longitude)) <= Math.hypot((b.center.latitude - latitude), (b.center.longitude - longitude))
			return isA ? a : b
		})
	}
}

export default new DeliveryPriceTool()
