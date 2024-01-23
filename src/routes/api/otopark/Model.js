import mongoose from 'mongoose';
const OtoparkSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const Otopark = mongoose.model('otopark', OtoparkSchema);

export default { Otopark };
