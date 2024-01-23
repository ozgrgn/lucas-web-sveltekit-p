import mongoose from 'mongoose';
const KitchenSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const Kitchen = mongoose.model('kitchen', KitchenSchema);

export default { Kitchen };
