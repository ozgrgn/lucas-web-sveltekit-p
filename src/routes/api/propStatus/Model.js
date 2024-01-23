import mongoose from 'mongoose';
import db from '$lib/db.js';
const PropStatusSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
		group:String,
		devir:Boolean,
		propCat: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "propCat"
		},
	},
	{ timestamps: true }
);
export const PropStatus = mongoose.model('propStatus', PropStatusSchema);

export default { PropStatus };
