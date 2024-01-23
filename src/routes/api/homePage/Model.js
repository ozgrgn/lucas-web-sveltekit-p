import mongoose from 'mongoose';
import db from '$lib/db.js';
const HomePageSchema = new mongoose.Schema(
	{
		lang: String,
		signSpot: String,
		signHeader: String,
		signText1: String,
		signText2: String,
		signText3: String,
		signText4: String,
		signYear: String,
		signManager:String,
		signManagerTitle:String,
		signImage: String,
		signAvatar: String,
		signatureImage: String,
		reviewSpot: String,
		reviewHeader: String,
		actionSpot: String,
		actionHeader: String,
		middleBannerTop: String,
		middleBannerCenter1: String,
		middleBannerCenter2: String,
		middleBannerBottom: String,
		middleBannerImage: String,
		middleBannerLink:String,
		formSlogan1: String,
		formSlogan2: String,
		formButton: String,
		formButtonLink: String,
		lastBlogsSpot: String,
		lastBlogsHeader: String,
		lastBlogTopLinkName: String,
		lastBlogTopLinkIcon: String,
		lastBlogTopLinkPerma: String,
		lastBlogLeftLinkIcon: String,
		lastBlogLeftLinkName: String,
		lastBlogLeftLinkPerma: String,
		lastBlogRightLinkImage: String,
		lastBlogRightLinkSpot: String,
		lastBlogRightLinkHeader: String,
		lastBlogRightLinkPerma: String,
		metaTitle: String,
		metaDescription: String,
	},
	{ timestamps: true }
);

export const HomePage = mongoose.model('homePage', HomePageSchema);

export default { HomePage };

