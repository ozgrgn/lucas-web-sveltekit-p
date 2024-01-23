import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { blogsPageId } = params;

		if (!blogsPageId) {
			throw new Error(
				JSON.stringify({
					en: `blogsPageId field is required`,
					tr: `blogsPageId alanı zorunlu`
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

		let { lang, spot, header, metaTitle, metaDescription } = data;

		const upsertedBlogPage = await Model.BlogsPage.findByIdAndUpdate(
			blogsPageId,
			{ lang, spot, header, metaTitle, metaDescription },
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			blogPage: upsertedBlogPage
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
		let blogsPage = await Model.BlogsPage.findById(params?.blogsPageId);

		return json({
			status: true,
			blogsPage
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
		let blogsPage = await Model.BlogsPage.findByIdAndDelete(params?.blogsPageId);

		return json({
			status: true,
			blogsPage
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
