import mongoose from 'mongoose';
import db from '$lib/db.js';
const AdminSchema = new mongoose.Schema(
	{
		fullName: String,
		email: String,
		password: String,
		isActive: { type: Boolean, default: true },
		super: { type: Boolean, default: false }
	},
	{ timestamps: true }
);

export const Admin = mongoose.model('admin', AdminSchema);

export default { Admin };
