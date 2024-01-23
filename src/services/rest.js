import Http from './http';
import ENV from '../env';

const sendMail = (lang, name, phone, email, message) => {
	return Http.post(`${ENV.API_URL}/services/email`, {
		lang,
		name,
		phone,
		email,
		message
	});
};

const login = (email, password) => {
	return Http.post(`${ENV.API_URL}/admin/login`, { email, password });
};

const uploadImage = (file) => {
	const formData = new FormData();

	formData.append('file', file);

	return Http.postFormData(`${ENV.API_URL}/services/file-upload`, formData);
};
const downloadImage = (fileUrl, type) => {
	let data = {};
	if (fileUrl) {
		data.fileUrl = fileUrl;
	}
	if (type) {
		data.type = type;
	}

	return Http.get(`${ENV.API_URL}/services/file-download`, data);
};
// PropTypes

// PropCats
const getPropCats = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/propCat`, { ...data });
};
const addPropCat = (data) => {
	return Http.post(`${ENV.API_URL}/propCat`, data);
};

const updatePropCat = (propCatId, data) => {
	return Http.patch(`${ENV.API_URL}/propCat/${propCatId}`, {
		...data
	});
};

const getPropCat = (propCatId) => {
	return Http.get(`${ENV.API_URL}/propCat/${propCatId}`);
};

const deletePropCat = (propCatId) => {
	return Http.delete(`${ENV.API_URL}/propCat/${propCatId}`);
};
// PropStatuss
const getPropStatuss = (limit, skip, propCat) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (propCat) {
		data.propCat = propCat;
	}
	return Http.get(`${ENV.API_URL}/propStatus`, { ...data });
};
const addPropStatus = (data) => {
	return Http.post(`${ENV.API_URL}/propStatus`, data);
};

const updatePropStatus = (propStatusId, data) => {
	return Http.patch(`${ENV.API_URL}/propStatus/${propStatusId}`, {
		...data
	});
};

const getPropStatus = (propStatusId) => {
	return Http.get(`${ENV.API_URL}/propStatus/${propStatusId}`);
};

const deletePropStatus = (propStatusId) => {
	return Http.delete(`${ENV.API_URL}/propStatus/${propStatusId}`);
};

const getPropTypes = (limit, skip, propCat, propStatus) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (propCat) {
		data.propCat = propCat;
	}
	if (propStatus) {
		data.propStatus = propStatus;
	}
	return Http.get(`${ENV.API_URL}/propType`, { ...data });
};
const addPropType = (data) => {
	return Http.post(`${ENV.API_URL}/propType`, data);
};

const updatePropType = (propTypeId, data) => {
	return Http.patch(`${ENV.API_URL}/propType/${propTypeId}`, {
		...data
	});
};

const getPropType = (propTypeId) => {
	return Http.get(`${ENV.API_URL}/propType/${propTypeId}`);
};

const deletePropType = (propTypeId) => {
	return Http.delete(`${ENV.API_URL}/propType/${propTypeId}`);
};

// Citys
const getCitys = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/city`, { ...data });
};
const addCity = (data) => {
	return Http.post(`${ENV.API_URL}/city`, data);
};

const updateCity = (cityId, data) => {
	return Http.patch(`${ENV.API_URL}/city/${cityId}`, {
		...data
	});
};

const getCity = (cityId) => {
	return Http.get(`${ENV.API_URL}/city/${cityId}`);
};

const deleteCity = (cityId) => {
	return Http.delete(`${ENV.API_URL}/city/${cityId}`);
};
// States
const getStates = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/state`, { ...data });
};
const addState = (data) => {
	return Http.post(`${ENV.API_URL}/state`, data);
};

const updateState = (stateId, data) => {
	return Http.patch(`${ENV.API_URL}/state/${stateId}`, {
		...data
	});
};

const getState = (stateId) => {
	return Http.get(`${ENV.API_URL}/state/${stateId}`);
};

const deleteState = (stateId) => {
	return Http.delete(`${ENV.API_URL}/state/${stateId}`);
};
// Districts
const getDistricts = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/district`, { ...data });
};
const addDistrict = (data) => {
	return Http.post(`${ENV.API_URL}/district`, data);
};

const updateDistrict = (districtId, data) => {
	return Http.patch(`${ENV.API_URL}/district/${districtId}`, {
		...data
	});
};

const getDistrict = (districtId) => {
	return Http.get(`${ENV.API_URL}/district/${districtId}`);
};

const deleteDistrict = (districtId) => {
	return Http.delete(`${ENV.API_URL}/district/${districtId}`);
};

// Views
const getViews = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/view`, { ...data });
};
const addView = (data) => {
	return Http.post(`${ENV.API_URL}/view`, data);
};

const updateView = (viewId, data) => {
	return Http.patch(`${ENV.API_URL}/view/${viewId}`, {
		...data
	});
};

const getView = (viewId) => {
	return Http.get(`${ENV.API_URL}/view/${viewId}`);
};

const deleteView = (viewId) => {
	return Http.delete(`${ENV.API_URL}/view/${viewId}`);
};
// Climatics
const getClimatics = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/climatic`, { ...data });
};
const addClimatic = (data) => {
	return Http.post(`${ENV.API_URL}/climatic`, data);
};

const updateClimatic = (climaticId, data) => {
	return Http.patch(`${ENV.API_URL}/climatic/${climaticId}`, {
		...data
	});
};

const getClimatic = (climaticId) => {
	return Http.get(`${ENV.API_URL}/climatic/${climaticId}`);
};

const deleteClimatic = (climaticId) => {
	return Http.delete(`${ENV.API_URL}/climatic/${climaticId}`);
};

// IskanStatuss
const getIskanStatuss = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/iskanStatus`, { ...data });
};
const addIskanStatus = (data) => {
	return Http.post(`${ENV.API_URL}/iskanStatus`, data);
};

const updateIskanStatus = (iskanStatusId, data) => {
	return Http.patch(`${ENV.API_URL}/iskanStatus/${iskanStatusId}`, {
		...data
	});
};

const getIskanStatus = (iskanStatusId) => {
	return Http.get(`${ENV.API_URL}/iskanStatus/${iskanStatusId}`);
};

const deleteIskanStatus = (iskanStatusId) => {
	return Http.delete(`${ENV.API_URL}/iskanStatus/${iskanStatusId}`);
};

// UseStatuss
const getUseStatuss = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/useStatus`, { ...data });
};
const addUseStatus = (data) => {
	return Http.post(`${ENV.API_URL}/useStatus`, data);
};

const updateUseStatus = (useStatusId, data) => {
	return Http.patch(`${ENV.API_URL}/useStatus/${useStatusId}`, {
		...data
	});
};

const getUseStatus = (useStatusId) => {
	return Http.get(`${ENV.API_URL}/useStatus/${useStatusId}`);
};

const deleteUseStatus = (useStatusId) => {
	return Http.delete(`${ENV.API_URL}/useStatus/${useStatusId}`);
};
// Facades
const getFacades = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/facade`, { ...data });
};
const addFacade = (data) => {
	return Http.post(`${ENV.API_URL}/facade`, data);
};

const updateFacade = (facadeId, data) => {
	return Http.patch(`${ENV.API_URL}/facade/${facadeId}`, {
		...data
	});
};

const getFacade = (facadeId) => {
	return Http.get(`${ENV.API_URL}/facade/${facadeId}`);
};

const deleteFacade = (facadeId) => {
	return Http.delete(`${ENV.API_URL}/facade/${facadeId}`);
};
// Sports
const getSports = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/sport`, { ...data });
};
const addSport = (data) => {
	return Http.post(`${ENV.API_URL}/sport`, data);
};

const updateSport = (sportId, data) => {
	return Http.patch(`${ENV.API_URL}/sport/${sportId}`, {
		...data
	});
};

const getSport = (sportId) => {
	return Http.get(`${ENV.API_URL}/sport/${sportId}`);
};

const deleteSport = (sportId) => {
	return Http.delete(`${ENV.API_URL}/sport/${sportId}`);
};

// Otoparks
const getOtoparks = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/otopark`, { ...data });
};
const addOtopark = (data) => {
	return Http.post(`${ENV.API_URL}/otopark`, data);
};

const updateOtopark = (otoparkId, data) => {
	return Http.patch(`${ENV.API_URL}/otopark/${otoparkId}`, {
		...data
	});
};

const getOtopark = (otoparkId) => {
	return Http.get(`${ENV.API_URL}/otopark/${otoparkId}`);
};

const deleteOtopark = (otoparkId) => {
	return Http.delete(`${ENV.API_URL}/otopark/${otoparkId}`);
};
// Kitchens
const getKitchens = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/kitchen`, { ...data });
};
const addKitchen = (data) => {
	return Http.post(`${ENV.API_URL}/kitchen`, data);
};

const updateKitchen = (kitchenId, data) => {
	return Http.patch(`${ENV.API_URL}/kitchen/${kitchenId}`, {
		...data
	});
};

const getKitchen = (kitchenId) => {
	return Http.get(`${ENV.API_URL}/kitchen/${kitchenId}`);
};

const deleteKitchen = (kitchenId) => {
	return Http.delete(`${ENV.API_URL}/kitchen/${kitchenId}`);
};
// Jenerators
const getJenerators = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/jenerator`, { ...data });
};
const addJenerator = (data) => {
	return Http.post(`${ENV.API_URL}/jenerator`, data);
};

const updateJenerator = (jeneratorId, data) => {
	return Http.patch(`${ENV.API_URL}/jenerator/${jeneratorId}`, {
		...data
	});
};

const getJenerator = (jeneratorId) => {
	return Http.get(`${ENV.API_URL}/jenerator/${jeneratorId}`);
};

const deleteJenerator = (jeneratorId) => {
	return Http.delete(`${ENV.API_URL}/jenerator/${jeneratorId}`);
};
// Citizenships
const getCitizenships = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/citizenship`, { ...data });
};
const addCitizenship = (data) => {
	return Http.post(`${ENV.API_URL}/citizenship`, data);
};

const updateCitizenship = (citizenshipId, data) => {
	return Http.patch(`${ENV.API_URL}/citizenship/${citizenshipId}`, {
		...data
	});
};

const getCitizenship = (citizenshipId) => {
	return Http.get(`${ENV.API_URL}/citizenship/${citizenshipId}`);
};

const deleteCitizenship = (citizenshipId) => {
	return Http.delete(`${ENV.API_URL}/citizenship/${citizenshipId}`);
};
// RentPeriods
const getRentPeriods = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/rentPeriod`, { ...data });
};
const addRentPeriod = (data) => {
	return Http.post(`${ENV.API_URL}/rentPeriod`, data);
};

const updateRentPeriod = (rentPeriodId, data) => {
	return Http.patch(`${ENV.API_URL}/rentPeriod/${rentPeriodId}`, {
		...data
	});
};

// RentTimes
const getRentTimes = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/rentTime`, { ...data });
};
const addRentTime = (data) => {
	return Http.post(`${ENV.API_URL}/rentTime`, data);
};

const updateRentTime = (rentTimeId, data) => {
	return Http.patch(`${ENV.API_URL}/rentTime/${rentTimeId}`, {
		...data
	});
};

const getRentTime = (rentTimeId) => {
	return Http.get(`${ENV.API_URL}/rentTime/${rentTimeId}`);
};

const deleteRentTime = (rentTimeId) => {
	return Http.delete(`${ENV.API_URL}/rentTime/${rentTimeId}`);
};
const getRentPeriod = (rentPeriodId) => {
	return Http.get(`${ENV.API_URL}/rentPeriod/${rentPeriodId}`);
};

const deleteRentPeriod = (rentPeriodId) => {
	return Http.delete(`${ENV.API_URL}/rentPeriod/${rentPeriodId}`);
};
// ImarStatuss
const getImarStatuss = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/imarStatus`, { ...data });
};
const addImarStatus = (data) => {
	return Http.post(`${ENV.API_URL}/imarStatus`, data);
};

const updateImarStatus = (imarStatusId, data) => {
	return Http.patch(`${ENV.API_URL}/imarStatus/${imarStatusId}`, {
		...data
	});
};

const getImarStatus = (imarStatusId) => {
	return Http.get(`${ENV.API_URL}/imarStatus/${imarStatusId}`);
};

const deleteImarStatus = (imarStatusId) => {
	return Http.delete(`${ENV.API_URL}/imarStatus/${imarStatusId}`);
};
// TapuStatuss
const getTapuStatuss = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/tapuStatus`, { ...data });
};
const addTapuStatus = (data) => {
	return Http.post(`${ENV.API_URL}/tapuStatus`, data);
};

const updateTapuStatus = (tapuStatusId, data) => {
	return Http.patch(`${ENV.API_URL}/tapuStatus/${tapuStatusId}`, {
		...data
	});
};

const getTapuStatus = (tapuStatusId) => {
	return Http.get(`${ENV.API_URL}/tapuStatus/${tapuStatusId}`);
};

const deleteTapuStatus = (tapuStatusId) => {
	return Http.delete(`${ENV.API_URL}/tapuStatus/${tapuStatusId}`);
};
// TapuTransfers
const getTapuTransfers = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/tapuTransfer`, { ...data });
};
const addTapuTransfer = (data) => {
	return Http.post(`${ENV.API_URL}/tapuTransfer`, data);
};

const updateTapuTransfer = (tapuTransferId, data) => {
	return Http.patch(`${ENV.API_URL}/tapuTransfer/${tapuTransferId}`, {
		...data
	});
};

const getTapuTransfer = (tapuTransferId) => {
	return Http.get(`${ENV.API_URL}/tapuTransfer/${tapuTransferId}`);
};

const deleteTapuTransfer = (tapuTransferId) => {
	return Http.delete(`${ENV.API_URL}/tapuTransfer/${tapuTransferId}`);
};
// Props
const getProps = (limit, skip, isActive, done, propCat, propStatus, propType) => {
	let data = {};

	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (propCat) {
		data.propCat = propCat;
	}
	if (propStatus) {
		data.propStatus = propStatus;
	}
	if (propType) {
		data.propType = propType;
	}
	if (isActive) {
		data.isActive = isActive;
	}
	if (done) {
		data.done = done;
	}

	return Http.get(`${ENV.API_URL}/prop`, { ...data });
};
const addProp = (data) => {
	return Http.post(`${ENV.API_URL}/prop`, data);
};

const updateProp = (propId, data) => {
	return Http.patch(`${ENV.API_URL}/prop/${propId}`, {
		...data
	});
};

const getProp = (propId) => {
	return Http.get(`${ENV.API_URL}/prop/${propId}`);
};
const getUserProp = (propId) => {
	return Http.get(`${ENV.API_URL}/prop/user/${propId}`);
};
const deleteProp = (propId) => {
	return Http.delete(`${ENV.API_URL}/prop/${propId}`);
};
const getPropsQuery = (query) => {
console.log(query,"rest")

	return Http.get(`${ENV.API_URL}/prop/detailed/query/query`, { ...query });
};

// Pools
const getPools = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/pool`, { ...data });
};
const addPool = (data) => {
	return Http.post(`${ENV.API_URL}/pool`, data);
};

const updatePool = (poolId, data) => {
	return Http.patch(`${ENV.API_URL}/pool/${poolId}`, {
		...data
	});
};

const getPool = (poolId) => {
	return Http.get(`${ENV.API_URL}/pool/${poolId}`);
};

const deletePool = (poolId) => {
	return Http.delete(`${ENV.API_URL}/pool/${poolId}`);
};
// RoomNumbers
const getRoomNumbers = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/roomNumber`, { ...data });
};
const addRoomNumber = (data) => {
	return Http.post(`${ENV.API_URL}/roomNumber`, data);
};

const updateRoomNumber = (roomNumberId, data) => {
	return Http.patch(`${ENV.API_URL}/roomNumber/${roomNumberId}`, {
		...data
	});
};

const getRoomNumber = (roomNumberId) => {
	return Http.get(`${ENV.API_URL}/roomNumber/${roomNumberId}`);
};

const deleteRoomNumber = (roomNumberId) => {
	return Http.delete(`${ENV.API_URL}/roomNumber/${roomNumberId}`);
};
// BlogsPages
const getBlogsPages = (limit, skip) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/blogsPage`, { ...data });
};
const addBlogsPage = (data) => {
	return Http.post(`${ENV.API_URL}/blogsPage`, data);
};

const updateBlogsPage = (blogsPageId, data) => {
	return Http.patch(`${ENV.API_URL}/blogsPage/${blogsPageId}`, {
		...data
	});
};

const getBlogsPage = (blogsPageId) => {
	return Http.get(`${ENV.API_URL}/blogsPage/${blogsPageId}`);
};

const deleteBlogsPage = (blogsPageId) => {
	return Http.delete(`${ENV.API_URL}/blogsPage/${blogsPageId}`);
};

// Languages
const getLanguages = (limit, skip) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/language`, { ...data });
};
const addLanguage = (data) => {
	return Http.post(`${ENV.API_URL}/language`, data);
};

const updateLanguage = (languageId, data) => {
	return Http.patch(`${ENV.API_URL}/language/${languageId}`, {
		...data
	});
};

const getLanguage = (languageId) => {
	return Http.get(`${ENV.API_URL}/language/${languageId}`);
};

const deleteLanguage = (languageId) => {
	return Http.delete(`${ENV.API_URL}/language/${languageId}`);
};
// Generals
const getGenerals = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/general`, { ...data });
};
const addGeneral = (data) => {
	return Http.post(`${ENV.API_URL}/general`, data);
};

const updateGeneral = (generalId, data) => {
	return Http.patch(`${ENV.API_URL}/general/${generalId}`, {
		...data
	});
};

const getGeneral = (generalId) => {
	return Http.get(`${ENV.API_URL}/general/${generalId}`);
};

const deleteGeneral = (generalId) => {
	return Http.delete(`${ENV.API_URL}/general/${generalId}`);
};
// Translates
const getTranslates = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/translate`, { ...data });
};
const addTranslate = (data) => {
	return Http.post(`${ENV.API_URL}/translate`, data);
};

const updateTranslate = (translateId, data) => {
	return Http.patch(`${ENV.API_URL}/translate/${translateId}`, {
		...data
	});
};

const getTranslate = (translateId) => {
	return Http.get(`${ENV.API_URL}/translate/${translateId}`);
};

const deleteTranslate = (translateId) => {
	return Http.delete(`${ENV.API_URL}/translate/${translateId}`);
};
// ReferenceLogos
const getReferenceLogos = (limit, skip) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/referenceLogo`, { ...data });
};
const addReferenceLogo = (data) => {
	return Http.post(`${ENV.API_URL}/referenceLogo`, data);
};

const updateReferenceLogo = (referenceLogoId, data) => {
	return Http.patch(`${ENV.API_URL}/referenceLogo/${referenceLogoId}`, {
		...data
	});
};

const getReferenceLogo = (referenceLogoId) => {
	return Http.get(`${ENV.API_URL}/referenceLogo/${referenceLogoId}`);
};

const deleteReferenceLogo = (referenceLogoId) => {
	return Http.delete(`${ENV.API_URL}/referenceLogo/${referenceLogoId}`);
};
// Actions
const getActions = (limit, skip) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/action`, { ...data });
};
const addAction = (data) => {
	return Http.post(`${ENV.API_URL}/action`, data);
};

const updateAction = (actionId, data) => {
	return Http.patch(`${ENV.API_URL}/action/${actionId}`, {
		...data
	});
};

const getAction = (actionId) => {
	return Http.get(`${ENV.API_URL}/action/${actionId}`);
};

const deleteAction = (actionId) => {
	return Http.delete(`${ENV.API_URL}/action/${actionId}`);
};
// Faqs
const getFaqs = (lang, homePage, treatment, treatmentGroup, perma, limit, skip) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (lang) {
		data.lang = lang;
	}
	if (treatmentGroup) {
		data.treatmentGroup = treatmentGroup;
	}
	if (treatment) {
		data.treatment = treatment;
	}
	if (homePage) {
		data.homePage = homePage;
	}
	if (perma) {
		data.perma = perma;
	}

	return Http.get(`${ENV.API_URL}/faq`, { ...data });
};
const addFaq = (data) => {
	return Http.post(`${ENV.API_URL}/faq`, data);
};

const updateFaq = (faqId, data) => {
	return Http.patch(`${ENV.API_URL}/faq/${faqId}`, {
		...data
	});
};

const getFaq = (faqId) => {
	return Http.get(`${ENV.API_URL}/faq/${faqId}`);
};

const deleteFaq = (faqId) => {
	return Http.delete(`${ENV.API_URL}/faq/${faqId}`);
};
// Reviews
const getReviews = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/review`, { ...data });
};
const addReview = (data) => {
	return Http.post(`${ENV.API_URL}/review`, data);
};

const updateReview = (reviewId, data) => {
	return Http.patch(`${ENV.API_URL}/review/${reviewId}`, {
		...data
	});
};

const getReview = (reviewId) => {
	return Http.get(`${ENV.API_URL}/review/${reviewId}`);
};

const deleteReview = (reviewId) => {
	return Http.delete(`${ENV.API_URL}/review/${reviewId}`);
};
// Staffs
const getStaffs = (lang, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/staff`, { ...data });
};
const addStaff = (data) => {
	return Http.post(`${ENV.API_URL}/staff`, data);
};

const updateStaff = (staffId, data) => {
	return Http.patch(`${ENV.API_URL}/staff/${staffId}`, {
		...data
	});
};

const getStaff = (staffId) => {
	return Http.get(`${ENV.API_URL}/staff/${staffId}`);
};

const deleteStaff = (staffId) => {
	return Http.delete(`${ENV.API_URL}/staff/${staffId}`);
};
// TreatmentGroups
const getTreatmentGroups = (lang, limit, skip, perma) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (perma) {
		data.perma = perma;
	}
	return Http.get(`${ENV.API_URL}/treatmentGroup`, { ...data });
};
const addTreatmentGroup = (data) => {
	return Http.post(`${ENV.API_URL}/treatmentGroup`, data);
};

const updateTreatmentGroup = (treatmentGroupId, data) => {
	return Http.patch(`${ENV.API_URL}/treatmentGroup/${treatmentGroupId}`, {
		...data
	});
};

const getTreatmentGroup = (treatmentGroupId) => {
	return Http.get(`${ENV.API_URL}/treatmentGroup/${treatmentGroupId}`);
};

const deleteTreatmentGroup = (treatmentGroupId) => {
	return Http.delete(`${ENV.API_URL}/treatmentGroup/${treatmentGroupId}`);
};

// Treatments
const getTreatments = (lang, treatmentGroup, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (treatmentGroup) {
		data.treatmentGroup = treatmentGroup;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/treatment`, { ...data });
};
const addTreatment = (data) => {
	return Http.post(`${ENV.API_URL}/treatment`, data);
};

const updateTreatment = (treatmentId, data) => {
	return Http.patch(`${ENV.API_URL}/treatment/${treatmentId}`, {
		...data
	});
};

const getTreatment = (treatmentId) => {
	return Http.get(`${ENV.API_URL}/treatment/${treatmentId}`);
};
const getTreatmentViaPerma = (treatmentPerma) => {
	return Http.get(`${ENV.API_URL}/treatment/perma/${treatmentPerma}`);
};
const deleteTreatment = (treatmentId) => {
	return Http.delete(`${ENV.API_URL}/treatment/${treatmentId}`);
};

// BlogCats
const getBlogCats = (lang, treatmentGroup, limit, skip) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (treatmentGroup) {
		data.treatmentGroup = treatmentGroup;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/blogCat`, { ...data });
};
const addBlogCat = (data) => {
	return Http.post(`${ENV.API_URL}/blogCat`, data);
};

const updateBlogCat = (blogCatId, data) => {
	return Http.patch(`${ENV.API_URL}/blogCat/${blogCatId}`, {
		...data
	});
};

const getBlogCat = (blogCatId) => {
	return Http.get(`${ENV.API_URL}/blogCat/${blogCatId}`);
};

const deleteBlogCat = (blogCatId) => {
	return Http.delete(`${ENV.API_URL}/blogCat/${blogCatId}`);
};
// Blogs
const getBlogs = (lang, homePage, blogCat, treatment, limit, skip, perma, search) => {
	let data = {};
	if (lang) {
		data.lang = lang;
	}
	if (blogCat) {
		data.blogCat = blogCat;
	}
	if (treatment) {
		data.treatment = treatment;
	}
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (homePage) {
		data.homePage = homePage;
	}
	if (perma) {
		data.perma = perma;
	}
	if (search) {
		data.search = search;
	}
	return Http.get(`${ENV.API_URL}/blog`, { ...data });
};
const addBlog = (data) => {
	return Http.post(`${ENV.API_URL}/blog`, data);
};

const updateBlog = (blogId, data) => {
	return Http.patch(`${ENV.API_URL}/blog/${blogId}`, {
		...data
	});
};

const getBlog = (blogId) => {
	return Http.get(`${ENV.API_URL}/blog/${blogId}`);
};

const deleteBlog = (blogId) => {
	return Http.delete(`${ENV.API_URL}/blog/${blogId}`);
};
// HomePages
const getHomePages = (limit, skip) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}

	return Http.get(`${ENV.API_URL}/homePage`, { ...data });
};
const addHomePage = (data) => {
	return Http.post(`${ENV.API_URL}/homePage`, data);
};

const updateHomePage = (homePageId, data) => {
	return Http.patch(`${ENV.API_URL}/homePage/${homePageId}`, {
		...data
	});
};

const getHomePage = (homePageId) => {
	return Http.get(`${ENV.API_URL}/homePage/${homePageId}`);
};

const deleteHomePage = (homePageId) => {
	return Http.delete(`${ENV.API_URL}/homePage/${homePageId}`);
};

// AboutUss
const getAboutUss = (limit, skip, lang) => {
	let data = {};
	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (lang) {
		data.lang = lang;
	}

	return Http.get(`${ENV.API_URL}/aboutUs`, { ...data });
};
const addAboutUs = (data) => {
	return Http.post(`${ENV.API_URL}/aboutUs`, data);
};

const updateAboutUs = (aboutUsId, data) => {
	return Http.patch(`${ENV.API_URL}/aboutUs/${aboutUsId}`, {
		...data
	});
};

const getAboutUs = (aboutUsId) => {
	return Http.get(`${ENV.API_URL}/aboutUs/${aboutUsId}`);
};

const deleteAboutUs = (aboutUsId) => {
	return Http.delete(`${ENV.API_URL}/aboutUs/${aboutUsId}`);
};

const getCurrency = () => {
	return Http.get('https://api.genelpara.com/embed/para-birimleri.json');
};

const getCurrencyFromApi = () => {
	return Http.get(`${ENV.API_URL}/currency`);
};
// Projects
const getProjects = (limit, skip, isActive, done, projectCat, projectStatus, projectType) => {
	let data = {};

	if (limit) {
		data.limit = limit;
	}
	if (skip) {
		data.skip = skip;
	}
	if (projectCat) {
		data.projectCat = projectCat;
	}
	if (projectStatus) {
		data.projectStatus = projectStatus;
	}
	if (projectType) {
		data.projectType = projectType;
	}
	if (isActive) {
		data.isActive = isActive;
	}
	if (done) {
		data.done = done;
	}

	return Http.get(`${ENV.API_URL}/project`, { ...data });
};
const addProject = (data) => {
	return Http.post(`${ENV.API_URL}/project`, data);
};

const updateProject = (projectId, data) => {
	return Http.patch(`${ENV.API_URL}/project/${projectId}`, {
		...data
	});
};

const getProject = (projectId) => {
	return Http.get(`${ENV.API_URL}/project/${projectId}`);
};
const getUserProject = (projectId) => {
	return Http.get(`${ENV.API_URL}/project/user/${projectId}`);
};
const deleteProject = (projectId) => {
	return Http.delete(`${ENV.API_URL}/project/${projectId}`);
};
const getProjectsQuery = (query) => {
	return Http.get(`${ENV.API_URL}/project/detailed/query/query`, { ...query });
};

export default {
	sendMail,
	login,
	uploadImage,
	downloadImage,
	getCurrency,
	getCurrencyFromApi,
	//Prop
	getProps,
	getPropsQuery,
	getProp,
	getUserProp,
	addProp,
	updateProp,
	deleteProp,
	//PropCat
	getPropCats,
	getPropCat,
	addPropCat,
	updatePropCat,
	deletePropCat,
	//PropStatus
	getPropStatuss,
	getPropStatus,
	addPropStatus,
	updatePropStatus,
	deletePropStatus,
	//PropType
	getPropTypes,
	getPropType,
	addPropType,
	updatePropType,
	deletePropType,
	//City
	getCitys,
	getCity,
	addCity,
	updateCity,
	deleteCity,
	//State
	getStates,
	getState,
	addState,
	updateState,
	deleteState,
	//District
	getDistricts,
	getDistrict,
	addDistrict,
	updateDistrict,
	deleteDistrict,
	//View
	getViews,
	getView,
	addView,
	updateView,
	deleteView,
	//Climatic
	getClimatics,
	getClimatic,
	addClimatic,
	updateClimatic,
	deleteClimatic,
	//IskanStatus
	getIskanStatuss,
	getIskanStatus,
	addIskanStatus,
	updateIskanStatus,
	deleteIskanStatus,
	//UseStatus
	getUseStatuss,
	getUseStatus,
	addUseStatus,
	updateUseStatus,
	deleteUseStatus,
	//Facade
	getFacades,
	getFacade,
	addFacade,
	updateFacade,
	deleteFacade,
	//Sport
	getSports,
	getSport,
	addSport,
	updateSport,
	deleteSport,
	//Otopark
	getOtoparks,
	getOtopark,
	addOtopark,
	updateOtopark,
	deleteOtopark,
	//Kitchen
	getKitchens,
	getKitchen,
	addKitchen,
	updateKitchen,
	deleteKitchen,
	//Jenerator
	getJenerators,
	getJenerator,
	addJenerator,
	updateJenerator,
	deleteJenerator,
	//Citizenship
	getCitizenships,
	getCitizenship,
	addCitizenship,
	updateCitizenship,
	deleteCitizenship,
	//RentPeriod
	getRentPeriods,
	getRentPeriod,
	addRentPeriod,
	updateRentPeriod,
	deleteRentPeriod,
	//RentTime
	getRentTimes,
	getRentTime,
	addRentTime,
	updateRentTime,
	deleteRentTime,
	//ImarStatus
	getImarStatuss,
	getImarStatus,
	addImarStatus,
	updateImarStatus,
	deleteImarStatus,
	//TapuStatus
	getTapuStatuss,
	getTapuStatus,
	addTapuStatus,
	updateTapuStatus,
	deleteTapuStatus,
	//TapuTransfer
	getTapuTransfers,
	getTapuTransfer,
	addTapuTransfer,
	updateTapuTransfer,
	deleteTapuTransfer,
	//Pool
	getPools,
	getPool,
	addPool,
	updatePool,
	deletePool,
	//RoomNumber
	getRoomNumbers,
	getRoomNumber,
	addRoomNumber,
	updateRoomNumber,
	deleteRoomNumber,
	//BlogsPage
	getBlogsPages,
	getBlogsPage,
	addBlogsPage,
	updateBlogsPage,
	deleteBlogsPage,
	//Language
	getLanguages,
	getLanguage,
	addLanguage,
	updateLanguage,
	deleteLanguage,
	//HomePage
	getHomePages,
	getHomePage,
	addHomePage,
	updateHomePage,
	deleteHomePage,
	//General
	getGenerals,
	getGeneral,
	addGeneral,
	updateGeneral,
	deleteGeneral,
	//Translate
	getTranslates,
	getTranslate,
	addTranslate,
	updateTranslate,
	deleteTranslate,
	//AboutUs
	getAboutUss,
	getAboutUs,
	addAboutUs,
	updateAboutUs,
	deleteAboutUs,
	//ReferenceLogo
	getReferenceLogos,
	getReferenceLogo,
	addReferenceLogo,
	updateReferenceLogo,
	deleteReferenceLogo,
	//Action
	getActions,
	getAction,
	addAction,
	updateAction,
	deleteAction,
	//Faq
	getFaqs,
	getFaq,
	addFaq,
	updateFaq,
	deleteFaq,
	//Review
	getReviews,
	getReview,
	addReview,
	updateReview,
	deleteReview,
	//Staff
	getStaffs,
	getStaff,
	addStaff,
	updateStaff,
	deleteStaff,
	//TreatmentGroup
	getTreatmentGroups,
	getTreatmentGroup,
	addTreatmentGroup,
	updateTreatmentGroup,
	deleteTreatmentGroup,
	//Treatment
	getTreatments,
	getTreatment,
	getTreatmentViaPerma,
	addTreatment,
	updateTreatment,
	deleteTreatment,
	//BlogCat
	getBlogCats,
	getBlogCat,
	addBlogCat,
	updateBlogCat,
	deleteBlogCat,
	//Blog
	getBlogs,
	getBlog,
	addBlog,
	updateBlog,
	deleteBlog,

	//Project
	getProjects,
	getProjectsQuery,
	getProject,
	getUserProject,
	addProject,
	updateProject,
	deleteProject
};
