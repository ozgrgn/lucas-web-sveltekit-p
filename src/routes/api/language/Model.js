import mongoose from 'mongoose';
import db from '$lib/db.js';
const LanguageSchema = new mongoose.Schema(
	{
		lang: String,
		name: String,
		order: Number,
	},
	{ timestamps: true }
);

export const Language = mongoose.model('language', LanguageSchema);

export default { Language };
