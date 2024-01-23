import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { stateId } = params;

		if (!stateId) {
			throw new Error(
				JSON.stringify({
					en: `stateId field is required`,
					tr: `stateId alanı zorunlu`
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

		let { name, order, isActive, city } = data;

		const upsertedState = await Model.State.findByIdAndUpdate(
			stateId,
			{
				name,
				order,
				isActive,
				city
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			state: upsertedState
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
		let state = await Model.State.findById(params?.stateId);

		return json({
			status: true,
			state
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
		let state = await Model.State.findByIdAndDelete(params?.stateId);

		return json({
			status: true,
			state
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
