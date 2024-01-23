<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$components/Form/Input.svelte';
	import { onMount } from 'svelte';
	import { modal } from '$services/store';
	import { bind } from 'svelte-simple-modal';
	import Alert from '$components/Panel/Alert.svelte';
	import { TranslateApiMessage } from '$services/language';
	import ToastService from '$services/toast';
	import NumberInput from '$src/lib/components/Form/NumberInput.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import Switch from '$src/lib/components/Form/Switch.svelte';
	import ImageArray from '$src/lib/components/Form/ImageArray.svelte';
	import TextEditor from '$src/lib/components/Form/TextEditor.svelte';
	import Date from '$src/lib/components/Form/Date.svelte';
	import Image from '$src/lib/components/Form/Image.svelte';

	const deletePropApprove = (propId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteProp(propId);
					}
					modal.set(null);
				}
			})
		);
	};
	let processing = false;
	let editedProp = {};
	let prop;
	export let data;
	let values = [
		{ key: 'name' },
		{ key: 'price' },
		{ key: 'currency' },
		{ key: 'description' },
		{ key: 'perma', doNotEdit: true },
		{ key: 'isActive', doNotEdit: true },
		{ key: 'no', doNotEdit: true },
		{ key: 'date', doNotEdit: true },
		{ key: 'order', doNotEdit: true },
		{ key: 'propType', doNotEdit: true },
		{ key: 'propCat', doNotEdit: true },
		{ key: 'propStatus', doNotEdit: true },
		{ key: 'staff', doNotEdit: true },
		{ key: 'district', doNotEdit: true },
		{ key: 'state', doNotEdit: true },
		{ key: 'city', doNotEdit: true },
		{ key: 'coverImage', doNotEdit: true },
		{ key: 'roomNumber', doNotEdit: true },
		{ key: 'netm2', doNotEdit: true },
		{ key: 'brutm2', doNotEdit: true },
		{ key: 'floorNo', doNotEdit: true },
		{ key: 'buildingFloors', doNotEdit: true },
		{ key: 'sold', doNotEdit: true },
		{ key: 'rent', doNotEdit: true },
		{ key: 'siteName', doNotEdit: true },
		{ key: 'view', doNotEdit: true },
		{ key: 'height', doNotEdit: true },
		{ key: 'year', doNotEdit: true },
		{ key: 'yearRange', doNotEdit: true },
		{ key: 'climatic1', doNotEdit: true },
		{ key: 'climatic2', doNotEdit: true },
		{ key: 'climatic3', doNotEdit: true },
		{ key: 'bathroom', doNotEdit: true },
		{ key: 'wc', doNotEdit: true },
		{ key: 'balcone', doNotEdit: true },
		{ key: 'teras', doNotEdit: true },
		{ key: 'flatsInFloor', doNotEdit: true },
		{ key: 'dues', doNotEdit: true },
		{ key: 'furnished', doNotEdit: true },
		{ key: 'iskanStatus', doNotEdit: true },
		{ key: 'useStatus', doNotEdit: true },
		{ key: 'tapuStatus', doNotEdit: true },
		{ key: 'tapuTransfer', doNotEdit: true },
		{ key: 'facade', doNotEdit: true },
		{ key: 'elevator', doNotEdit: true },
		{ key: 'pool', doNotEdit: true },
		{ key: 'sport', doNotEdit: true },
		{ key: 'otopark', doNotEdit: true },
		{ key: 'childPark', doNotEdit: true },
		{ key: 'kitchen', doNotEdit: true },
		{ key: 'security', doNotEdit: true },
		{ key: 'camSystem', doNotEdit: true },
		{ key: 'doorman', doNotEdit: true },
		{ key: 'jenerator', doNotEdit: true },
		{ key: 'citizenship', doNotEdit: true },
		{ key: 'fireStair', doNotEdit: true },
		{ key: 'rentPeriod', doNotEdit: true },
		{ key: 'rentTime', doNotEdit: true },
		{ key: 'deposit', doNotEdit: true },
		{ key: 'assignPrice', doNotEdit: true },
		{ key: 'ada', doNotEdit: true },
		{ key: 'parsel', doNotEdit: true },
		{ key: 'imarStatus', doNotEdit: true },
		{ key: 'realEstateComm', doNotEdit: true },
		{ key: 'videoLink', doNotEdit: true },
		{ key: 'virtualLink', doNotEdit: true },
		{ key: 'propMap', doNotEdit: true },
		{ key: 'driveLink', doNotEdit: true }

	];
	let page = '';
	let propCat;
	let propCats;
	let currencies = [{ name: 'TRY' }, { name: 'USD' }, { name: 'RUB' }];

	let deleteImage = (index) => {
		prop.images.splice(index, 1);
		prop.images = prop.images;
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
		let getPropStatussResponse = await RestService.getPropStatuss(
			undefined,
			undefined,
			prop?.propCat?.value
		);
		if (getPropStatussResponse['status']) {
			console.log(getPropStatussResponse, 'getPropStatussResponse');
			propStatuss = getPropStatussResponse['propStatuss'];
			console.log(propStatuss, 'propStatuss');
			getPropTypes();
		} else {
			ToastService.error($TranslateApiMessage(getPropStatussResponse.message));
		}
	};
	let propTypes = [];
	const getPropTypes = async () => {
		let getPropTypesResponse = await RestService.getPropTypes(
			undefined,
			undefined,
			prop.propCat.value,
			prop.propStatus.value
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
			getDistricts();
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
	let rentTimes;
	const getRentTimes = async () => {
		let getRentTimesResponse = await RestService.getRentTimes(undefined, undefined);
		if (getRentTimesResponse['status']) {
			console.log(getRentTimesResponse, 'getRentTimesResponse');
			rentTimes = getRentTimesResponse['rentTimes'];
			console.log(rentTimes, 'rentTimes');
		} else {
			ToastService.error($TranslateApiMessage(getRentTimesResponse.message));
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

	const updateProp = async () => {
		processing = true;
		console.log(prop, 'dsdfs');
		editedProp.images = prop.images;
		if (statusGroup(prop.propStatus.value) == 'SATILIK') {
			prop.rent.value = null;
		} else {
			prop.sold.value = null;
		}
		if (!prop?.propCat?.value || !prop?.propStatus?.value) {
			ToastService.error('Kategori ve Statüyü Boş Bırakırsanız Hiç Olmaz !');
			return;
		}
		values.map((v) => {
			if (v.doNotEdit) {
				editedProp[v.key] = prop[v.key].value;
			} else {
				editedProp[v.key] = { tr: null, en: null };
				editedProp[v.key]['tr'] = prop[v.key]['tr'].value;
				editedProp[v.key]['en'] = prop[v.key]['en'].value;
				editedProp[v.key]['ru'] = prop[v.key]['ru'].value;
			}
		});

		let response = await RestService.updateProp(prop._id, editedProp);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/prop');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
		processing = false;
	};

	const getProp = async () => {
		let response = await RestService.getProp(data.propId);
		console.log(response);
		if (response['status']) {
			console.log(response);
			values.map((v) => {
				// 	if (response['prop'] && !response['prop'][v.key] ) {
				// 	response['prop'][v.key] = {};
				// }
				if (v.doNotEdit) {
					response['prop'][v.key] = {
						value: response['prop'][v.key]
					};
				} else {
					if (response['prop']) {
						if (!response['prop'][v.key]) {
							response['prop'][v.key] = {};
						}
						console.log(response['prop'][v.key]['tr'], [v.key], 'sdfsdfsfsdfsdfsfsd');
						response['prop'][v.key]['tr'] = {
							value: response['prop'][v.key]['tr']
						};
						response['prop'][v.key]['en'] = {
							value: response['prop'][v.key]['en']
						};
						response['prop'][v.key]['ru'] = {
							value: response['prop'][v.key]['ru']
						};
					}
				}
			});
			prop = {
				...response['prop']
			};
			if (prop.propCat.value) {
				getPropStatuss(prop.propCat.value);
				getStates(prop.city.value);
			}
			console.log(prop, 'pspspspspspspsspsp');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getProp();

	const deleteProp = async (propId) => {
		let response = await RestService.deleteProp(propId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			goto('/panel/prop');
		} else {
			ToastService.success('İşlem başarılı');
		}
	};
	const statusGroup = (propStatusId) => {
		let status = propStatuss.find((x) => x._id == propStatusId);
		console.log(status, 'statussssssssss');
		return status?.group;
	};
	const devir = (propStatusId) => {
		let status = propStatuss.find((x) => x._id == propStatusId);
		console.log(status, 'statussssssssss');
		return status?.devir;
	};
	onMount(() => {
		getProp();
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
		getRentTimes();
		getImarStatuss();
		getRoomNumbers();
		getViews();
		getPools();
		getTapuTransfers();
	});
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<div class="flex justify-between">
			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => {
					goto('/panel/prop');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deletePropApprove(data.propId)}
			>
				<i class="fa fa-trash" />
				Sil
			</button>
		</div>

		<div
			class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
		>
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="text-center flex justify-between items-center">
					<h3 class="font-semibold text-lg text-blueGray-700">Emlak Güncelle</h3>
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
						{#if prop}
							<label class="block text-blueGray-600 text-sm font-bold pr-2" for="grid-name">
								{prop?.isActive.value ? 'Aktif' : 'Pasif'}
							</label>
							<Switch bind:value={prop.isActive.value} />
						{/if}
					</div>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if prop}
					<div class="flex flex-wrap my-4 ">
						{#if page == 'info'}
							<div class="w-full lg:w-3/12 px-4 self-center">
								<div class="relative w-full mb-3 ">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Emlak Kategorisi
									</label>
									{#if propCats}
										<Select
											bind:value={prop.propCat.value}
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
											bind:value={prop.propStatus.value}
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
										bind:value={prop.propType.value}
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
										bind:value={prop.staff.value}
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
											bind:value={prop.city.value}
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
											bind:value={prop.state.value}
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
										bind:value={prop.district.value}
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
									<Input bind:value={prop.ada.value} placeholder={'Ada'} required={false} />
								</div>
							</div>
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Parsel
									</label>
									<Input bind:value={prop.parsel.value} placeholder={'Parsel'} required={false} />
								</div>
							</div>
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Site İsmi
									</label>
									<Input
										bind:value={prop.siteName.value}
										placeholder={'Doktorlar Sitesi'}
										required={false}
									/>
								</div>
							</div>

							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										İlan No
									</label>
									<NumberInput
										bind:value={prop.no.value}
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
									<Date bind:value={prop.date.value} placeholder={'Tarih'} required={false} />
								</div>
							</div>
							<div class="w-full lg:w-4/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Perma
									</label>
									<Input
										bind:value={prop.perma.value}
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
									<Date
										bind:value={prop.rent.value}
										disabled={statusGroup(prop.propStatus.value) == 'SATILIK'}
										placeholder={'Tarih'}
										required={false}
									/>
								</div>
							</div>
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Satılma Tarihi
									</label>
									<Date
										bind:value={prop.sold.value}
										disabled={statusGroup(prop.propStatus.value) == 'KİRALIK'}
										placeholder={'Tarih'}
										required={false}
									/>
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
									bind:value={prop.order.value}
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
											bind:value={prop.name['tr'].value}
											bind:isValid={prop.name['tr'].isValid}
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
											bind:value={prop.name['en'].value}
											bind:isValid={prop.name['en'].isValid}
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
											bind:value={prop.name['ru'].value}
											bind:isValid={prop.name['ru'].isValid}
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
											bind:value={prop.price['tr'].value}
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
												bind:value={prop.currency['tr'].value}
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
											bind:value={prop.price['en'].value}
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
												bind:value={prop.currency['en'].value}
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
											bind:value={prop.price['ru'].value}
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
												bind:value={prop.currency['ru'].value}
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
											bind:value={prop.description['tr'].value}
											bind:incomingValue={prop.description['tr'].value}
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
											bind:value={prop.description['en'].value}
											bind:incomingValue={prop.description['en'].value}
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
											bind:value={prop.description['ru'].value}
											bind:incomingValue={prop.description['ru'].value}
											placeholder={'Açıklama Rusça'}
											required={false}
											customClass="text-md h-9"
										/>
									</div>
								</div>
							</div>
						{/if}
						{#if page == 'technical'}
							{#if statusGroup(prop.propStatus.value) == 'KİRALIK'}
								<div class="w-full  lg:w-2/12 px-4 self-center">
									<div class="relative w-full mb-3 ">
										<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
											Kira Periyodu
										</label>
										{#if rentPeriods}
											<Select
												bind:value={prop.rentPeriod.value}
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
							{/if}
							{#if statusGroup(prop.propStatus.value) == 'KİRALIK'}
								<div class="w-full lg:w-2/12 px-4 self-center">
									<div class="relative w-full mb-3">
										<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
											Kira Süresi
										</label>
										{#if rentTimes}
											<Select
												bind:value={prop.rentTime.value}
												values={rentTimes}
												title={'Kira Süresi'}
												valuesKey={'_id'}
												valuesTitleKey={'name'}
												valuesTitleKeySub={'tr'}
												customClass={'w-full border-0 h-9 text-md'}
											/>
										{/if}
									</div>
								</div>
							{/if}
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Aidat
									</label>
									<Input
										bind:value={prop.dues.value}
										placeholder={'Aidat'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
							</div>
							{#if statusGroup(prop.propStatus.value) == 'KİRALIK'}
								<div class="w-full lg:w-2/12 px-4 self-center">
									<div class="relative w-full mb-3">
										<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
											Depozito
										</label>
										<Input
											bind:value={prop.deposit.value}
											placeholder={'Depozito'}
											required={false}
											customClass="text-md h-9"
										/>
									</div>
								</div>
							{/if}
							{#if devir(prop?.propStatus?.value)}
								<div class="w-full lg:w-2/12 px-4 self-center">
									<div class="relative w-full mb-3">
										<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
											Devir Fiyatı
										</label>
										<Input
											bind:value={prop.assignPrice.value}
											placeholder={'Devir Fiyatı'}
											required={false}
											customClass="text-md h-9"
										/>
									</div>
								</div>
							{/if}
							<div class="w-full lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Emlakçı Komisyonu
									</label>
									<Input
										bind:value={prop.realEstateComm.value}
										placeholder={'Emlakçı Komisyonu'}
										required={false}
										customClass="text-md h-9"
									/>
								</div>
							</div>

							<div class="w-full flex lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3 ">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										İskan Durumu
									</label>
									{#if iskanStatuss}
										<Select
											bind:value={prop.iskanStatus.value}
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
							{#if prop.propCat == '64515cc880630110791bfbc2'}
								<div class="w-full flex lg:w-2/12 px-4 self-center">
									<div class="relative w-full mb-3 ">
										<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
											İmar Durumu
										</label>
										{#if imarStatuss}
											<Select
												bind:value={prop.imarStatus.value}
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
							{/if}
							<div class="w-full flex lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3 ">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Tapu Durumu
									</label>
									{#if tapuStatuss}
										<Select
											bind:value={prop.tapuStatus.value}
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
							<div class="w-full flex lg:w-2/12 px-4 self-center">
								<div class="relative w-full mb-3 ">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Tapu Devri
									</label>
									{#if tapuTransfers}
										<Select
											bind:value={prop.tapuTransfer.value}
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
											bind:value={prop.useStatus.value}
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
											bind:value={prop.roomNumber.value}
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
									bind:value={prop.netm2.value}
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
									bind:value={prop.brutm2.value}
									placeholder={'m2'}
									required={false}
									customClass="h-9 w-full"
								/>
							</div>
							{#if prop.propType.value == '644acdf467133dd96468fa5a'}
								<div class="relative w-full mb-3 lg:w-2/12 px-4">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Bina Kat Sayısı
									</label>

									<NumberInput
										bind:value={prop.buildingFloors.value}
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
										bind:value={prop.floorNo.value}
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
										bind:value={prop.flatsInFloor.value}
										placeholder={'Daire Sayısı'}
										required={false}
										customClass="h-9 w-full"
									/>
								</div>
							{/if}
							<div class="relative w-full mb-3 lg:w-2/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Kat Yüksekliği
								</label>

								<NumberInput
									bind:value={prop.height.value}
									placeholder={'Kat Yüksekliği'}
									required={false}
									customClass="h-9 w-full"
								/>
							</div>
							<div class="relative w-full mb-3 lg:w-2/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Bina Yaşı
								</label>

								<Input
									bind:value={prop.year.value}
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
									bind:value={prop.yearRange.value}
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
							{#if prop?.propCat?.value != '64515cc880630110791bfbc2'}
								<div class="w-full flex  self-center lg:w-2/12 px-4">
									<div class="relative w-full mb-3">
										<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
											Mobilyalı mı?
										</label>
										{#if views}
											<Select
												bind:value={prop.furnished.value}
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
							{/if}
							<div class="relative w-full mb-3 lg:w-2/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Manzara
								</label>
								{#if views}
									<Select
										bind:value={prop.view.value}
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
										bind:value={prop.facade.value}
										values={facades}
										title={'Cephe'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
							{#if prop?.propCat?.value != '64515cc880630110791bfbc2'}
								<div class="relative w-full mb-3 lg:w-2/12 px-4">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										İklimlendirme 1
									</label>
									{#if climatics}
										<Select
											bind:value={prop.climatic1.value}
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
											bind:value={prop.climatic2.value}
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
											bind:value={prop.climatic3.value}
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
												bind:value={prop.citizenship.value}
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
											bind:value={prop.kitchen.value}
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
										bind:value={prop.bathroom.value}
										placeholder={'Banyo'}
										required={false}
										customClass="h-9 w-full"
									/>
								</div>
								<div class="relative w-full mb-3 lg:w-2/12 px-4">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										WC
									</label>

									<Input
										bind:value={prop.wc.value}
										placeholder={'WC'}
										required={false}
										customClass="h-9 w-full"
									/>
								</div>
								<div class="relative w-full mb-3 lg:w-2/12 px-4">
									<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
										Balkon
									</label>

									<Select
										bind:value={prop.balcone.value}
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
										bind:value={prop.teras.value}
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
											bind:value={prop.elevator.value}
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
												bind:value={prop.otopark.value}
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
												bind:value={prop.pool.value}
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
												bind:value={prop.jenerator.value}
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
												bind:value={prop.sport.value}
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
											bind:value={prop.furnished.value}
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
											bind:value={prop.security.value}
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
											bind:value={prop.camSystem.value}
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
											bind:value={prop.doorman.value}
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
											bind:value={prop.fireStair.value}
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
						{/if}
						{#if page == 'media'}
							<div class="lg:w-6/12 px-4">
								<div class="relative w-full mb-3">
									<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
										Kapak Resmi (1366 × 905)
									</label>
									<Image
										bind:value={prop.coverImage.value}
										placeholder={'Kapak Resmi'}
										required={false}
									/>
								</div>
								<button
									on:click={() => (prop.images = [...prop.images, { image: null }])}
									class="h-10  bg-red-400 disabled:bg-red-300 text-white active:bg-[#074764] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
									type="button"
								>
									Emlak Resmi Ekle
								</button>
								<div>
									{#if prop.images[0]}
										{#each prop.images as image, index}
											<div class="border mt-2 p-1 grid grid-cols-4">
												<span
													class="px-2 flex flex-col justify-center text-blueGray-600 text-xs font-bold"
													>{index + 1}.{'Resim'}</span
												>
												<div class="col-span-2">
													<ImageArray bind:value={prop.images[index].image} {index} />
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
											bind:value={prop.videoLink.value}
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
											bind:value={prop.virtualLink.value}
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
											bind:value={prop.driveLink.value}
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
											bind:value={prop.propMap.value}
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
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateProp()}
								disabled={!prop.name['tr']}
								class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
								type="button"
							>
								Güncelle
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
