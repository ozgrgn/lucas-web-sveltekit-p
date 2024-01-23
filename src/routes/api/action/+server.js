import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);

		let actions = await Model.Action.find({}, {}, { limit, skip }).sort({ order: 1 });

		let count = await Model.Action.countDocuments({});
		return json({
			status: true,
			actions,
			count
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

let requiredFieldsForPost = ['lang'];
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

		let { lang, name, text, order
		} = data;
		const actions = new Model.Action({ lang, name, text, order });

		await actions.save()

		return json({
			status: true,
			action: actions
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
