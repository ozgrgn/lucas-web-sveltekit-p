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
		let propStatus = url.searchParams.get('propStatus') ?? undefined;
		if (propStatus) query.propStatus = propStatus;

		console.log(query);
		let propTypes = await Model.PropType.find(query, {}, { limit, skip })
			.populate(['propCat', 'propStatus'])
			.sort({ order: 1 });
		let count = await Model.PropType.countDocuments({});
		return json({
			status: true,
			propTypes,
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

		let { name, order, isActive, propCat, propStatus } = data;

		const propType = new Model.PropType({
			name,
			order,
			isActive,
			propCat,
			propStatus
		});
		await propType.save();
		return json({
			status: true,
			propType: propType
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
