import mongoose from 'mongoose';
const FacadeSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const Facade = mongoose.model('facade', FacadeSchema);

export default { Facade };
