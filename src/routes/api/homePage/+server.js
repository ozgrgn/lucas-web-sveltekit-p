import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);

		let homePages = await Model.HomePage.find({}, {}, { limit, skip });

		let count = await Model.HomePage.countDocuments({});
		return json({
			status: true,
			homePages,
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

		let { lang, signSpot, signHeader, signText1, signText2, signText3, signText4, signYear, signManagerTitle, signManager, signImage, signAvatar, signatureImage, reviewSpot, reviewHeader, actionSpot, actionHeader, middleBannerTop, middleBannerCenter1, middleBannerCenter2, middleBannerBottom, middleBannerImage,middleBannerLink, formSlogan1, formSlogan2, formButton, formButtonLink, lastBlogsSpot, lastBlogsHeader, lastBlogTopLinkName, lastBlogTopLinkIcon, lastBlogTopLinkPerma, lastBlogLeftLinkIcon, lastBlogLeftLinkName, lastBlogLeftLinkPerma, lastBlogRightLinkImage, lastBlogRightLinkSpot, lastBlogRightLinkHeader, lastBlogRightLinkPerma, metaTitle, metaDescription
		} = data;
		let homePage = await Model.HomePage.findOne({ lang: lang }, {}, {});
		if (lang && homePage) {
			throw new Error(
				JSON.stringify({
					en: `Bu dil seçeneği ile veri kaydedilmiş.`,
					tr: `There is data with this language option. `
				})
			);
		}
		const upsertedHomePage = await Model.HomePage.findOneAndUpdate(
			{ lang },
			{
				lang, signSpot, signHeader, signText1, signText2, signText3, signText4, signYear, signManagerTitle, signManager, signImage, signAvatar, signatureImage, reviewSpot, reviewHeader, actionSpot, actionHeader, middleBannerTop, middleBannerCenter1, middleBannerCenter2, middleBannerBottom, middleBannerImage,middleBannerLink, formSlogan1, formSlogan2, formButton, formButtonLink, lastBlogsSpot, lastBlogsHeader, lastBlogTopLinkName, lastBlogTopLinkIcon, lastBlogTopLinkPerma, lastBlogLeftLinkIcon, lastBlogLeftLinkName, lastBlogLeftLinkPerma, lastBlogRightLinkImage, lastBlogRightLinkSpot, lastBlogRightLinkHeader, lastBlogRightLinkPerma, metaTitle, metaDescription
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			homePage: upsertedHomePage
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
