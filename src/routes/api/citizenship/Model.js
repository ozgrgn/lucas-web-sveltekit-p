import mongoose from 'mongoose';
const CitizenshipSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const Citizenship = mongoose.model('citizenship', CitizenshipSchema);

export default { Citizenship };
