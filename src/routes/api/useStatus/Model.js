import mongoose from 'mongoose';
const UseStatusSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const UseStatus = mongoose.model('useStatus', UseStatusSchema);

export default { UseStatus };
