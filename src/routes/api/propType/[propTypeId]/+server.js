import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { propTypeId } = params;

		if (!propTypeId) {
			throw new Error(
				JSON.stringify({
					en: `propTypeId field is required`,
					tr: `propTypeId alanı zorunlu`
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

		let { name, order, isActive, propCat, propStatus } = data;

		const upsertedPropType = await Model.PropType.findByIdAndUpdate(
			propTypeId,
			{
				name,
				order,
				isActive,
				propCat,
				propStatus
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			propType: upsertedPropType
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
		let propType = await Model.PropType.findById(params?.propTypeId);

		return json({
			status: true,
			propType
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
		let propType = await Model.PropType.findByIdAndDelete(params?.propTypeId);

		return json({
			status: true,
			propType
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
