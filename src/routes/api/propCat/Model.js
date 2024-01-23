import mongoose from 'mongoose';
const PropCatSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const PropCat = mongoose.model('propCat', PropCatSchema);

export default { PropCat };
