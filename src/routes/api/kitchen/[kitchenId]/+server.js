import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { kitchenId } = params;

		if (!kitchenId) {
			throw new Error(
				JSON.stringify({
					en: `kitchenId field is required`,
					tr: `kitchenId alanı zorunlu`
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

		const upsertedKitchen = await Model.Kitchen.findByIdAndUpdate(
			kitchenId,
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
			kitchen: upsertedKitchen
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
		let kitchen = await Model.Kitchen.findById(params?.kitchenId);

		return json({
			status: true,
			kitchen
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
		let kitchen = await Model.Kitchen.findByIdAndDelete(params?.kitchenId);

		return json({
			status: true,
			kitchen
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
