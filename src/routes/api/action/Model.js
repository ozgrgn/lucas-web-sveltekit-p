import mongoose from 'mongoose';
import db from '$lib/db.js';
const ActionSchema = new mongoose.Schema(
	{
		lang: String,
		name: String,
		text: String,
		order: Number,
		
	},
	{ timestamps: true }
);

export const Action = mongoose.model('action', ActionSchema);

export default { Action };

