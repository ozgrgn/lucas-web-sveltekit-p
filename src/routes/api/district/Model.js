import mongoose from 'mongoose';
import db from '$lib/db.js';
const DistrictSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
		city: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "city"
		},
		state: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "state"
		},
	},
	{ timestamps: true }
);
export const District = mongoose.model('district', DistrictSchema);

export default { District };
