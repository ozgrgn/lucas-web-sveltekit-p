<script>
    import { TranslateApiMessage, Translate } from '$services/language';
const getPropCats = async () => {
    let getPropCatsResponse = await RestService.getPropCats(undefined, undefined);
    if (getPropCatsResponse['status']) {
        console.log(getPropCatsResponse, 'getPropCatsResponse');
        propCats = getPropCatsResponse['propCats'];
        console.log(propCats, 'propCats');
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let propStatuss = [];
const getPropStatuss = async () => {
    let getPropStatussResponse = await RestService.getPropStatuss(undefined, undefined, propCat);
    if (getPropStatussResponse['status']) {
        propStatuss = getPropStatussResponse['propStatuss'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let propTypes = [];
const getPropTypes = async () => {
    let getPropTypesResponse = await RestService.getPropTypes(undefined, undefined);
    if (getPropTypesResponse['status']) {
        propTypes = getPropTypesResponse['propTypes'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let staffs;
const getStaffs = async () => {
    let getStaffsResponse = await RestService.getStaffs(undefined, undefined);
    if (getStaffsResponse['status']) {
        staffs = getStaffsResponse['staffs'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let citys;
const getCitys = async () => {
    let getCitysResponse = await RestService.getCitys(undefined, undefined);
    if (getCitysResponse['status']) {
        citys = getCitysResponse['citys'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let states = [];
const getStates = async () => {
    let getStatesResponse = await RestService.getStates(undefined, undefined);
    if (getStatesResponse['status']) {
        states = getStatesResponse['states'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let districts = [];
const getDistricts = async () => {
    let getDistrictsResponse = await RestService.getDistricts(undefined, undefined);
    if (getDistrictsResponse['status']) {
        districts = getDistrictsResponse['districts'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let views;
const getViews = async () => {
    let getViewsResponse = await RestService.getViews(undefined, undefined);
    if (getViewsResponse['status']) {
        views = getViewsResponse['views'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let roomNumbers;
const getRoomNumbers = async () => {
    let getRoomNumbersResponse = await RestService.getRoomNumbers(undefined, undefined);
    if (getRoomNumbersResponse['status']) {
        roomNumbers = getRoomNumbersResponse['roomNumbers'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};

let climatics;
const getClimatics = async () => {
    let getClimaticsResponse = await RestService.getClimatics(undefined, undefined);
    if (getClimaticsResponse['status']) {
        climatics = getClimaticsResponse['climatics'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let iskanStatuss;
const getIskanStatuss = async () => {
    let getIskanStatussResponse = await RestService.getIskanStatuss(undefined, undefined);
    if (getIskanStatussResponse['status']) {
        iskanStatuss = getIskanStatussResponse['iskanStatuss'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let useStatuss;
const getUseStatuss = async () => {
    let getUseStatussResponse = await RestService.getUseStatuss(undefined, undefined);
    if (getUseStatussResponse['status']) {
        useStatuss = getUseStatussResponse['useStatuss'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let tapuStatuss;
const getTapuStatuss = async () => {
    let getTapuStatussResponse = await RestService.getTapuStatuss(undefined, undefined);
    if (getTapuStatussResponse['status']) {
        tapuStatuss = getTapuStatussResponse['tapuStatuss'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let facades;
const getFacades = async () => {
    let getFacadesResponse = await RestService.getFacades(undefined, undefined);
    if (getFacadesResponse['status']) {
        facades = getFacadesResponse['facades'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let sports;
const getSports = async () => {
    let getSportsResponse = await RestService.getSports(undefined, undefined);
    if (getSportsResponse['status']) {
        sports = getSportsResponse['sports'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let otoparks;
const getOtoparks = async () => {
    let getOtoparksResponse = await RestService.getOtoparks(undefined, undefined);
    if (getOtoparksResponse['status']) {
        otoparks = getOtoparksResponse['otoparks'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let pools;
const getPools = async () => {
    let getPoolsResponse = await RestService.getPools(undefined, undefined);
    if (getPoolsResponse['status']) {
        pools = getPoolsResponse['pools'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let kitchens;
const getKitchens = async () => {
    let getKitchensResponse = await RestService.getKitchens(undefined, undefined);
    if (getKitchensResponse['status']) {
        kitchens = getKitchensResponse['kitchens'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let jenerators;
const getJenerators = async () => {
    let getJeneratorsResponse = await RestService.getJenerators(undefined, undefined);
    if (getJeneratorsResponse['status']) {
        jenerators = getJeneratorsResponse['jenerators'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let citizenships;
const getCitizenships = async () => {
    let getCitizenshipsResponse = await RestService.getCitizenships(undefined, undefined);
    if (getCitizenshipsResponse['status']) {
        citizenships = getCitizenshipsResponse['citizenships'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let rentPeriods;
const getRentPeriods = async () => {
    let getRentPeriodsResponse = await RestService.getRentPeriods(undefined, undefined);
    if (getRentPeriodsResponse['status']) {
        rentPeriods = getRentPeriodsResponse['rentPeriods'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
let imarStatuss;
const getImarStatuss = async () => {
    let getImarStatussResponse = await RestService.getImarStatuss(undefined, undefined);
    if (getImarStatussResponse['status']) {
        imarStatuss = getImarStatussResponse['imarStatuss'];
    } else {
        ToastService.error($TranslateApiMessage(response.message));
    }
};
getPropCats();
		getCitys();
		getStaffs();
		getClimatics();
		getIskanStatuss();
		getUseStatuss();
		getTapuStatuss();
		getFacades();
		getSports();
		getOtoparks();
		getKitchens();
		getJenerators();
		getCitizenships();
		getRentPeriods();
		getImarStatuss();
		getRoomNumbers();
		getViews();
		getPools();
</script>