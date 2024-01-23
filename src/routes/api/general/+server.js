import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {};
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);
		let lang = url.searchParams.get('lang') ?? undefined;
		if (lang) {
			query.lang = lang;
		}
		let generals = await Model.General.find(query, {}, { limit, skip });
		let count = await Model.General.countDocuments({});
		return json({
			status: true,
			generals,
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
			bannerTitle,
			slogan1,
			slogan2,
			phone1,
			phone2,
			whatsapp1,
			whatsapp2,
			address1,
			address2,
			email1,
			email2,
			facebook,
			instagram,
			youtube,
			companyShortDesc,
			copright,
			maplink,
			slider,
			googleRate,
			trustPilotRate,
			facebookRate,
			faqSpot,
			faqHeader,
			formSpot,
			formHeader,
			footer1,
			footer1Perma,
			footer2,
			footer2Perma,
			footer3,
			footer3Perma,
			footer4,
			footer4Perma,
			cookies,
			blogContactLink
		
		} = data;
		let general = await Model.General.findOne({ lang: lang }, {}, {});
		if (lang && general) {
			throw new Error(
				JSON.stringify({
					en: `Bu dil seçeneği ile veri kaydedilmiş.`,
					tr: `There is data with this language option. `
				})
			);
		}
		const upsertedGeneral = await Model.General.findOneAndUpdate(
			{ lang },
			{
				lang,
				bannerTitle,
				slogan1,
				slogan2,
				phone1,
				phone2,
				whatsapp1,
				whatsapp2,
				address1,
				address2,
				email1,
				email2,
				facebook,
				instagram,
				youtube,
				companyShortDesc,
				copright,
				maplink,
				slider,
				googleRate,
				trustPilotRate,
				facebookRate,
				faqSpot,
				faqHeader,
				formSpot,
				formHeader,
				footer1,
				footer1Perma,
				footer2,
				footer2Perma,
				footer3,
				footer3Perma,
				footer4,
				footer4Perma,
				cookies,
				blogContactLink
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			general: upsertedGeneral
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
