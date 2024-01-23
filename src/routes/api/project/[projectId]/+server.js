import { json } from '@sveltejs/kit';
import Model from '../Model';

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
			no,
			date,
			order,
			isActive,
			staff,
			city,
			state,
			district,
			images,
			coverImage,
			type,
			siteName,
			videoLink,
			virtualLink,
			driveLink,
			propMap,
			metaTitle,
			metaDescription,
			infoDesc,
			infoElementsTR,
			infoElementsEN,
			infoElementsRU,
			generalDesc,
			generalElementsTR,
			generalElementsEN,
			generalElementsRU,
			technicalDesc,
			technicalElementsTR,
			technicalElementsEN,
			technicalElementsRU
		} = data;

		const upsertedProject = await Model.Project.findByIdAndUpdate(
			projectId,
			{
				perma,
				name,
				description,
				no,
				date,
				order,
				isActive,
				staff,
				city,
				state,
				district,
				images,
				coverImage,
				type,
				siteName,
				videoLink,
				virtualLink,
				driveLink,
				propMap,
				metaTitle,
				metaDescription,
				infoDesc,
				infoElementsTR,
				infoElementsEN,
				infoElementsRU,
				generalDesc,
				generalElementsTR,
				generalElementsEN,
				generalElementsRU,
				technicalDesc,
				technicalElementsTR,
				technicalElementsEN,
				technicalElementsRU
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
	console.log(params, 'fdfs');
	try {
		let project = await Model.Project.findById(params?.projectId);

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
