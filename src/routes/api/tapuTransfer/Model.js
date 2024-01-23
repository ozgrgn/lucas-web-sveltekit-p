import mongoose from 'mongoose';
const TapuTransferSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const TapuTransfer = mongoose.model('tapuTransfer', TapuTransferSchema);

export default { TapuTransfer };
