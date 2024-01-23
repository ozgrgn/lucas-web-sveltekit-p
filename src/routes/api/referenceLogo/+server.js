import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);

		let referenceLogos = await Model.ReferenceLogo.find({}, {}, { limit, skip });

		let count = await Model.ReferenceLogo.countDocuments({});
		return json({
			status: true,
			referenceLogos,
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
	
		let { lang, image, perma, order
		} = data;
		const refenceLogo = new Model.ReferenceLogo({
			lang, 
			image, 
			perma, 
			order
		});
		await refenceLogo.save();

		return json({
			status: true,
			referenceLogo: refenceLogo
		});

	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
