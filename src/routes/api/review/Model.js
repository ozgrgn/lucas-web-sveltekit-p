import mongoose from 'mongoose';
import db from '$lib/db.js';
const ReviewSchema = new mongoose.Schema(
	{
		lang: String,
		reviewName: String,
		reviewDate: String,
		reviewPlatform: String,
		reviewText: String,
		reviewStars:String,
		reviewLink:String,
		reviewAvatar:String,
		order:Number
		
	},
	{ timestamps: true }
);

export const Review = mongoose.model('review', ReviewSchema);

export default { Review };

