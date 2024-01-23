import mongoose from 'mongoose';
import db from '$lib/db.js';
const BlogsPageSchema = new mongoose.Schema(
	{
		lang: String,
		spot: String,
		header: String,
		metaTitle: String,
		metaDescription: String
	},
	{ timestamps: true }
);

export const BlogsPage = mongoose.model('blogs_page', BlogsPageSchema);

export default { BlogsPage };
