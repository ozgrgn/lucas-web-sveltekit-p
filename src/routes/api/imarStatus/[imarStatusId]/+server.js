import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { imarStatusId } = params;

		if (!imarStatusId) {
			throw new Error(
				JSON.stringify({
					en: `imarStatusId field is required`,
					tr: `imarStatusId alanı zorunlu`
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

		const upsertedImarStatus = await Model.ImarStatus.findByIdAndUpdate(
			imarStatusId,
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
			imarStatus: upsertedImarStatus
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
		let imarStatus = await Model.ImarStatus.findById(params?.imarStatusId);

		return json({
			status: true,
			imarStatus
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
		let imarStatus = await Model.ImarStatus.findByIdAndDelete(params?.imarStatusId);

		return json({
			status: true,
			imarStatus
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
