import mongoose from 'mongoose';
import db from '$lib/db.js';
const PropTypeSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
		propCat: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "propCat"
		},
		propStatus: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "propStatus"
		},
	},
	{ timestamps: true }
);
export const PropType = mongoose.model('propType', PropTypeSchema);

export default { PropType };
