import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { iskanStatusId } = params;

		if (!iskanStatusId) {
			throw new Error(
				JSON.stringify({
					en: `iskanStatusId field is required`,
					tr: `iskanStatusId alanı zorunlu`
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

		const upsertedIskanStatus = await Model.IskanStatus.findByIdAndUpdate(
			iskanStatusId,
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
			iskanStatus: upsertedIskanStatus
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
		let iskanStatus = await Model.IskanStatus.findById(params?.iskanStatusId);

		return json({
			status: true,
			iskanStatus
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
		let iskanStatus = await Model.IskanStatus.findByIdAndDelete(params?.iskanStatusId);

		return json({
			status: true,
			iskanStatus
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
