import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { homePageId } = params;

		if (!homePageId) {
			throw new Error(
				JSON.stringify({
					en: `homePageId field is required`,
					tr: `homePageId alanı zorunlu`
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
			signSpot,
			signHeader,
			signText1,
			signText2,
			signText3,
			signText4,
			signYear,
			signManagerTitle,
			signManager,
			signImage,
			signAvatar,
			signatureImage,
			reviewSpot,
			reviewHeader,
			actionSpot,
			actionHeader,
			middleBannerTop,
			middleBannerCenter1,
			middleBannerCenter2,
			middleBannerBottom,
			middleBannerImage,
			middleBannerLink,
			formSlogan1,
			formSlogan2,
			formButton,
			formButtonLink,
			lastBlogsSpot,
			lastBlogsHeader,
			lastBlogTopLinkName,
			lastBlogTopLinkIcon,
			lastBlogTopLinkPerma,
			lastBlogLeftLinkIcon,
			lastBlogLeftLinkName,
			lastBlogLeftLinkPerma,
			lastBlogRightLinkImage,
			lastBlogRightLinkSpot,
			lastBlogRightLinkHeader,
			lastBlogRightLinkPerma,
			metaTitle,
			metaDescription
		} = data;

		const upsertedHomePage = await Model.HomePage.findByIdAndUpdate(
			homePageId,
			{
				lang,
				signSpot,
				signHeader,
				signText1,
				signText2,
				signText3,
				signText4,
				signYear,
				signManagerTitle,
				signManager,
				signImage,
				signAvatar,
				signatureImage,
				reviewSpot,
				reviewHeader,
				actionSpot,
				actionHeader,
				middleBannerTop,
				middleBannerCenter1,
				middleBannerCenter2,
				middleBannerBottom,
				middleBannerImage,
				middleBannerLink,
				formSlogan1,
				formSlogan2,
				formButton,
				formButtonLink,
				lastBlogsSpot,
				lastBlogsHeader,
				lastBlogTopLinkName,
				lastBlogTopLinkIcon,
				lastBlogTopLinkPerma,
				lastBlogLeftLinkIcon,
				lastBlogLeftLinkName,
				lastBlogLeftLinkPerma,
				lastBlogRightLinkImage,
				lastBlogRightLinkSpot,
				lastBlogRightLinkHeader,
				lastBlogRightLinkPerma,
				metaTitle,
				metaDescription
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

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
	try {
		let homePage = await Model.HomePage.findById(params?.homePageId);

		return json({
			status: true,
			homePage
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
		let homePage = await Model.HomePage.findByIdAndDelete(params?.homePageId);

		return json({
			status: true,
			homePage
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
