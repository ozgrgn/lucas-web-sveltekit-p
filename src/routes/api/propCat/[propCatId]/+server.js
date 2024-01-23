import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { propCatId } = params;

		if (!propCatId) {
			throw new Error(
				JSON.stringify({
					en: `propCatId field is required`,
					tr: `propCatId alanı zorunlu`
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

		const upsertedPropCat = await Model.PropCat.findByIdAndUpdate(
			propCatId,
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
			propCat: upsertedPropCat
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
		let propCat = await Model.PropCat.findById(params?.propCatId);

		return json({
			status: true,
			propCat
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
		let propCat = await Model.PropCat.findByIdAndDelete(params?.propCatId);

		return json({
			status: true,
			propCat
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
