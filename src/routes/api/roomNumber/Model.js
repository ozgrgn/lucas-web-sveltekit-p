import mongoose from 'mongoose';
const RoomNumberSchema = new mongoose.Schema(
	{
		name: { type: Object, default: {} }, //Object for multi language
		order:Number, 
		isActive: Boolean,
	},
	{ timestamps: true }
);
export const RoomNumber = mongoose.model('roomNumber', RoomNumberSchema);

export default { RoomNumber };
