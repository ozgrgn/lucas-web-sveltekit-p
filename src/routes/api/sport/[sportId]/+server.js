import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { sportId } = params;

		if (!sportId) {
			throw new Error(
				JSON.stringify({
					en: `sportId field is required`,
					tr: `sportId alanı zorunlu`
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

		const upsertedSport = await Model.Sport.findByIdAndUpdate(
			sportId,
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
			sport: upsertedSport
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
		let sport = await Model.Sport.findById(params?.sportId);

		return json({
			status: true,
			sport
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
		let sport = await Model.Sport.findByIdAndDelete(params?.sportId);

		return json({
			status: true,
			sport
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
