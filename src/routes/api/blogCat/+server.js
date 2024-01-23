import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {};
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);
		let lang = url.searchParams.get('lang') ?? undefined;
		if (lang) query.lang = lang;
		let treatmentGroup = url.searchParams.get('treatmentGroup') ?? undefined;
		if (treatmentGroup) query.treatmentGroup = treatmentGroup;

		let blogCats = await Model.BlogCat.find(query, {}, { limit, skip })
			.populate('treatmentGroup')
			.sort({ order: 1 });
		let count = await Model.BlogCat.countDocuments({});
		return json({
			status: true,
			blogCats,
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

		let { lang, name, metaTitle, metaDescription, treatmentGroup, order, image, perma } = data;
		const blogCats = new Model.BlogCat({
			lang,
			name,
			metaTitle,
			metaDescription,
			treatmentGroup,
			order,
			image,
			perma
		});

		await blogCats.save();

		return json({
			status: true,
			blogCats: blogCats
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
