import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { citizenshipId } = params;

		if (!citizenshipId) {
			throw new Error(
				JSON.stringify({
					en: `citizenshipId field is required`,
					tr: `citizenshipId alanı zorunlu`
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

		let { name, order, isActive } = data;

		const upsertedCitizenship = await Model.Citizenship.findByIdAndUpdate(
			citizenshipId,
			{
				name, order, isActive
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			citizenship: upsertedCitizenship
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
	console.log(params,"fdfs")
	try {
		let citizenship = await Model.Citizenship.findById(params?.citizenshipId);

		return json({
			status: true,
			citizenship
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
		let citizenship = await Model.Citizenship.findByIdAndDelete(params?.citizenshipId);

		return json({
			status: true,
			citizenship
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
