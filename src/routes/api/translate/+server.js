import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let query = {};

		let skip = Number(url.searchParams.get('skip') ?? 0);
		let limit = Number(url.searchParams.get('limit') ?? 100);
		let lang = url.searchParams.get('lang') ?? undefined;

		if (lang) {
			query.lang = lang;
		}
		let translates = await Model.Translate.find(query, {}, { limit, skip });
		let count = await Model.Translate.countDocuments({});
		return json({
			status: true,
			translates,
			count
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

let requiredFieldsForPost = ['lang'];
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {
	try {
		let data = await request.json();

		if (requiredFieldsForPost) {
			requiredFieldsForPost.map((value) => {
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
		let translates = await Model.Translate.findOne({ lang: lang }, {}, {});
		if (lang && translates) {
			throw new Error(
				JSON.stringify({
					en: `Bu dil seçeneği ile veri kaydedilmiş.`,
					tr: `There is data with this language option. `
				})
			);
		}
		const upsertedTranslate = await Model.Translate.findOneAndUpdate(
			{ lang },
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
