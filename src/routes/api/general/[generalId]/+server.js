import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { generalId } = params;

		if (!generalId) {
			throw new Error(
				JSON.stringify({
					en: `generalId field is required`,
					tr: `generalId alanı zorunlu`
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

		const upsertedGeneral = await Model.General.findByIdAndUpdate(
			generalId,
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

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
	try {
		let general = await Model.General.findById(params?.generalId);

		return json({
			status: true,
			general
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
		let general = await Model.General.findByIdAndDelete(params?.generalId);

		return json({
			status: true,
			general
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
