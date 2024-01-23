import mongoose from 'mongoose';
import db from '$lib/db.js';
const BlogSchema = new mongoose.Schema(
	{
		lang: String,
		homePage:Boolean,
		blogCat: String,
		date: Date,
		blogHeader: String,
		blogshortDesc: String,
		text: String,
		textId:String,
		text2: String,
		text2Id:String,
		text3: String,
		text3Id:String,
		order: Number,
		blogThumb: String,
		blogImage: String,
		perma:String,
		blogContactLink:String,
		treatment: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "treatment"
		},
		blogCat: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "blogCat"
		},
	},
	{ timestamps: true }
);

export const Blog = mongoose.model('blog', BlogSchema);

export default { Blog };

