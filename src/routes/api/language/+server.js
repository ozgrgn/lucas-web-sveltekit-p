import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);

		let languages = await Model.Language.find({}, {}, { limit, skip });

		let count = await Model.Language.countDocuments({});
		return json({
			status: true,
			languages,
			count
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

let requiredFieldsForPost = ['lang', 'name'];
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

		let { lang, name } = data;
		let language = await Model.Language.findOne({ lang: lang }, {}, {});

		if (lang && language) {
			throw new Error(
				JSON.stringify({
					en: `Bu dil seçeneği ile veri kaydedilmiş.`,
					tr: `There is data with this language option. `
				})
			);
		}
		const upsertedLanguage = await Model.Language.findOneAndUpdate(
			{ lang },
			{ lang, name },
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			language: upsertedLanguage
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
