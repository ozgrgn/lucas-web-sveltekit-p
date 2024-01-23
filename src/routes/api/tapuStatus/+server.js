import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);

		let tapuStatuss = await Model.TapuStatus.find({}, {}, { limit, skip }).sort({ order: 1 });

		let count = await Model.TapuStatus.countDocuments({});
		return json({
			status: true,
			tapuStatuss,
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

		const tapuStatus = new Model.TapuStatus({
			name,
			order,
			isActive
		});
		await tapuStatus.save();
		return json({
			status: true,
			tapuStatus: tapuStatus
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
