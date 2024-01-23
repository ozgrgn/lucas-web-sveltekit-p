import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {};
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 1000);
		let lang = url.searchParams.get('lang') ?? undefined;
		if (lang) query.lang = lang;
		let homePage = url.searchParams.get('homePage') ?? undefined;
		if (homePage) query.homePage = homePage;
		let treatmentGroup = url.searchParams.get('treatmentGroup') ?? undefined;
		if (treatmentGroup) query.treatmentGroup = treatmentGroup;
		let treatment = url.searchParams.get('treatment') ?? undefined;
		if (treatment) query.treatment = treatment;
		let perma = url.searchParams.get('perma') ?? undefined;
		if (perma) query.perma = perma;

		let faqs = await Model.Faq.find(query, {}, { limit, skip })
			.sort({ order: 1 })
			.populate(['treatmentGroup', 'treatment']);
		let count = await Model.Faq.countDocuments({});
		return json({
			status: true,
			faqs,
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
		const faqs = new Model.Faq({
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
		});

		await faqs.save();

		return json({
			status: true,
			faqs: faqs
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
