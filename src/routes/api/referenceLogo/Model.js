import mongoose from 'mongoose';
import db from '$lib/db.js';
const ReferenceLogoSchema = new mongoose.Schema(
	{
		lang: String,
		image: String,
		perma: String,
		order: Number,
		
	},
	{ timestamps: true }
);

export const ReferenceLogo = mongoose.model('referenceLogo', ReferenceLogoSchema);

export default { ReferenceLogo };

