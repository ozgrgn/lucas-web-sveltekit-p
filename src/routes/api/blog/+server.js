import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {};
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? undefined);
		let lang = url.searchParams.get('lang') ?? undefined;
		if (lang) query.lang = lang;
		let homePage = url.searchParams.get('homePage') ?? undefined;
		if (homePage) query.homePage = homePage;
		let blogCat = url.searchParams.get('blogCat') ?? undefined;
		if (blogCat) query.blogCat = blogCat;
		let treatment = url.searchParams.get('treatment') ?? undefined;
		if (treatment) query.treatment = treatment;
		let perma = url.searchParams.get('perma') ?? undefined;
		if (perma) query.perma = perma;
		let search = url.searchParams.get('search') ?? undefined;
		if (search) {

			query.blogHeader ={ $regex: RegExp(search + ".*", "i") } 
		}
		let blogs = await Model.Blog.find(query, {}, { limit, skip })
			.populate(['treatment', 'blogCat'])
			.sort({ order: 1 });
		let count = await Model.Blog.countDocuments(query);

		return json({
			status: true,
			blogs,
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
			homePage,
			blogCat,
			treatment,
			date,
			order,
			blogHeader,
			blogshortDesc,
			text,
			textId,
			text2,
			text2Id,
			text3,
			text3Id,
			blogThumb,
			blogImage,
			perma,
			blogContactLink
		} = data;
		const blogs = new Model.Blog({
			lang,
			homePage,
			blogCat,
			treatment,
			date,
			order,
			blogHeader,
			blogshortDesc,
			text,
			textId,
			text2,
			text2Id,
			text3,
			text3Id,
			blogThumb,
			blogImage,
			perma,
			blogContactLink
		});

		await blogs.save();

		return json({
			status: true,
			blogs: blogs
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

