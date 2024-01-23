import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);

		let blogsPages = await Model.BlogsPage.find({}, {}, { limit, skip });

		let count = await Model.BlogsPage.countDocuments({});
		return json({
			status: true,
			blogsPages,
			count
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

let requiredFieldsForPost = ['lang', 'spot', 'header'];
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

		let { lang, spot, header, metaTitle, metaDescription } = data;
		let blogsPage = await Model.BlogsPage.findOne({ lang: lang }, {}, {});
		if (lang && blogsPage) {
			throw new Error(
				JSON.stringify({
					en: `Bu dil seçeneği ile veri kaydedilmiş.`,
					tr: `There is data with this language option. `
				})
			);
		}
		const upsertedBlogPage = await Model.BlogsPage.findOneAndUpdate(
			{ lang },
			{ lang, spot, header, metaTitle, metaDescription },
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			blogPage: upsertedBlogPage
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
