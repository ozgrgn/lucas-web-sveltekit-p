import mongoose from 'mongoose';
const ImarStatusSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const ImarStatus = mongoose.model('imarStatus', ImarStatusSchema);

export default { ImarStatus };
