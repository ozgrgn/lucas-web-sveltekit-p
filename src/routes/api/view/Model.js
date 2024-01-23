import mongoose from 'mongoose';
const ViewSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const View = mongoose.model('view', ViewSchema);

export default { View };
