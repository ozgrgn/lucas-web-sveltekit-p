import mongoose from 'mongoose';
const PropSchema = new mongoose.Schema(
	{
		perma: String,
		name: { type: Object, default: {} },
		description: { type: Object, default: {} },
		price: { type: Object, default: {} },
		currency: { type: Object, default: {} },
		no: Number,
		date: Date,
		propType: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'propType'
		},
		
		propCat: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'propCat'
		},
		
		propStatus: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'propStatus'
		},
		
		staff: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'staff'
		},
		city: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'city'
		},
		
		state: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'state'
		},
		
		district: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'district'
		},
		
		images: { type: [], default: [] },
		coverImage: String,
		roomNumber: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'roomNumber'
		},
		
		netm2: Number,
		brutm2: Number,
		floorNo: String,
		buildingFloors: String,
		sold: Date,
		rent: Date,
		siteName: String,
		view: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'view'
		},
		
		height: String,
		year: Number,
		climatic1: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'climatic'
		},
		
		climatic2: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'climatic'
		},
		
		climatic3: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'climatic'
		},
	
		bathroom: String,
		wc: String,
		balcone: Boolean,
		teras: Boolean,
		flatsInFloor: String,
		dues: String,
		furnished: Boolean,
		iskanStatus: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'iskanStatus'
		},
		imarStatus: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'imarStatus'
		},
		
		useStatus: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'useStatus'
		},
	
		tapuStatus: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'tapuStatus'
		},
		
		tapuTransfer: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'tapuTransfer'
		},
		
		facade: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'facade'
		},
		
		elevator: Boolean,
		pool: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'pool'
		},
		

		sport: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'sport'
		},
		

		otopark: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'otopark'
		},	
		kitchen: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'kitchen'
		},
	
		security: Boolean,
		camSystem: Boolean,
		doorman: Boolean,
		jenerator: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'jenerator'
		},
		
		citizenship: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'citizenship'
		},
		
		fireStair: Boolean,
		rentPeriod: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'rentPeriod'
		},
		rentTime: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
			ref: 'rentTime'
		},
		deposit: String,
		assignPrice: String,
		realEstateComm:String,
		ada: String,
		parsel: String,
		videoLink:String,
		virtualLink:String,
		driveLink:String,
		propMap:String,
		metaTitle: String,
		metaDescription: String,
		order: Number,
		isActive: Boolean,
		yearRange:String
	},
	{ timestamps: true }
);

export const Prop = mongoose.model('prop', PropSchema);

export default { Prop };
