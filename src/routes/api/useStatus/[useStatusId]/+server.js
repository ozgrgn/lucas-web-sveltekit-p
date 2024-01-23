import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { useStatusId } = params;

		if (!useStatusId) {
			throw new Error(
				JSON.stringify({
					en: `useStatusId field is required`,
					tr: `useStatusId alanı zorunlu`
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

		const upsertedUseStatus = await Model.UseStatus.findByIdAndUpdate(
			useStatusId,
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
			useStatus: upsertedUseStatus
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
		let useStatus = await Model.UseStatus.findById(params?.useStatusId);

		return json({
			status: true,
			useStatus
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
		let useStatus = await Model.UseStatus.findByIdAndDelete(params?.useStatusId);

		return json({
			status: true,
			useStatus
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
