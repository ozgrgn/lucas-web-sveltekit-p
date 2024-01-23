import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { blogCatId } = params;

		if (!blogCatId) {
			throw new Error(
				JSON.stringify({
					en: `blogCatId field is required`,
					tr: `blogCatId alanı zorunlu`
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

		let { lang, name, metaTitle, metaDescription, treatmentGroup, order, image, perma } = data;

		const upsertedBlogCat = await Model.BlogCat.findByIdAndUpdate(
			blogCatId,
			{
				lang,
				name,
				metaTitle,
				metaDescription,
				treatmentGroup,
				order,
				image,
				perma
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			blogCat: upsertedBlogCat
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
		let blogCat = await Model.BlogCat.findById(params?.blogCatId);

		return json({
			status: true,
			blogCat
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
		let blogCat = await Model.BlogCat.findByIdAndDelete(params?.blogCatId);

		return json({
			status: true,
			blogCat
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
