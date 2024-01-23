import mongoose from 'mongoose';
import db from '$lib/db.js';
const ProjectSchema = new mongoose.Schema(
	{
		perma: String,
		name: { type: Object, default: {} }, //Object for multi language
		description: { type: Object, default: {} },
		no: Number,
		date: Date,
		isActive: Boolean,
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
		type: { type: Object, default: {} },
		siteName: String,
		videoLink: String,
		virtualLink: String,
		driveLink: String,
		propMap: String,
		metaTitle: String,
		metaDescription: String,
		order: Number,
		isActive: Boolean,
		infoDesc: { type: Object, default: {} },
		infoElementsTR: { type: [], default: [] },
		infoElementsEN: { type: [], default: [] },
		infoElementsRU: { type: [], default: [] },
		generalDesc: { type: Object, default: {} },
		generalElementsTR: { type: [], default: [] },
		generalElementsEN: { type: [], default: [] },
		generalElementsRU: { type: [], default: [] },
		technicalDesc: { type: Object, default: {} },
		technicalElementsTR: { type: [], default: [] },
		technicalElementsEN: { type: [], default: [] },
		technicalElementsRU: { type: [], default: [] }
	},
	{ timestamps: true }
);
export const Project = mongoose.model('project', ProjectSchema);

export default { Project };
