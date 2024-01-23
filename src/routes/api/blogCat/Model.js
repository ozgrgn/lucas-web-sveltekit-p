import mongoose from 'mongoose';
import db from '$lib/db.js';
const BlogCatSchema = new mongoose.Schema(
	{
		lang: String,
		name: String,
		metaTitle: String,
		metaDescription: String,
		order: String,
		image:String,
		perma:String,
		treatmentGroup: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "treatmentGroup"
		},
	},
	{ timestamps: true }
);

export const BlogCat = mongoose.model('blogCat', BlogCatSchema);

export default { BlogCat };

