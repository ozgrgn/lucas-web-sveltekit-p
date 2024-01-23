import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {

	try {
		let query = {}
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);
		let lang = url.searchParams.get('lang') ?? undefined;
		if (lang) query.lang = lang

		let reviews = await Model.Review.find(query, {}, { limit, skip });
		let count = await Model.Review.countDocuments({});
		return json({
			status: true,
			reviews,
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

		let { lang, reviewName, reviewDate, reviewLink, reviewPlatform, reviewText, reviewStars, reviewAvatar, order
		} = data;
		const reviews = new Model.Review({ lang, reviewName, reviewDate, reviewLink, reviewPlatform, reviewText, reviewStars, reviewAvatar, order });

		await reviews.save()

		return json({
			status: true,
			reviews: reviews
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
