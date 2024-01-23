import mongoose from 'mongoose';
const RentTimeSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const RentTime = mongoose.model('rentTime', RentTimeSchema);

export default { RentTime };
