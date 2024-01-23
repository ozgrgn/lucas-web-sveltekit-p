import mongoose from 'mongoose';
const JeneratorSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const Jenerator = mongoose.model('jenerator', JeneratorSchema);

export default { Jenerator };
