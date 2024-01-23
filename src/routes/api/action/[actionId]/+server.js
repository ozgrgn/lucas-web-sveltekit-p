import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { actionId } = params;

		if (!actionId) {
			throw new Error(
				JSON.stringify({
					en: `actionId field is required`,
					tr: `actionId alanı zorunlu`
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

		let { lang, name, text, order } = data;

		const upsertedAction = await Model.Action.findByIdAndUpdate(
			actionId,
			{
				lang,
				name,
				text,
				order
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			action: upsertedAction
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
	try {
		let action = await Model.Action.findById(params?.actionId);

		return json({
			status: true,
			action
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
		let action = await Model.Action.findByIdAndDelete(params?.actionId);

		return json({
			status: true,
			action
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
