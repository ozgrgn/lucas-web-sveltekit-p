import { json } from '@sveltejs/kit';
import Model from '../../../Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {};
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 1000);
		let lang = url.searchParams.get('lang') ?? undefined;
		if (lang) query.lang = lang;

		query.isActive = true;
	
		let done = url.searchParams.get('done') ?? undefined;
		if (done && done == 'yes') query.$or = [{ sold: { $ne: null } }, { rent: { $ne: null } }];
		if (done && done == 'no') {
			if (done) query.$and = [{ sold: null }, { rent: null }];
		}
		let staff =
			url.searchParams.get('staff') && url.searchParams.get('staff') != 'null'
				? url.searchParams.get('staff')
				: undefined;
		if (staff) query.staff = staff;

		let propCat =
			url.searchParams.get('propCat') && url.searchParams.get('propCat') != 'null'
				? url.searchParams.get('propCat')
				: undefined;
		//console.log(propCat, 'peprprpr');
		if (propCat) query.propCat = propCat;

		let propStatus =
			url.searchParams.get('propStatus') && url.searchParams.get('propStatus') != 'null'
				? url.searchParams.get('propStatus')
				: undefined;
		if (propStatus) query.propStatus = propStatus;

		let propType =
			url.searchParams.get('propType') && url.searchParams.get('propType') != 'null'
				? url.searchParams.get('propType')
				: undefined;
		if (propType) query.propType = propType;
		let furnished =
			url.searchParams.get('furnished') &&
			url.searchParams.get('furnished') != 'undefined' &&
			url.searchParams.get('furnished') != 'null'
				? url.searchParams.get('furnished')
				: undefined;
		if (furnished) query.furnished = furnished;

		let security =
			url.searchParams.get('security') &&
			url.searchParams.get('security') != 'undefined' &&
			url.searchParams.get('security') != 'null'
				? url.searchParams.get('security')
				: undefined;
		if (security) {
			query.security = security;
		}
		let balcone =
			url.searchParams.get('balcone') &&
			url.searchParams.get('balcone') != 'undefined' &&
			url.searchParams.get('balcone') != 'null'
				? url.searchParams.get('balcone')
				: undefined;
		if (balcone) {
			query.balcone = balcone;
		}
		let teras =
			url.searchParams.get('teras') &&
			url.searchParams.get('teras') != 'undefined' &&
			url.searchParams.get('teras') != 'null'
				? url.searchParams.get('teras')
				: undefined;
		if (teras) {
			query.teras = teras;
		}
		let elevator =
			url.searchParams.get('elevator') &&
			url.searchParams.get('elevator') != 'undefined' &&
			url.searchParams.get('elevator') != 'null'
				? url.searchParams.get('elevator')
				: undefined;
		if (elevator) {
			query.elevator = elevator;
		}
		let roomNumber =
			url.searchParams.get('roomNumber') &&
			url.searchParams.get('roomNumber') != 'undefined' &&
			url.searchParams.get('roomNumber') != 'null'
				? url.searchParams.get('roomNumber')
				: undefined;
		if (roomNumber) {
			roomNumber = roomNumber.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _roomNumber = {};
			_roomNumber.$or = [{ roomNumber: roomNumber }];
			query.$and.push(_roomNumber);
		}
		let view =
			url.searchParams.get('view') &&
			url.searchParams.get('view') != 'undefined' &&
			url.searchParams.get('view') != 'null'
				? url.searchParams.get('view')
				: undefined;
		if (view) {
			view = view.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _view = {};
			_view.$or = [{ view: view }];
			query.$and.push(_view);
		}

		let climatic =
			url.searchParams.get('climatic') &&
			url.searchParams.get('climatic') != 'undefined' &&
			url.searchParams.get('climatic') != 'null'
				? url.searchParams.get('climatic')
				: undefined;
		if (climatic) {
			climatic = climatic.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _climatic = {};
			_climatic.$or = [{ climatic1: climatic }, { climatic2: climatic }, { climatic3: climatic }];
			query.$and.push(_climatic);
		}

		let facade =
			url.searchParams.get('facade') &&
			url.searchParams.get('facade') != 'undefined' &&
			url.searchParams.get('facade') != 'null'
				? url.searchParams.get('facade')
				: undefined;
		if (facade) {
			facade = facade.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _facade = {};
			_facade.$or = [{ facade: facade }];
			query.$and.push(_facade);
		}
		let useStatus =
			url.searchParams.get('useStatus') &&
			url.searchParams.get('useStatus') != 'undefined' &&
			url.searchParams.get('useStatus') != 'null'
				? url.searchParams.get('useStatus')
				: undefined;
		if (useStatus) {
			useStatus = useStatus.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _useStatus = {};
			_useStatus.$or = [{ useStatus: useStatus }];
			query.$and.push(_useStatus);
		}

		let iskanStatus =
			url.searchParams.get('iskanStatus') &&
			url.searchParams.get('iskanStatus') != 'undefined' &&
			url.searchParams.get('iskanStatus') != 'null'
				? url.searchParams.get('iskanStatus')
				: undefined;
		if (iskanStatus) {
			iskanStatus = iskanStatus.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _iskanStatus = {};
			_iskanStatus.$or = [{ iskanStatus: iskanStatus }];
			query.$and.push(_iskanStatus);
		}
		

		let imarStatus =
			url.searchParams.get('imarStatus') &&
			url.searchParams.get('imarStatus') != 'undefined' &&
			url.searchParams.get('imarStatus') != 'null'
				? url.searchParams.get('imarStatus')
				: undefined;
		if (imarStatus) {
			imarStatus = imarStatus.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _imarStatus = {};
			_imarStatus.$or = [{ imarStatus: imarStatus }];
			query.$and.push(_imarStatus);
		}
		let tapuStatus =
			url.searchParams.get('tapuStatus') &&
			url.searchParams.get('tapuStatus') != 'undefined' &&
			url.searchParams.get('tapuStatus') != 'null'
				? url.searchParams.get('tapuStatus')
				: undefined;
		if (tapuStatus) {
			tapuStatus = tapuStatus.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _tapuStatus = {};
			_tapuStatus.$or = [{ tapuStatus: tapuStatus }];
			query.$and.push(_tapuStatus);
		}
		let bathroom =
			url.searchParams.get('bathroom') &&
			url.searchParams.get('bathroom') != 'undefined' &&
			url.searchParams.get('bathroom') != 'null'
				? url.searchParams.get('bathroom')
				: undefined;
		if (bathroom) {
			bathroom = bathroom.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _bathroom = {};
			_bathroom.$or = [{ bathroom: bathroom }];
			query.$and.push(_bathroom);
		}

		let yearRange =
			url.searchParams.get('yearRange') &&
			url.searchParams.get('yearRange') != 'undefined' &&
			url.searchParams.get('yearRange') != 'null'
				? url.searchParams.get('yearRange')
				: undefined;
		if (yearRange) {
			yearRange = yearRange.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _yearRange = {};
			_yearRange.$or = [{ yearRange: yearRange }];
			query.$and.push(_yearRange);
		}
		let pool =
			url.searchParams.get('pool') &&
			url.searchParams.get('pool') != 'undefined' &&
			url.searchParams.get('pool') != 'null'
				? url.searchParams.get('pool')
				: undefined;
		if (pool) {
			pool = pool.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _pool = {};
			_pool.$or = [{ pool: pool }];
			query.$and.push(_pool);
		}
		let otopark =
			url.searchParams.get('otopark') &&
			url.searchParams.get('otopark') != 'undefined' &&
			url.searchParams.get('otopark') != 'null'
				? url.searchParams.get('otopark')
				: undefined;
		if (otopark) {
			otopark = otopark.split(',');
			if (!query.$and) {
				query.$and = [];
			}
			let _otopark = {};
			_otopark.$or = [{ otopark: otopark }];
			query.$and.push(_otopark);
		}
		let usd = url.searchParams.get('USD') ?? undefined;
		let minPrice = url.searchParams.get('minPrice') ?? 0;
		if (!query.$and) {
			query.$and = [];
		}
		console.log(minPrice, 'minPrice');
		if (minPrice && minPrice>0) {
			console.log(minPrice / usd, usd, 'minPrice/usd');
			query.$and.push({
				$or: [
					{
						$and: [{ 'price.tr': { $gt: Number(minPrice) } }, { 'currency.tr': 'TRY' }]
					},
					{
						$and: [{ 'price.tr': { $gt: Number(minPrice / usd) } }, { 'currency.tr': 'USD' }]
					}
				]
			});
		}

		let maxPrice = url.searchParams.get('maxPrice') ?? undefined;
		if (!query.$and) {
			query.$and = [];
		}

		if (maxPrice && maxPrice>0) {
			query.$and.push({
				$or: [
					{
						$and: [{ 'price.tr': { $lt: Number(maxPrice) } }, { 'currency.tr': 'TRY' }]
					},
					{
						$and: [{ 'price.tr': { $lt: Number(maxPrice / usd) } }, { 'currency.tr': 'USD' }]
					}
				]
			});
		}
		console.log(query);
		let props = await Model.Prop.find(query, {}, { limit, skip })
			.populate([
				'propCat',
				'propStatus',
				'propType',
				'staff',
				'city',
				'state',
				'district',
				'roomNumber'
			])
			.sort({ order: 1 });
		let count = await Model.Prop.countDocuments({ query });
		return json({
			status: true,
			props,
			count
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

let requiredFieldsForPost = [];
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {
	try {
		let data = await request.json();

		if (requiredFieldsForPost) {
			requiredFieldsForPost.map((value) => {
				if (!data[value]) {
					throw new Error(
						JSON.stringify({
							en: `${value} field is required`,
							tr: `${value} alanı zorunlu`
						})
					);
				}
			});
		}

		let {
			perma,
			name,
			description,
			price,
			currency,
			no,
			date,
			order,
			propType,
			propCat,
			propStatus,
			staff,
			district,
			state,
			city,
			images,
			coverImage,
			roomNumber,
			netm2,
			brutm2,
			floorNo,
			buildingFloors,
			sold,
			rent,
			siteName,
			view,
			height,
			year,
			yearRange,
			climatic1,
			climatic2,
			climatic3,
			bathroom,
			wc,
			balcone,
			teras,
			flatsInFloor,
			dues,
			furnished,
			iskanStatus,
			useStatus,
			tapuStatus,
			tapuTransfer,
			facade,
			elevator,
			pool,
			sport,
			otopark,
			childPark,
			kitchen,
			security,
			camSystem,
			doorman,
			jenerator,
			citizenship,
			fireStair,
			rentPeriod,
			rentTime,
			deposit,
			assignPrice,
			ada,
			parsel,
			imarStatus,
			realEstateComm,
			videoLink,
			virtualLink,
			isActive,
			driveLink
		} = data;
		const props = new Model.Prop({
			perma,
			name,
			description,
			price,
			currency,
			no,
			date,
			order,
			propType,
			propCat,
			propStatus,
			staff,
			district,
			state,
			city,
			images,
			coverImage,
			roomNumber,
			netm2,
			brutm2,
			floorNo,
			buildingFloors,
			sold,
			rent,
			siteName,
			view,
			height,
			year,
			yearRange,
			climatic1,
			climatic2,
			climatic3,
			bathroom,
			wc,
			balcone,
			teras,
			flatsInFloor,
			dues,
			furnished,
			iskanStatus,
			useStatus,
			tapuStatus,
			tapuTransfer,
			facade,
			elevator,
			pool,
			sport,
			otopark,
			childPark,
			kitchen,
			security,
			camSystem,
			doorman,
			jenerator,
			citizenship,
			fireStair,
			rentPeriod,
			rentTime,
			deposit,
			assignPrice,
			ada,
			parsel,
			imarStatus,
			realEstateComm,
			videoLink,
			virtualLink,
			isActive,
			driveLink
		});

		await props.save();

		return json({
			status: true,
			props: props
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
