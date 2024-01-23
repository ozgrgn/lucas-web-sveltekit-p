import mongoose from 'mongoose';
const RentPeriodSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const RentPeriod = mongoose.model('rentPeriod', RentPeriodSchema);

export default { RentPeriod };
