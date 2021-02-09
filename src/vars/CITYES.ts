
export class Coord {
	latitude: number
	longitude: number
	constructor(latitude: number, longitude: number) {
		this.latitude = latitude
		this.longitude = longitude
	}
}

export class Shop extends Coord {
	address: string
	constructor(latitude: number, longitude: number, address: string) {
		super(latitude, longitude)
		this.address = address
	}
}

export class CityCenter extends Coord { }

export class City {
	center: CityCenter
	cityZoneCoordinates: Coord[]
	deliveryZoneCoordinates: Coord[]
	shops: Shop[]

	constructor(center: CityCenter, cityZoneCoordinates: Coord[], deliveryZoneCoordinates: Coord[], shops: Shop[]) {
		this.center = center
		this.cityZoneCoordinates = cityZoneCoordinates
		this.deliveryZoneCoordinates = deliveryZoneCoordinates
		this.shops = shops
	}
}

export const Cityes: City[] = [
	//NOYABRSK
	new City(
		new CityCenter(63.204396, 75.429191),
		[
			new Coord(63.13789, 75.410131),
			new Coord(63.163816, 75.404727),
			new Coord(63.160425, 75.366414),
			new Coord(63.168657, 75.355228),
			new Coord(63.216782, 75.352375),
			new Coord(63.221434, 75.422639),
			new Coord(63.234279, 75.495709),
			new Coord(63.230987, 75.564853),
			new Coord(63.21423, 75.556331),
			new Coord(63.22248, 75.507244),
			new Coord(63.190443, 75.461452),
			new Coord(63.179107, 75.495933),
		],
		[
			new Coord(63.13789, 75.410131),
			new Coord(63.136363, 75.365272),
			new Coord(63.147818, 75.357437),
			new Coord(63.160425, 75.366414),
			new Coord(63.168657, 75.355228),
			new Coord(63.216782, 75.352375),
			new Coord(63.221434, 75.422639),
			new Coord(63.234279, 75.495709),
			new Coord(63.230987, 75.564853),
			new Coord(63.21423, 75.556331),
			new Coord(63.179107, 75.495933),
		],
		[new Shop(63.199437, 75.461119, 'Ноябрьск, Советская улица, дом 83')]
	),
]
