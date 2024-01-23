import mongoose from 'mongoose';

const PingSchema = new mongoose.Schema(
	{
		ping: String
	},
	{ timestamps: true }
);

export const Ping = mongoose.model('ping', PingSchema);

export default { Ping };
