import mongoose from 'mongoose';
const PoolSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const Pool = mongoose.model('pool', PoolSchema);

export default { Pool };
