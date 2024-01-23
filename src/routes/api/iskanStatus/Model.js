import mongoose from 'mongoose';
const IskanStatusSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const IskanStatus = mongoose.model('iskanStatus', IskanStatusSchema);

export default { IskanStatus };
