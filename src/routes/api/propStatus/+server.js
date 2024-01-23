import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {};
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);
		let propCat = url.searchParams.get('propCat') ?? undefined;
		if (propCat) query.propCat = propCat;

		let propStatuss = await Model.PropStatus.find(query, {}, { limit, skip })
			.populate('propCat')
			.sort({ order: 1 });
		let count = await Model.PropStatus.countDocuments({});
		return json({
			status: true,
			propStatuss,
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

		let { name, order, group,devir, isActive, propCat } = data;

		const propStatus = new Model.PropStatus({
			name,
			order,
			group,
			devir,
			isActive,
			propCat
		});
		await propStatus.save();
		return json({
			status: true,
			propStatus: propStatus
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
