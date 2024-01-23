<script>
	import { goto } from '$app/navigation';
	import Input from '$src/lib/components/Form/Input.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import { onMount } from 'svelte';
	import RestService from '$services/rest';
	import ToastService from '$services/toast';
	import NumberInput from '$src/lib/components/Form/NumberInput.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import Date from '$src/lib/components/Form/Date.svelte';
	import Switch from '$src/lib/components/Form/Switch.svelte';
	import ImageArray from '$src/lib/components/Form/ImageArray.svelte';
	import Image from '$src/lib/components/Form/Image.svelte';
	import TextEditor from '$src/lib/components/Form/TextEditor.svelte';

	let name = { tr: {}, en: {}, ru: {} };
	let description = { tr: {}, en: {}, ru: {} };
	let price = { tr: {}, en: {}, ru: {} };
	let currency = { tr: {}, en: {}, ru: {} };
	let perma;
	let no;
	let date;
	let order;
	let propType;
	let propCat;
	let propStatus;
	let staff;
	let district;
	let state;
	let city;
	let images = [];
	let coverImage;
	let roomNumber;
	let netm2;
	let brutm2;
	let floorNo;
	let buildingFloors;
	let sold;
	let rent;
	let siteName;
	let view;
	let height;
	let year;
	let yearRange;
	let climatic1;
	let climatic2;
	let climatic3;
	let bathroom;
	let wc;
	let balcone;
	let teras;
	let flatsInFloor;
	let dues;
	let furnished;
	let iskanStatus;
	let useStatus;
	let tapuStatus;
	let tapuTransfer;
	let facade;
	let elevator;
	let pool;
	let sport;
	let otopark;
	let childPark;
	let kitchen;
	let security;
	let camSystem;
	let doorman;
	let jenerator;
	let citizenship;
	let fireStair;
	let rentPeriod;
	let rentTime;
	let deposit;
	let assignPrice;
	let ada;
	let parsel;
	let imarStatus;
	let realEstateComm;
	let isActive;
	let videoLink;
	let virtualLink;
	let driveLink;
	let propMap;
	let propCats;
	let currencies = [{ name: 'TRY' }, { name: 'USD' }, { name: 'RUB' }];
	let page = 'profile';
	let deleteImage = (index) => {
		images.splice(index, 1);
		images = images;
	};
	const getPropCats = async () => {
		let getPropCatsResponse = await RestService.getPropCats(undefined, undefined);
		if (getPropCatsResponse['status']) {
			console.log(getPropCatsResponse, 'getPropCatsResponse');
			propCats = getPropCatsResponse['propCats'];
			console.log(propCats, 'propCats');
		} else {
			ToastService.error($TranslateApiMessage(getPropCatsResponse.message));
		}
	};
	let propStatuss = [];
	const getPropStatuss = async () => {
		let getPropStatussResponse = await RestService.getPropStatuss(undefined, undefined, propCat);
		if (getPropStatussResponse['status']) {
			console.log(getPropStatussResponse, 'getPropStatussResponse');
			propStatuss = getPropStatussResponse['propStatuss'];
			console.log(propStatus, 'propStatuss');
		} else {
			ToastService.error($TranslateApiMessage(getPropStatussResponse.message));
		}
	};
	let propTypes = [];
	const getPropTypes = async () => {
		let getPropTypesResponse = await RestService.getPropTypes(
			undefined,
			undefined,
			propCat,
			propStatus
		);
		if (getPropTypesResponse['status']) {
			console.log(getPropTypesResponse, 'getPropTypesResponse');
			propTypes = getPropTypesResponse['propTypes'];
			console.log(propTypes, 'propTypes');
		} else {
			ToastService.error($TranslateApiMessage(getPropTypesResponse.message));
		}
	};
	let staffs;
	const getStaffs = async () => {
		let getStaffsResponse = await RestService.getStaffs(undefined, undefined);
		if (getStaffsResponse['status']) {
			console.log(getStaffsResponse, 'getStaffsResponse');
			staffs = getStaffsResponse['staffs'];
			console.log(staffs, 'staffs');
		} else {
			ToastService.error($TranslateApiMessage(getStaffsResponse.message));
		}
	};
	let citys;
	const getCitys = async () => {
		let getCitysResponse = await RestService.getCitys(undefined, undefined);
		if (getCitysResponse['status']) {
			console.log(getCitysResponse, 'getCitysResponse');
			citys = getCitysResponse['citys'];
			console.log(citys, 'citys');
		} else {
			ToastService.error($TranslateApiMessage(getCitysResponse.message));
		}
	};
	let states = [];
	const getStates = async () => {
		let getStatesResponse = await RestService.getStates(undefined, undefined);
		if (getStatesResponse['status']) {
			console.log(getStatesResponse, 'getStatesResponse');
			states = getStatesResponse['states'];
			console.log(states, 'states');
		} else {
			ToastService.error($TranslateApiMessage(getStatesResponse.message));
		}
	};
	let districts = [];
	const getDistricts = async () => {
		let getDistrictsResponse = await RestService.getDistricts(undefined, undefined);
		if (getDistrictsResponse['status']) {
			console.log(getDistrictsResponse, 'getDistrictsResponse');
			districts = getDistrictsResponse['districts'];
			console.log(districts, 'districts');
		} else {
			ToastService.error($TranslateApiMessage(getDistrictsResponse.message));
		}
	};
	let views;
	const getViews = async () => {
		let getViewsResponse = await RestService.getViews(undefined, undefined);
		if (getViewsResponse['status']) {
			console.log(getViewsResponse, 'getViewsResponse');
			views = getViewsResponse['views'];
			console.log(views, 'views');
		} else {
			ToastService.error($TranslateApiMessage(getViewsResponse.message));
		}
	};
	let roomNumbers;
	const getRoomNumbers = async () => {
		let getRoomNumbersResponse = await RestService.getRoomNumbers(undefined, undefined);
		if (getRoomNumbersResponse['status']) {
			console.log(getRoomNumbersResponse, 'getRoomNumbersResponse');
			roomNumbers = getRoomNumbersResponse['roomNumbers'];
			console.log(roomNumbers, 'roomNumbers');
		} else {
			ToastService.error($TranslateApiMessage(getRoomNumbersResponse.message));
		}
	};

	let climatics;
	const getClimatics = async () => {
		let getClimaticsResponse = await RestService.getClimatics(undefined, undefined);
		if (getClimaticsResponse['status']) {
			console.log(getClimaticsResponse, 'getClimaticsResponse');
			climatics = getClimaticsResponse['climatics'];
			console.log(climatics, 'climatics');
		} else {
			ToastService.error($TranslateApiMessage(getClimaticsResponse.message));
		}
	};
	let iskanStatuss;
	const getIskanStatuss = async () => {
		let getIskanStatussResponse = await RestService.getIskanStatuss(undefined, undefined);
		if (getIskanStatussResponse['status']) {
			console.log(getIskanStatussResponse, 'getIskanStatussResponse');
			iskanStatuss = getIskanStatussResponse['iskanStatuss'];
			console.log(iskanStatuss, 'iskanStatuss');
		} else {
			ToastService.error($TranslateApiMessage(getIskanStatussResponse.message));
		}
	};
	let useStatuss;
	const getUseStatuss = async () => {
		let getUseStatussResponse = await RestService.getUseStatuss(undefined, undefined);
		if (getUseStatussResponse['status']) {
			console.log(getUseStatussResponse, 'getUseStatussResponse');
			useStatuss = getUseStatussResponse['useStatuss'];
			console.log(useStatuss, 'useStatuss');
		} else {
			ToastService.error($TranslateApiMessage(getUseStatussResponse.message));
		}
	};
	let tapuStatuss;
	const getTapuStatuss = async () => {
		let getTapuStatussResponse = await RestService.getTapuStatuss(undefined, undefined);
		if (getTapuStatussResponse['status']) {
			console.log(getTapuStatussResponse, 'getTapuStatussResponse');
			tapuStatuss = getTapuStatussResponse['tapuStatuss'];
			console.log(tapuStatuss, 'tapuStatuss');
		} else {
			ToastService.error($TranslateApiMessage(getTapuStatussResponse.message));
		}
	};
	let tapuTransfers;
	const getTapuTransfers = async () => {
		let getTapuTransfersResponse = await RestService.getTapuTransfers(undefined, undefined);
		if (getTapuTransfersResponse['status']) {
			console.log(getTapuTransfersResponse, 'getTapuTransfersResponse');
			tapuTransfers = getTapuTransfersResponse['tapuTransfers'];
			console.log(tapuTransfers, 'tapuTransfers');
		} else {
			ToastService.error($TranslateApiMessage(getTapuTransfersResponse.message));
		}
	};
	let facades;
	const getFacades = async () => {
		let getFacadesResponse = await RestService.getFacades(undefined, undefined);
		if (getFacadesResponse['status']) {
			console.log(getFacadesResponse, 'getFacadesResponse');
			facades = getFacadesResponse['facades'];
			console.log(facades, 'facades');
		} else {
			ToastService.error($TranslateApiMessage(getFacadesResponse.message));
		}
	};
	let sports;
	const getSports = async () => {
		let getSportsResponse = await RestService.getSports(undefined, undefined);
		if (getSportsResponse['status']) {
			console.log(getSportsResponse, 'getSportsResponse');
			sports = getSportsResponse['sports'];
			console.log(sports, 'sports');
		} else {
			ToastService.error($TranslateApiMessage(getSportsResponse.message));
		}
	};
	let otoparks;
	const getOtoparks = async () => {
		let getOtoparksResponse = await RestService.getOtoparks(undefined, undefined);
		if (getOtoparksResponse['status']) {
			console.log(getOtoparksResponse, 'getOtoparksResponse');
			otoparks = getOtoparksResponse['otoparks'];
			console.log(otoparks, 'otoparks');
		} else {
			ToastService.error($TranslateApiMessage(getOtoparksResponse.message));
		}
	};
	let pools;
	const getPools = async () => {
		let getPoolsResponse = await RestService.getPools(undefined, undefined);
		if (getPoolsResponse['status']) {
			console.log(getPoolsResponse, 'getPoolsResponse');
			pools = getPoolsResponse['pools'];
			console.log(pools, 'pools');
		} else {
			ToastService.error($TranslateApiMessage(getPoolsResponse.message));
		}
	};
	let kitchens;
	const getKitchens = async () => {
		let getKitchensResponse = await RestService.getKitchens(undefined, undefined);
		if (getKitchensResponse['status']) {
			console.log(getKitchensResponse, 'getKitchensResponse');
			kitchens = getKitchensResponse['kitchens'];
			console.log(kitchens, 'kitchens');
		} else {
			ToastService.error($TranslateApiMessage(getKitchensResponse.message));
		}
	};
	let jenerators;
	const getJenerators = async () => {
		let getJeneratorsResponse = await RestService.getJenerators(undefined, undefined);
		if (getJeneratorsResponse['status']) {
			console.log(getJeneratorsResponse, 'getJeneratorsResponse');
			jenerators = getJeneratorsResponse['jenerators'];
			console.log(jenerators, 'jenerators');
		} else {
			ToastService.error($TranslateApiMessage(getJeneratorsResponse.message));
		}
	};
	let citizenships;
	const getCitizenships = async () => {
		let getCitizenshipsResponse = await RestService.getCitizenships(undefined, undefined);
		if (getCitizenshipsResponse['status']) {
			console.log(getCitizenshipsResponse, 'getCitizenshipsResponse');
			citizenships = getCitizenshipsResponse['citizenships'];
			console.log(citizenships, 'citizenships');
		} else {
			ToastService.error($TranslateApiMessage(getCitizenshipsResponse.message));
		}
	};
	let rentPeriods;
	const getRentPeriods = async () => {
		let getRentPeriodsResponse = await RestService.getRentPeriods(undefined, undefined);
		if (getRentPeriodsResponse['status']) {
			console.log(getRentPeriodsResponse, 'getRentPeriodsResponse');
			rentPeriods = getRentPeriodsResponse['rentPeriods'];
			console.log(rentPeriods, 'rentPeriods');
		} else {
			ToastService.error($TranslateApiMessage(getRentPeriodsResponse.message));
		}
	};
	let imarStatuss;
	const getImarStatuss = async () => {
		let getImarStatussResponse = await RestService.getImarStatuss(undefined, undefined);
		if (getImarStatussResponse['status']) {
			console.log(getImarStatussResponse, 'getImarStatussResponse');
			imarStatuss = getImarStatussResponse['imarStatuss'];
			console.log(imarStatuss, 'imarStatuss');
		} else {
			ToastService.error($TranslateApiMessage(getImarStatussResponse.message));
		}
	};
	onMount(() => {
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
		getTapuTransfers();
	});

	const addProp = async () => {
		let data = {
			name: { tr: name['tr'].value, en: name['en'].value, ru: name['ru'].value },
			order: order,
			isActive: isActive,
			propCat: propCat,
			propStatus: propStatus,
			perma: perma,
			description: description,
			price: { tr: price['tr'].value, en: price['en'].value, ru: price['ru'].value },
			currency: { tr: currency['tr'].value, en: currency['en'].value, ru: currency['ru'].value },
			no: no,
			date: date,
			propType: propType,
			propCat: propCat,
			propStatus: propStatus,
			staff: staff,
			district: district,
			state: state,
			city: city,
			images: images,
			coverImage: coverImage,
			roomNumber: roomNumber,
			netm2: netm2,
			brutm2: brutm2,
			floorNo: floorNo,
			buildingFloors: buildingFloors,
			sold: sold,
			rent: rent,
			siteName: siteName,
			view: view,
			height: height,
			year: year,
			climatic1: climatic1,
			climatic2: climatic2,
			climatic3: climatic3,
			bathroom: bathroom,
			wc: wc,
			balcone: balcone,
			teras: teras,
			flatsInFloor: flatsInFloor,
			dues: dues,
			furnished: furnished,
			iskanStatus: iskanStatus,
			useStatus: useStatus,
			tapuStatus: tapuStatus,
			tapuTransfer: tapuTransfer,
			facade: facade,
			elevator: elevator,
			pool: pool,
			sport: sport,
			otopark: otopark,
			childPark: childPark,
			kitchen: kitchen,
			security: security,
			camSystem: camSystem,
			doorman: doorman,
			jenerator: jenerator,
			citizenship: citizenship,
			fireStair: fireStair,
			rentPeriod: rentPeriod,
			rentTime: rentTime,
			deposit: deposit,
			assignPrice: assignPrice,
			ada: ada,
			parsel: parsel,
			imarStatus: imarStatus,
			realEstateComm: realEstateComm,
			videoLink: videoLink,
			virtualLink: virtualLink,
			driveLink: driveLink,
			propMap: propMap
		};

		let response = await RestService.addProp(data);
		if (response['status']) {
			ToastService.success('Başarıyla Kayıt Edildi');
			goto('/panel/prop');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<div class="flex">
			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => {
					goto('/panel/prop');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>
		</div>
		<div
			class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
		>
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="text-center flex justify-between items-center">
					<h3 class="font-semibold text-lg text-blueGray-700">Emlak Girişi</h3>
					<div class="flex justify-center">
						<button
							class="lg:w-20 hover:text-white hover:bg-primary {page == 'profile'
								? 'bg-primary text-white'
								: 'bg-white text-primary '} mb-2 border rounded font-medium  text-xs lg:text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => {
								{
									page = 'profile';
								}
							}}
						>
							Profil
						</button>
						<button
							class="lg:w-20 hover:text-white hover:bg-primary {page == 'info'
								? 'bg-primary text-white'
								: 'bg-white text-primary '} mb-2 border rounded font-medium  text-xs lg:text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => {
								{
									page = 'info';
								}
							}}
						>
							Info
						</button>

						<button
							class="lg:w-20 hover:text-white hover:bg-primary {page == 'technical'
								? 'bg-primary text-white'
								: 'bg-white text-primary '} mb-2 border rounded font-medium  text-xs lg:text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => {
								{
									page = 'technical';
								}
							}}
						>
							Teknik Bilgiler
						</button>
						<button
							class="lg:w-20 hover:text-white hover:bg-primary {page == 'features'
								? 'bg-primary text-white'
								: 'bg-white text-primary '} mb-2 border rounded font-medium  text-xs lg:text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => {
								page = 'features';
							}}
						>
							Özellikler
						</button>
						<button
							class="lg:w-20 hover:text-white hover:bg-primary {page == 'media'
								? 'bg-primary text-white'
								: 'bg-white text-primary '} mb-2 border rounded font-medium  text-xs lg:text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => {
								page = 'media';
							}}
						>
							Medya
						</button>
					</div>
					<div class="flex items-center">
						<label class="block text-blueGray-600 text-sm font-bold pr-2" for="grid-name">
							{isActive ? 'Aktif' : 'Pasif'}
						</label>
						<Switch bind:value={isActive} />
					</div>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				<div class="flex flex-wrap my-4 ">
					{#if page == 'info'}
						<div class="w-full lg:w-3/12 px-4 self-center">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Emlak Kategorisi
								</label>
								{#if propCats}
									<Select
										bind:value={propCat}
										change={() => getPropStatuss()}
										values={propCats}
										title={'Kategori seç'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4 self-center">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Emlak Statüsü
								</label>
								{#if propStatuss}
									<Select
										bind:value={propStatus}
										change={() => getPropTypes()}
										values={propStatuss}
										title={'Statü seç'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="relative w-full mb-3 lg:w-3/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Emlak Tipi
							</label>
							{#if propTypes}
								<Select
									bind:value={propType}
									values={propTypes}
									title={'Tip seç'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									valuesTitleKeySub={'tr'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>
						<div class="relative w-full mb-3 lg:w-3/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Temsilci
							</label>
							{#if staffs}
								<Select
									bind:value={staff}
									values={staffs}
									title={'Temsilci seç'}
									valuesKey={'_id'}
									valuesTitleKey={'fullName'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>

						<div class="w-full flex self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Şehir
								</label>
								{#if citys}
									<Select
										bind:value={city}
										change={() => getStates()}
										values={citys}
										title={'Şehir seç'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full flex self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Bölge
								</label>
								{#if states}
									<Select
										bind:value={state}
										change={() => getDistricts()}
										values={states}
										title={'Bölge seç'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Mahalle
							</label>
							{#if districts}
								<Select
									bind:value={district}
									values={districts}
									title={'Mahalle seç'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									valuesTitleKeySub={'tr'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Ada
								</label>
								<Input bind:value={ada} placeholder={'Ada'} required={false} />
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Parsel
								</label>
								<Input bind:value={parsel} placeholder={'Parsel'} required={false} />
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Site İsmi
								</label>
								<Input bind:value={siteName} placeholder={'Doktorlar Sitesi'} required={false} />
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									İlan No
								</label>
								<NumberInput
									bind:value={no}
									placeholder={'İlan No'}
									required={false}
									customClass="h-9 w-full text-md"
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Tarih
								</label>
								<Date bind:value={date} placeholder={'Tarih'} required={false} />
							</div>
						</div>
						<div class="w-full lg:w-4/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Perma
								</label>
								<Input
									bind:value={perma}
									placeholder={'kemerde-satilik-villa'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Kiralanma Tarihi
								</label>
								<Date bind:value={rent} disabled={sold} placeholder={'Tarih'} required={false} />
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Satılma Tarihi
								</label>
								<Date bind:value={sold} disabled={rent} placeholder={'Tarih'} required={false} />
							</div>
						</div>
					{/if}
					{#if page == 'profile'}
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Sıra
							</label>
							<NumberInput
								bind:value={order}
								placeholder={'Sıra No'}
								required={false}
								customClass="h-9 w-full text-md"
							/>
						</div>
					</div>
						<div class="flex flex-wrap my-4 border-b-2 border-2 py-4">
							<div class="w-full lg:w-4/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										İsim Türkçe
									</label>
									<Input
										bind:value={name['tr'].value}
										bind:isValid={name['tr'].isValid}
										placeholder={'İsim Türkçe'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
							</div>
							<div class="w-full lg:w-4/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										İsim İngilizce
									</label>
									<Input
										bind:value={name['en'].value}
										bind:isValid={name['en'].isValid}
										placeholder={'İsim İngilizce'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
							</div>
							<div class="w-full lg:w-4/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										İsim Rusça
									</label>
									<Input
										bind:value={name['ru'].value}
										bind:isValid={name['ru'].isValid}
										placeholder={'İsim Rusça'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
							</div>
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Türkçe Fiyat
									</label>
									<NumberInput
										bind:value={price['tr'].value}
										placeholder={'Fiyat'}
										required={false}
										customClass="h-9 w-full"
									/>
								</div>
							</div>
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Türkçe Para Birimi
									</label>

									{#if currencies}
										<Select
											bind:value={currency['tr'].value}
											values={currencies}
											title={'Para Birimi'}
											valuesKey={'name'}
											valuesTitleKey={'name'}
											customClass={'w-full border-0 h-9 text-md'}
										/>
									{/if}
								</div>
							</div>
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										İngilizce Fiyat
									</label>
									<NumberInput
										bind:value={price['en'].value}
										placeholder={'Fiyat'}
										required={false}
										customClass="h-9 w-full"
									/>
								</div>
							</div>
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										İngilizce Para Birimi
									</label>

									{#if currencies}
										<Select
											bind:value={currency['en'].value}
											values={currencies}
											title={'Para Birimi'}
											valuesKey={'name'}
											valuesTitleKey={'name'}
											customClass={'w-full border-0 h-9 text-md'}
										/>
									{/if}
								</div>
							</div>
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Rusça Fiyat
									</label>
									<NumberInput
										bind:value={price['ru'].value}
										placeholder={'Fiyat'}
										required={false}
										customClass="h-9 w-full"
									/>
								</div>
							</div>
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										İngilizce Para Birimi
									</label>

									{#if currencies}
										<Select
											bind:value={currency['ru'].value}
											values={currencies}
											title={'Para Birimi'}
											valuesKey={'name'}
											valuesTitleKey={'name'}
											customClass={'w-full border-0 h-9 text-md'}
										/>
									{/if}
								</div>
							</div>
						</div>
						<div class="flex flex-wrap my-4  py-4  ">
							<div class="w-full self-center lg:w-4/12 px-4">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Açıklama Türkçe
									</label>
									<TextEditor
										bind:value={description['tr'].value}
										bind:incomingValue={description['tr'].value}
										placeholder={'Açıklama Türkçe'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
							</div>
							<div class="w-full self-center lg:w-4/12 px-4">
								<div class="relative w-full mb-3 ">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Açıklama İngilizce
									</label>
									<TextEditor
										bind:value={description['en'].value}
										bind:incomingValue={description['en'].value}
										placeholder={'Açıklama İngilizce'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
							</div>
							<div class="w-full self-center lg:w-4/12 px-4">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Açıklama Rusça
									</label>
									<TextEditor
										bind:value={description['ru'].value}
										bind:incomingValue={description['ru'].value}
										placeholder={'Açıklama Rusça'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
							</div>
						</div>
					{/if}
					{#if page == 'technical'}
						<div class="w-full  lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Kira Periyodu
								</label>
								{#if rentPeriods}
									<Select
										bind:value={rentPeriod}
										values={rentPeriods}
										title={'Kira Periyodu'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Kira Süresi
								</label>
								<Input
									bind:value={rentTime}
									placeholder={'Kira Süresi'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Aidat
								</label>
								<Input
									bind:value={dues}
									placeholder={'Aidat'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Depozito
								</label>
								<Input
									bind:value={deposit}
									placeholder={'Depozito'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Devir Fiyatı
								</label>
								<Input
									bind:value={assignPrice}
									placeholder={'Devir Fiyatı'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Emlakçı Komisyonu
								</label>
								<Input
									bind:value={realEstateComm}
									placeholder={'Emlakçı Komisyonu'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>

						<div class="w-full flex lg:w-3/12 px-4 self-center">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									İskan Durumu
								</label>
								{#if iskanStatuss}
									<Select
										bind:value={iskanStatus}
										values={iskanStatuss}
										title={'İskan Durumu'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full flex lg:w-3/12 px-4 self-center">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									İmar Durumu
								</label>
								{#if imarStatuss}
									<Select
										bind:value={imarStatus}
										values={imarStatuss}
										title={'İmar Durumu'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full flex lg:w-3/12 px-4 self-center">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Tapu Durumu
								</label>
								{#if tapuStatuss}
									<Select
										bind:value={tapuStatus}
										values={tapuStatuss}
										title={'Tapu Durumu'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full flex lg:w-3/12 px-4 self-center">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Tapu Devri
								</label>
								{#if tapuTransfers}
									<Select
										bind:value={tapuTransfer}
										values={tapuTransfers}
										title={'Tapu Transfer'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full  lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Kullanım Durumu
								</label>
								{#if useStatuss}
									<Select
										bind:value={useStatus}
										values={useStatuss}
										title={'Kullanım Durumu'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full flex self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Oda Sayısı
								</label>
								{#if roomNumbers}
									<Select
										bind:value={roomNumber}
										values={roomNumbers}
										title={'Oda Sayısı'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="relative w-full mb-3 lg:w-1/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Net M2
							</label>

							<NumberInput
								bind:value={netm2}
								placeholder={'m2'}
								required={false}
								customClass="h-9 w-full"
							/>
						</div>
						<div class="relative w-full mb-3 lg:w-1/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Brüt M2
							</label>

							<NumberInput
								bind:value={brutm2}
								placeholder={'m2'}
								required={false}
								customClass="h-9 w-full"
							/>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Bina Kat Sayısı
							</label>

							<NumberInput
								bind:value={buildingFloors}
								placeholder={'Kat Sayısı'}
								required={false}
								customClass="h-9 w-full"
							/>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Kaçıncı Kat?
							</label>

							<Input
								bind:value={floorNo}
								placeholder={'Kaçıncı Kat'}
								required={false}
								customClass="h-9 w-full"
							/>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Katta Kaç Daire Var?
							</label>

							<NumberInput
								bind:value={flatsInFloor}
								placeholder={'Daire Sayısı'}
								required={false}
								customClass="h-9 w-full"
							/>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Tavan Yüksekliği
							</label>

							<NumberInput
								bind:value={height}
								placeholder={'Tavan Yüksekliği'}
								required={false}
								customClass="h-9 w-full"
							/>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Bina Yaşı
							</label>

							<Input
								bind:value={year}
								placeholder={'Bina Yaşı'}
								required={false}
								customClass="h-9 w-full"
							/>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Yaş Aralığı
							</label>
						<Select
								bind:value={yearRange}
								values={[
									{ name: '0', value: '0' },
									{ name: '1-5', value: '1-5' },
									{ name: '6-10', value: '6-10' },
									{ name: '11-15', value: '11-15' },
									{ name: '16-20', value: '16-20' },
									{ name: '20+', value: '20+' },
								]}
								title={'Yaş Aralığı'}
								valuesKey={'value'}
								valuesTitleKey={'name'}
								customClass={'w-full border-0 h-9 text-md'}
							/>
						</div>
					{/if}
					{#if page == 'features'}
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Mobilyalı mı?
								</label>
								{#if views}
									<Select
										bind:value={furnished}
										values={[
											{ name: 'Evet', value: true },
											{ name: 'Hayır', value: false }
										]}
										title={'Mobilyalı mı?'}
										valuesKey={'value'}
										valuesTitleKey={'name'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Manzara
							</label>
							{#if views}
								<Select
									bind:value={view}
									values={views}
									title={'Manzara'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									valuesTitleKeySub={'tr'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Cephe
							</label>
							{#if facades}
								<Select
									bind:value={facade}
									values={facades}
									title={'Cephe'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									valuesTitleKeySub={'tr'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								İklimlendirme 1
							</label>
							{#if climatics}
								<Select
									bind:value={climatic1}
									values={climatics}
									title={'İklimlendirme 1'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									valuesTitleKeySub={'tr'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								İklimlendirme 2
							</label>
							{#if climatics}
								<Select
									bind:value={climatic2}
									values={climatics}
									title={'İklimlendirme 2'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									valuesTitleKeySub={'tr'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								İklimlendirme 3
							</label>
							{#if climatics}
								<Select
									bind:value={climatic3}
									values={climatics}
									title={'İklimlendirme 3'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									valuesTitleKeySub={'tr'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>

						<div class="w-full flex lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Vatandaşlık
								</label>
								{#if citizenships}
									<Select
										bind:value={citizenship}
										values={citizenships}
										title={'Vatandaşlık'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Mutfak
							</label>
							{#if kitchens}
								<Select
									bind:value={kitchen}
									values={kitchens}
									title={'Mutfak'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									valuesTitleKeySub={'tr'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Banyo
							</label>

							<Input
								bind:value={bathroom}
								placeholder={'Banyo'}
								required={false}
								customClass="h-9 w-full"
							/>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								WC
							</label>

							<Input bind:value={wc} placeholder={'WC'} required={false} customClass="h-9 w-full" />
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Balkon
							</label>

							<Select
								bind:value={balcone}
								values={[
									{ name: 'Evet', value: true },
									{ name: 'Hayır', value: false }
								]}
								title={'Balkon'}
								valuesKey={'value'}
								valuesTitleKey={'name'}
								customClass={'w-full border-0 h-9 text-md'}
							/>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Teras
							</label>

							<Select
								bind:value={teras}
								values={[
									{ name: 'Evet', value: true },
									{ name: 'Hayır', value: false }
								]}
								title={'Teras'}
								valuesKey={'value'}
								valuesTitleKey={'name'}
								customClass={'w-full border-0 h-9 text-md'}
							/>
						</div>
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Asansör
								</label>
								<Select
									bind:value={elevator}
									values={[
										{ name: 'Evet', value: true },
										{ name: 'Hayır', value: false }
									]}
									title={'Asansör'}
									valuesKey={'value'}
									valuesTitleKey={'name'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							</div>
						</div>
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Otopark
								</label>
								{#if otoparks}
									<Select
										bind:value={otopark}
										values={otoparks}
										title={'Mutfak'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Havuz
								</label>
								{#if pools}
									<Select
										bind:value={pool}
										values={pools}
										title={'Havuz'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Jenerator?
								</label>
								{#if jenerators}
									<Select
										bind:value={jenerator}
										values={jenerators}
										title={'Jenerator'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Spor İmkanı
								</label>
								{#if sports}
									<Select
										bind:value={sport}
										values={sports}
										title={'Spor İmkanı'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Çocuk Parkı
								</label>
								<Select
									bind:value={furnished}
									values={[
										{ name: 'Evet', value: true },
										{ name: 'Hayır', value: false }
									]}
									title={'Çocuk Parkı'}
									valuesKey={'value'}
									valuesTitleKey={'name'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							</div>
						</div>
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Güvenlik
								</label>
								<Select
									bind:value={security}
									values={[
										{ name: 'Evet', value: true },
										{ name: 'Hayır', value: false }
									]}
									title={'Güvenlik'}
									valuesKey={'value'}
									valuesTitleKey={'name'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							</div>
						</div>
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Kamera Sistemi
								</label>
								<Select
									bind:value={camSystem}
									values={[
										{ name: 'Evet', value: true },
										{ name: 'Hayır', value: false }
									]}
									title={'Kamera Sistemi'}
									valuesKey={'value'}
									valuesTitleKey={'name'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							</div>
						</div>
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Kapıcı
								</label>
								<Select
									bind:value={doorman}
									values={[
										{ name: 'Evet', value: true },
										{ name: 'Hayır', value: false }
									]}
									title={'Kapıcı'}
									valuesKey={'value'}
									valuesTitleKey={'name'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							</div>
						</div>
						<div class="w-full flex  self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Yangın Merdiveni
								</label>
								<Select
									bind:value={fireStair}
									values={[
										{ name: 'Evet', value: true },
										{ name: 'Hayır', value: false }
									]}
									title={'Yangın Merdiveni'}
									valuesKey={'value'}
									valuesTitleKey={'name'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							</div>
						</div>
					{/if}
					{#if page == 'media'}
						<div class="lg:w-6/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Kapak Resmi (1366 × 905)
								</label>
								<Image bind:value={coverImage} placeholder={'Kapak Resmi'} required={false} />
							</div>
							<button
								on:click={() => (images = [...images, { image: null }])}
								class="h-10  bg-red-400 disabled:bg-red-300 text-white active:bg-[#074764] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
								type="button"
							>
								Emlak Resmi Ekle
							</button>
							<div>
								{#if images[0]}
									{#each images as image, index}
										<div class="border mt-2 p-1 grid grid-cols-4">
											<span
												class="px-2 flex flex-col justify-center text-blueGray-600 text-xs font-bold"
												>{index + 1}.{'Resim'}</span
											>
											<div class="col-span-2">
												<ImageArray bind:value={images[index].image} {index} />
											</div>
											<div class="flex flex-col justify-center items-end">
												<button
													on:click={() => deleteImage(index)}
													class="w-14 bg-red-500 hover:bg-red-600 text-white font-bold text-xs m-2 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
													type="button"
												>
													SİL
												</button>
											</div>
										</div>
									{/each}
								{/if}
							</div>
						</div>
						<div class="lg:w-6/12 px-4">
							<div class="flex flex-col">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Video Linki
									</label>
									<Input
										bind:value={videoLink}
										placeholder={'Video Linki'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Sanal Tur Kodu (BAsuVGN6Wat)
									</label>
									<Input
										bind:value={virtualLink}
										placeholder={'Sanal Tur Kodu'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
								<div class="relative w-full mb-3">
										<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
											Drive Linki
										</label>
										<Input
											bind:value={driveLink}
											placeholder={'Drive Linki'}
											required={false}
											customClass="text-md h-9"
										/>
									</div>
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Harita Linki (755x400)
									</label>
									<Input
										bind:value={propMap}
										placeholder={'Harita Linki'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
							</div>
						</div>
					{/if}
				</div>
				<div class="flex flex-wrap">
					<div class="w-full lg:w-12/12 px-4 text-right mt-2">
						<button
							disabled={!name['tr'].isValid}
							class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => addProp()}
						>
							Kaydet
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
