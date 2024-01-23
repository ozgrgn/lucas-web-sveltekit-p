import mongoose from 'mongoose';
const TapuStatusSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const TapuStatus = mongoose.model('tapuStatus', TapuStatusSchema);

export default { TapuStatus };
