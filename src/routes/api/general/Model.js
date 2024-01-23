import mongoose from 'mongoose';
import db from '$lib/db.js';
const GeneralSchema = new mongoose.Schema(
	{
		lang: String,
		bannerTitle: String,
		slogan1: String,
		slogan2: String,
		phone1: String,
		phone2: String,
		whatsapp1: String,
		whatsapp2: String,
		whatsapp3: String,
		companyShortDesc: String,
		copright: String,
		facebook: String,
		reviewHeader: String,
		instagram: String,
		youtube: String,
		address1: String,
		address2: String,
		email1: String,
		email2: String,
		maplink: String,
		generalMetaTitle: String,
		generalMetaDescription: String,
		googleRate:String,
		trustPilotRate:String,
		facebookRate:String,
		faqSpot: String,
		faqHeader: String,
		formSpot: String,
		formHeader: String,
		footer1:String,
		footer1Perma:String,
		footer2:String,
		footer2Perma:String,
		footer3:String,
		footer3Perma:String,
		footer4:String,
		footer4Perma:String,
		cookies:String,
		blogContactLink:String,
		slider:String,

		
	},
	{ timestamps: true }
);

export const General = mongoose.model('general', GeneralSchema);

export default { General };

