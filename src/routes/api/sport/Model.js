import mongoose from 'mongoose';
const SportSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const Sport = mongoose.model('sport', SportSchema);

export default { Sport };
