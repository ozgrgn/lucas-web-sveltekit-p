import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {};
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 1000);
		let lang = url.searchParams.get('lang') ?? undefined;
		if (lang) query.lang = lang;
		let isActive = url.searchParams.get('isActive') ?? undefined;
		if (isActive && isActive == 'yes') query.isActive = true;
		if (isActive && isActive == 'no') query.isActive = false;
		let done = url.searchParams.get('done') ?? undefined;
		if (done && done == 'yes') query.$or = [{ sold: { $ne: null } }, { rent: { $ne: null } }];
		if (done && done == 'no') {
			if (done) query.$and = [{ sold: null }, { rent: null }];
		}
		let propCat = url.searchParams.get('propCat') ?? undefined;
		if (propCat) query.propCat = propCat;
		let propStatus = url.searchParams.get('propStatus') ?? undefined;
		if (propStatus) query.propStatus = propStatus;
		let propType = url.searchParams.get('propType') ?? undefined;
		if (propType) query.propType = propType;
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
		let count = await Model.Prop.countDocuments( query );
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
			driveLink,
			propMap,
			isActive
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
			driveLink,
			propMap,
			isActive
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
