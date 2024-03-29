import mongoose from 'mongoose';
import db from '$lib/db.js';
const TranslateSchema = new mongoose.Schema(
	{
		lang: String,
		aboutUs: String,
		contact: String,
		years: String,
		yourName: String,
		yourPhone: String,
		yourMessage: String,
		yourMail: String,
		phoneRequired: String,
		nameRequired: String,
		mailRequired: String,
		otherTopics: String,
		phone: String,
		email: String,
		whatsapp: String,
		address: String,
		image: String,
		readMore: String,
		postedOn: String,
		links: String,
		mailSent: String,
		loadMore: String,
		all: String,
		categories_BIG:String,
		clear: String,
		advancedSearch: String,
		search: String,
		house: String,
		commercial: String,
		land: String,
		homepage: String,
		propCatName: String,
		propCatChoose: String,
		propSatusName: String,
		propSatusChoose: String,
		propTypeName: String,
		protTypeChoose: String,
		rentByLucas: String,
		soldByLucas: String,
		showPortfolio: String,
		teamMeet: String,
		teamDesc: String,
		staffChoose: String,
		staffName: String,
		isFurniture: String,
		furnitureName: String,
		isSecurity: String,
		securityName: String,
		isBalcone: String,
		balconeName: String,
		isTeras: String,
		terasName: String,
		isElevator: String,
		elavatorName: String,
		roomNumberName: String,
		viewName: String,
		climaticName: String,
		facadeName: String,
		useStatusName: String,
		iskanStatusName: String,
		tapuStatusName: String,
		bathNumberName: String,
		bathName: String,
		yearName: String,
		poolName: String,
		otoparkName: String,
		netM2Name: String,
		brutM2Name: String,
		filterHeader: String,
		moreInfo: String,
		linkCopied: String,
		description: String,
		generalInfo: String,
		depositName: String,
		rentTimeName: String,
		rentPeriodName: String,
		dueName: String,
		heightName: String,
		sportName: String,
		doormanName: String,
		fireStairName: String,
		kitchenName: String,
		camName: String,
		jeneratorName: String,
		piece: String,
		gallery: String,
		profile: String,
		featuresName: String,
		videoName: String,
		virtualName: String,
		send: String,
		sent: String,
		housePortfolio: String,
		project: String,
		projectPortfolio: String,
		commPortfolio: String,
		landPortfolio: String,
		floorName: String,
		map: String,
		noProp: String,
		sellCost: String,
		rentCost: String,
		adaName: String,
		parselName: String,
		imarSatusName: String,
		tapuTransferName: String,
		citizenshipName: String,
		yesName: String,
		noName: String,
		projectName:String,
		projectInfoName:String,
		technicalName:String,
		driveLinkName:String,
	},
	{ timestamps: true }
);

export const Translate = mongoose.model('translate', TranslateSchema);

export default { Translate };
