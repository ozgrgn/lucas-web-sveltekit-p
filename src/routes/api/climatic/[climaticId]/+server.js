import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { climaticId } = params;

		if (!climaticId) {
			throw new Error(
				JSON.stringify({
					en: `climaticId field is required`,
					tr: `climaticId alanı zorunlu`
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

		const upsertedClimatic = await Model.Climatic.findByIdAndUpdate(
			climaticId,
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
			climatic: upsertedClimatic
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
		let climatic = await Model.Climatic.findById(params?.climaticId);

		return json({
			status: true,
			climatic
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
		let climatic = await Model.Climatic.findByIdAndDelete(params?.climaticId);

		return json({
			status: true,
			climatic
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
