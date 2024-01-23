import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {};
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);
		let isActive = url.searchParams.get('isActive') ?? undefined;
		if (isActive) query.isActive = isActive;


		console.log(query);
		let projects = await Model.Project.find(query, {}, { limit, skip })
			.sort({ order: 1 }).populate(["city","state","district","staff"]);
		let count = await Model.Project.countDocuments({});
		return json({
			status: true,
			projects,
			count
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
let requiredFieldsForPost = [];

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
			perma,
			name,
			description,
			no,
			date,
			order,
			isActive,
			staff,
			city,
			state,
			district,
			images,
			coverImage,
			type,
			siteName,
			videoLink,
			virtualLink,
			driveLink,
			propMap,
			metaTitle,
			metaDescription,
			infoDesc,
			infoElementsTR,
			infoElementsEN,
			infoElementsRU,
			generalDesc,
			generalElementsTR,
			generalElementsEN,
			generalElementsRU,
			technicalDesc,
			technicalElementsTR,
			technicalElementsEN,
			technicalElementsRU
		} = data;

		const project = new Model.Project({
			perma,
			name,
			description,
			no,
			date,
			order,
			isActive,
			staff,
			city,
			state,
			district,
			images,
			coverImage,
			type,
			siteName,
			videoLink,
			virtualLink,
			driveLink,
			propMap,
			metaTitle,
			metaDescription,
			infoDesc,
			infoElementsTR,
			infoElementsEN,
			infoElementsRU,
			generalDesc,
			generalElementsTR,
			generalElementsEN,
			generalElementsRU,
			technicalDesc,
			technicalElementsTR,
			technicalElementsEN,
			technicalElementsRU

		});
		await project.save();
		return json({
			status: true,
			project: project
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
