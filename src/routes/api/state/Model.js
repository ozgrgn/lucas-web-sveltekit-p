import mongoose from 'mongoose';
import db from '$lib/db.js';
const StateSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
		city: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: "city"
		},
	},
	{ timestamps: true }
);
export const State = mongoose.model('state', StateSchema);

export default { State };
