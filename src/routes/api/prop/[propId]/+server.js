import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { propId } = params;

		if (!propId) {
			throw new Error(
				JSON.stringify({
					en: `propId field is required`,
					tr: `propId alanı zorunlu`
				})
			);
		}

		if (requiredFieldsForPatch) {
			requiredFieldsForPatch.map((value) => {
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
			propMap,
			isActive,
			driveLink
		} = data;

		const upsertedProp = await Model.Prop.findByIdAndUpdate(
			propId,
			{
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
				propMap,
				isActive,
				driveLink,

			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			prop: upsertedProp
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
	console.log(params?.propId,"saaa")
	try {
		let prop = await Model.Prop.findById(params?.propId);

		return json({
			status: true,
			prop
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ params }) => {
	try {
		let prop = await Model.Prop.findByIdAndDelete(params?.propId);

		return json({
			status: true,
			prop
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
