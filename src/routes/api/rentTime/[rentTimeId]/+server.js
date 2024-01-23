import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { rentTimeId } = params;

		if (!rentTimeId) {
			throw new Error(
				JSON.stringify({
					en: `rentTimeId field is required`,
					tr: `rentTimeId alanı zorunlu`
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

		const upsertedRentTime = await Model.RentTime.findByIdAndUpdate(
			rentTimeId,
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
			rentTime: upsertedRentTime
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
		let rentTime = await Model.RentTime.findById(params?.rentTimeId);

		return json({
			status: true,
			rentTime
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
		let rentTime = await Model.RentTime.findByIdAndDelete(params?.rentTimeId);

		return json({
			status: true,
			rentTime
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
