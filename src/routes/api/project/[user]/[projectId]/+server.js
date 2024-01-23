import { json } from '@sveltejs/kit';
import Model from '../../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { projectId } = params;

		if (!projectId) {
			throw new Error(
				JSON.stringify({
					en: `projectId field is required`,
					tr: `projectId alanı zorunlu`
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
			projectType,
			projectCat,
			projectStatus,
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
			isActive
		} = data;

		const upsertedProject = await Model.Project.findByIdAndUpdate(
			projectId,
			{
				perma,
				name,
				description,
				price,
				currency,
				no,
				date,
				order,
				projectType,
				projectCat,
				projectStatus,
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
				isActive
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			project: upsertedProject
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
	console.log(params?.projectId,"saaa")
	try {
		let project = await Model.Project.findById(params?.projectId).populate([
			
			'staff',
			'city',
			'state',
			'district',
			
		]);

		return json({
			status: true,
			project
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
		let project = await Model.Project.findByIdAndDelete(params?.projectId);

		return json({
			status: true,
			project
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
