import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);

		let citizenships = await Model.Citizenship.find({}, {}, { limit, skip }).sort({ order: 1 });

		let count = await Model.Citizenship.countDocuments({});
		return json({
			status: true,
			citizenships,
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

		let { name, order, isActive } = data;

		const citizenship = new Model.Citizenship({
			name,
			order,
			isActive
		});
		await citizenship.save();
		return json({
			status: true,
			citizenship: citizenship
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
