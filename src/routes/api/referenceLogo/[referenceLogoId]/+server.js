import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { referenceLogoId } = params;

		if (!referenceLogoId) {
			throw new Error(
				JSON.stringify({
					en: `referenceLogoId field is required`,
					tr: `referenceLogoId alanı zorunlu`
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

		let { lang, image, perma, order } = data;

		const upsertedReferenceLogo = await Model.ReferenceLogo.findByIdAndUpdate(
			referenceLogoId,
			{
				lang,
				image,
				perma,
				order
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			referenceLogo: upsertedReferenceLogo
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
		let referenceLogo = await Model.ReferenceLogo.findById(params?.referenceLogoId);

		return json({
			status: true,
			referenceLogo
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
		let referenceLogo = await Model.ReferenceLogo.findByIdAndDelete(params?.referenceLogoId);

		return json({
			status: true,
			referenceLogo
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
