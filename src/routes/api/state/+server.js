import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {}
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);
		let city = url.searchParams.get('city') ?? undefined;
		if(city)query.city=city


		let states = await Model.State.find(query, {}, { limit, skip }).populate("city").sort({ order: 1 });
		let count = await Model.State.countDocuments({});
		return json({
			status: true,
			states,
			count
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
let requiredFieldsForPost = [];

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {
	try {
		let data = await request.json();

		if (requiredFieldsForPost) {
			requiredFieldsForPost.map((value) => {
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

		let { name, order, isActive,city } = data;

		const state = new Model.State({
			name,
			order,
			isActive,
			city
		});
		await state.save();
		return json({
			status: true,
			state: state
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
