import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { otoparkId } = params;

		if (!otoparkId) {
			throw new Error(
				JSON.stringify({
					en: `otoparkId field is required`,
					tr: `otoparkId alanı zorunlu`
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

		const upsertedOtopark = await Model.Otopark.findByIdAndUpdate(
			otoparkId,
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
			otopark: upsertedOtopark
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
		let otopark = await Model.Otopark.findById(params?.otoparkId);

		return json({
			status: true,
			otopark
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
		let otopark = await Model.Otopark.findByIdAndDelete(params?.otoparkId);

		return json({
			status: true,
			otopark
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
