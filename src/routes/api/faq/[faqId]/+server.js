import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { faqId } = params;

		if (!faqId) {
			throw new Error(
				JSON.stringify({
					en: `faqId field is required`,
					tr: `faqId alanı zorunlu`
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

		let {
			lang,
			name,
			treatment,
			treatmentGroup,
			homePage,
			faq1q,
			faq1a,
			faq2q,
			faq2a,
			faq3q,
			faq3a,
			faq4q,
			faq4a,
			faq5q,
			faq5a,
			faq6q,
			faq6a,
			faq7q,
			faq7a,
			faq8q,
			faq8a,
			faq9q,
			faq9a,
			faq10q,
			faq10a,
			perma
		} = data;

		const upsertedFaq = await Model.Faq.findByIdAndUpdate(
			faqId,
			{
			lang,
			name,
			treatment,
			treatmentGroup,
			homePage,
			faq1q,
			faq1a,
			faq2q,
			faq2a,
			faq3q,
			faq3a,
			faq4q,
			faq4a,
			faq5q,
			faq5a,
			faq6q,
			faq6a,
			faq7q,
			faq7a,
			faq8q,
			faq8a,
			faq9q,
			faq9a,
			faq10q,
			faq10a,
			perma
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			faq: upsertedFaq
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
		let faq = await Model.Faq.findById(params?.faqId);

		return json({
			status: true,
			faq
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
		let faq = await Model.Faq.findByIdAndDelete(params?.faqId);

		return json({
			status: true,
			faq
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
