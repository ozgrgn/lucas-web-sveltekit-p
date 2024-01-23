import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { blogId } = params;

		if (!blogId) {
			throw new Error(
				JSON.stringify({
					en: `blogId field is required`,
					tr: `blogId alanı zorunlu`
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

		let { lang, homePage, blogCat, treatment, date, order, blogHeader, blogshortDesc, text, textId, text2, text2Id, text3, text3Id, blogThumb, blogImage, perma, blogContactLink } = data;

		const upsertedBlog = await Model.Blog.findByIdAndUpdate(
			blogId,
			{
				lang, homePage, blogCat, treatment, date, order, blogHeader, blogshortDesc, text, textId, text2, text2Id, text3, text3Id, blogThumb, blogImage, perma, blogContactLink
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			blog: upsertedBlog
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
		let blog = await Model.Blog.findById(params?.blogId);

		return json({
			status: true,
			blog
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
		let blog = await Model.Blog.findByIdAndDelete(params?.blogId);

		return json({
			status: true,
			blog
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
