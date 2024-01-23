import mongoose from 'mongoose';
const CitySchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const City = mongoose.model('city', CitySchema);

export default { City };
