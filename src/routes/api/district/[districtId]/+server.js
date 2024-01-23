import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { districtId } = params;

		if (!districtId) {
			throw new Error(
				JSON.stringify({
					en: `districtId field is required`,
					tr: `districtId alanı zorunlu`
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

		let { name, order, isActive, city, state } = data;

		const upsertedDistrict = await Model.District.findByIdAndUpdate(
			districtId,
			{
				name,
				order,
				isActive,
				city,
				state
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			district: upsertedDistrict
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
		let district = await Model.District.findById(params?.districtId);

		return json({
			status: true,
			district
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
		let district = await Model.District.findByIdAndDelete(params?.districtId);

		return json({
			status: true,
			district
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
