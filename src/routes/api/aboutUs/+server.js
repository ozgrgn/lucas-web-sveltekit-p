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
		let aboutUss = await Model.AboutUs.find(query, {}, { limit, skip });

		let count = await Model.AboutUs.countDocuments({});
		return json({
			status: true,
			aboutUss,
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

		let { lang, text1, text2, staffText, metaTitle, metaDescription, image1, image2
		} = data;
		let aboutUs = await Model.AboutUs.findOne({ lang: lang }, {}, {});
		if (lang && aboutUs) {
			throw new Error(
				JSON.stringify({
					en: `Bu dil seçeneği ile veri kaydedilmiş.`,
					tr: `There is data with this language option. `
				})
			);
		}
		const upsertedAboutUs = await Model.AboutUs.findOneAndUpdate(
			{ lang },
			{
				lang, text1, text2, staffText, metaTitle, metaDescription, image1, image2
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			aboutUs: upsertedAboutUs
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
