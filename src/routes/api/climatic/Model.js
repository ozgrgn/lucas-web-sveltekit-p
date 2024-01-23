import mongoose from 'mongoose';
const ClimaticSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const Climatic = mongoose.model('climatic', ClimaticSchema);

export default { Climatic };
