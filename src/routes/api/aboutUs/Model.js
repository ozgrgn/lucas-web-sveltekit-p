import mongoose from 'mongoose';
import db from '$lib/db.js';
const AboutUsSchema = new mongoose.Schema(
	{
		lang: String,
		text1: String,
		text2: String,
		staffText: String,
		metaTitle: String,
		metaDescription: String,
		image1: String,
		image2: String,
	},
	{ timestamps: true }
);

export const AboutUs = mongoose.model('aboutUs', AboutUsSchema);

export default { AboutUs };

