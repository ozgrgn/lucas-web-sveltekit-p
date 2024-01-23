import mongoose from 'mongoose';
import db from '$lib/db.js';
const StaffSchema = new mongoose.Schema(
	{
		lang: String,
		fullName: String,
		title:String,
		image: String,
		text: String,
		order: Number,
		email:String,
		phone:String,
		whatsapp:String,
		perma:String
		


	},
	{ timestamps: true }
);

export const Staff = mongoose.model('staff', StaffSchema);

export default { Staff };

