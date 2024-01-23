import mongoose from 'mongoose';
import db from '$lib/db.js';
const FaqSchema = new mongoose.Schema(
	{
		lang: String,
		name: String,
		faq1q:String,
		faq1a:String,
		faq2q:String,
		faq2a:String,
		faq3q:String,
		faq3a:String,
		faq4q:String,
		faq4a:String,
		faq5q:String,
		faq5a:String,
		faq6q:String,
		faq6a:String,
		faq7q:String,
		faq7a:String,
		faq8q:String,
		faq8a:String,
		faq9q:String,
		faq9a:String,
		faq10q:String,
		faq10a:String,
		homePage:Boolean,
		perma:String,
		treatment: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "treatment"
		},
		treatmentGroup: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "treatmentGroup"
		},
	},
	{ timestamps: true }
);

export const Faq = mongoose.model('faq', FaqSchema);

export default { Faq };

