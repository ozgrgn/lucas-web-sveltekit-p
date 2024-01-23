import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { tapuStatusId } = params;

		if (!tapuStatusId) {
			throw new Error(
				JSON.stringify({
					en: `tapuStatusId field is required`,
					tr: `tapuStatusId alanı zorunlu`
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

		const upsertedTapuStatus = await Model.TapuStatus.findByIdAndUpdate(
			tapuStatusId,
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
			tapuStatus: upsertedTapuStatus
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
		let tapuStatus = await Model.TapuStatus.findById(params?.tapuStatusId);

		return json({
			status: true,
			tapuStatus
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
		let tapuStatus = await Model.TapuStatus.findByIdAndDelete(params?.tapuStatusId);

		return json({
			status: true,
			tapuStatus
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
