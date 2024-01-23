import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { languageId } = params;

		if (!languageId) {
			throw new Error(
				JSON.stringify({
					en: `languageId field is required`,
					tr: `languageId alanı zorunlu`
				})
			);
		}

		if (requiredFieldsForPatch) {
			requiredFieldsForPatch.map((value) => {
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

		const upsertedLanguage = await Model.Language.findByIdAndUpdate(
			languageId,
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

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
	try {
		let language = await Model.Language.findById(params?.languageId);

		return json({
			status: true,
			language
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ params }) => {
	try {
		let language = await Model.Language.findByIdAndDelete(params?.languageId);

		return json({
			status: true,
			language
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
