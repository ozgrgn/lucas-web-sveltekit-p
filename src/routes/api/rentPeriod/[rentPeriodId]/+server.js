import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { rentPeriodId } = params;

		if (!rentPeriodId) {
			throw new Error(
				JSON.stringify({
					en: `rentPeriodId field is required`,
					tr: `rentPeriodId alanı zorunlu`
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

		const upsertedRentPeriod = await Model.RentPeriod.findByIdAndUpdate(
			rentPeriodId,
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
			rentPeriod: upsertedRentPeriod
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
		let rentPeriod = await Model.RentPeriod.findById(params?.rentPeriodId);

		return json({
			status: true,
			rentPeriod
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
		let rentPeriod = await Model.RentPeriod.findByIdAndDelete(params?.rentPeriodId);

		return json({
			status: true,
			rentPeriod
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
