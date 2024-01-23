import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { jeneratorId } = params;

		if (!jeneratorId) {
			throw new Error(
				JSON.stringify({
					en: `jeneratorId field is required`,
					tr: `jeneratorId alanı zorunlu`
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

		const upsertedJenerator = await Model.Jenerator.findByIdAndUpdate(
			jeneratorId,
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
			jenerator: upsertedJenerator
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
		let jenerator = await Model.Jenerator.findById(params?.jeneratorId);

		return json({
			status: true,
			jenerator
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
		let jenerator = await Model.Jenerator.findByIdAndDelete(params?.jeneratorId);

		return json({
			status: true,
			jenerator
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
