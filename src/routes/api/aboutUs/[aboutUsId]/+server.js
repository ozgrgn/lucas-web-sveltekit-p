import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { aboutUsId } = params;

		if (!aboutUsId) {
			throw new Error(
				JSON.stringify({
					en: `aboutUsId field is required`,
					tr: `aboutUsId alanı zorunlu`
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

		let { lang, text1, text2, staffText, metaTitle, metaDescription, image1, image2 } = data;

		const upsertedAboutUs = await Model.AboutUs.findByIdAndUpdate(
			aboutUsId,
			{
				lang,
				text1,
				text2,
				staffText,
				metaTitle,
				metaDescription,
				image1,
				image2
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

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
	try {
		let aboutUs = await Model.AboutUs.findById(params?.aboutUsId);

		return json({
			status: true,
			aboutUs
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
		let aboutUs = await Model.AboutUs.findByIdAndDelete(params?.aboutUsId);

		return json({
			status: true,
			aboutUs
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
