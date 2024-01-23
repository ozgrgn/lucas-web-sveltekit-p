import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { translateId } = params;

		if (!translateId) {
			throw new Error(
				JSON.stringify({
					en: `translateId field is required`,
					tr: `translateId alanı zorunlu`
				})
			);
		}

		if (requiredFieldsForPatch) {
			requiredFieldsForPatch.map((value) => {
				if (!data[value]) {
					throw new Error(
						JSON.stringify({
							en: `${value} field is required`,
							tr: `${value} alanı zorunlu`
						})
					);
				}
			});
		}

		let {
			lang,
			years,
			yourName,
			yourMail,
			yourPhone,
			yourMessage,
			phoneRequired,
			nameRequired,
			mailRequired,
			phone,
			email,
			whatsapp,
			address,
			image,
			readMore,
			postedOn,
			links,
			mailSent,
			loadMore,
			all,
			categories_BIG,
			clear,
			advancedSearch,
			search,
			house,
			commercial,
			land,
			homepage,
			aboutUs,
			contact,
			propCatName,
			propCatChoose,
			propSatusName,
			propSatusChoose,
			propTypeName,
			protTypeChoose,
			rentByLucas,
			soldByLucas,
			showPortfolio,
			teamMeet,
			teamDesc,
			staffChoose,
			staffName,
			isFurniture,
			furnitureName,
			isSecurity,
			securityName,
			isBalcone,
			balconeName,
			isTeras,
			terasName,
			isElevator,
			elavatorName,
			roomNumberName,
			viewName,
			climaticName,
			facadeName,
			useStatusName,
			iskanStatusName,
			tapuStatusName,
			bathNumberName,
			bathName,
			yearName,
			poolName,
			otoparkName,
			netM2Name,
			brutM2Name,
			filterHeader,
			moreInfo,
			linkCopied,
			description,
			generalInfo,
			depositName,
			rentTimeName,
			rentPeriodName,
			dueName,
			heightName,
			sportName,
			doormanName,
			fireStairName,
			kitchenName,
			camName,
			jeneratorName,
			piece,
			gallery,
			profile,
			featuresName,
			videoName,
			virtualName,
			send,
			housePortfolio,
			project,
			projectPortfolio,
			commPortfolio,
			landPortfolio,
			floorName,
			map,
			noProp,
			sellCost,
			rentCost,
			adaName,
			parselName,
			imarSatusName,
			tapuTransferName,
			citizenshipName,
			yesName,
			noName,
			projectName,
			projectInfoName,
			technicalName,
			driveLinkName
		} = data;

		const upsertedTranslate = await Model.Translate.findByIdAndUpdate(
			translateId,
			{
				lang,
				years,
				yourName,
				yourMail,
				yourPhone,
				yourMessage,
				phoneRequired,
				nameRequired,
				mailRequired,
				phone,
				email,
				whatsapp,
				address,
				image,
				readMore,
				postedOn,
				links,
				mailSent,
				loadMore,
				all,
				categories_BIG,
				clear,
				advancedSearch,
				search,
				house,
				commercial,
				land,
				homepage,
				aboutUs,
				contact,
				propCatName,
				propCatChoose,
				propSatusName,
				propSatusChoose,
				propTypeName,
				protTypeChoose,
				rentByLucas,
				soldByLucas,
				showPortfolio,
				teamMeet,
				teamDesc,
				staffChoose,
				staffName,
				isFurniture,
				furnitureName,
				isSecurity,
				securityName,
				isBalcone,
				balconeName,
				isTeras,
				terasName,
				isElevator,
				elavatorName,
				roomNumberName,
				viewName,
				climaticName,
				facadeName,
				useStatusName,
				iskanStatusName,
				tapuStatusName,
				bathNumberName,
				bathName,
				yearName,
				poolName,
				otoparkName,
				netM2Name,
				brutM2Name,
				filterHeader,
				moreInfo,
				linkCopied,
				description,
				generalInfo,
				depositName,
				rentTimeName,
				rentPeriodName,
				dueName,
				heightName,
				sportName,
				doormanName,
				fireStairName,
				kitchenName,
				camName,
				jeneratorName,
				piece,
				gallery,
				profile,
				featuresName,
				videoName,
				virtualName,
				send,
				housePortfolio,
				project,
				projectPortfolio,
				commPortfolio,
				landPortfolio,
				floorName,
				map,
				noProp,
				sellCost,
				rentCost,
				adaName,
				parselName,
				imarSatusName,
				tapuTransferName,
				citizenshipName,
				yesName,
				noName,
				projectName,
				projectInfoName,
				technicalName,
				driveLinkName
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			translate: upsertedTranslate
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
	try {
		let translate = await Model.Translate.findById(params?.translateId);

		return json({
			status: true,
			translate
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ params }) => {
	try {
		let translate = await Model.Translate.findByIdAndDelete(params?.translateId);

		return json({
			status: true,
			translate
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
