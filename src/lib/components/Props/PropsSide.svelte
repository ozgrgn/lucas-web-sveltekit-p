<script>
	import {
		lang,
		propQuery,
		boxPropCat,
		boxPropStatus,
		boxPropType,
		translate,
		refresh
	} from '$services/store';
	import Check from '../Filters/Check.svelte';
	import RadioBoolean from '../Filters/RadioBoolean.svelte';
	import { onMount } from 'svelte';
	import RestService from '$services/rest';
	import SelectSmall from '../Form/SelectSmall.svelte';
	import NumberInputSmall from '../Form/NumberInputSmall.svelte';
	import GenericButton from '../Buttons/GenericButton.svelte';
	console.log($translate, 'ffff');
	export let getProps = async () => {};
	export let search = async () => {};
	let numberArray = [1, 2, 3, 4, 5];
	let yearArray = ['0', '1-5', '6-10', '11-15', '16-20', '20+'];
	let propCats = [];

	const getData = async () => {
		await getCurrencies();
		await getProps($propQuery);
	};

	const getCurrencies = async () => {
		let currencies = await RestService.getCurrencyFromApi();

		propQuery.set({
			ready: true,
			staff: $propQuery?.staff ? $propQuery?.staff : null,
			propCat: $propQuery?.dontTouch ? $propQuery?.propCat : $boxPropCat,
			propStatus: $boxPropStatus,
			propType: $boxPropType,
			USD: currencies['currencies'].USD.satis
		});

		if (!$propQuery && $propQuery?.dontTouch) $propQuery.dontTouch = false;
	};
	const getPropCats = async () => {
		let getPropCatsResponse = await RestService.getPropCats(undefined, undefined);
		if (getPropCatsResponse['status']) {
			propCats = getPropCatsResponse['propCats'];
		} else {
			console.log(getPropCatsResponse['message']);
		}
	};
	let propStatuss = [];
	const getPropStatuss = async () => {
		let getPropStatussResponse = await RestService.getPropStatuss(
			undefined,
			undefined,
			$propQuery?.propCat ? $propQuery.propCat : undefined
		);
		if (getPropStatussResponse['status']) {
			console.log(propQuery?.propCat,propStatuss,"propcat,propstatus")
			propStatuss = getPropStatussResponse['propStatuss'];
		} else {
			console.log(getPropStatussResponse['message']);
		}
	};
	let propTypes = [];
	const getPropTypes = async () => {
		let getPropTypesResponse = await RestService.getPropTypes(
			undefined,
			undefined,
			$propQuery?.propCat,
			$propQuery?.propStatus
		);
		if (getPropTypesResponse['status']) {
			propTypes = getPropTypesResponse['propTypes'];
		} else {
			console.log(getPropStatussResponse['message']);
		}
	};
	let roomNumbersArray;
	const getRoomNumbers = async () => {
		let getRoomNumbersResponse = await RestService.getRoomNumbers(undefined, undefined);
		if (getRoomNumbersResponse['status']) {
			roomNumbersArray = getRoomNumbersResponse['roomNumbers'];
		} else {
			console.log(getRoomNumbersResponse['message']);
		}
	};

	let viewsArray;
	const getViews = async () => {
		let getViewsResponse = await RestService.getViews(undefined, undefined);
		if (getViewsResponse['status']) {
			viewsArray = getViewsResponse['views'];
		} else {
			console.log(getViewsResponse['message']);
		}
	};
	let climaticsArray;
	const getClimatics = async () => {
		let getClimaticsResponse = await RestService.getClimatics(undefined, undefined);
		if (getClimaticsResponse['status']) {
			climaticsArray = getClimaticsResponse['climatics'];
		} else {
			console.log(getClimaticsResponse['message']);
		}
	};
	let facadesArray;
	const getFacades = async () => {
		let getFacadesResponse = await RestService.getFacades(undefined, undefined);
		if (getFacadesResponse['status']) {
			facadesArray = getFacadesResponse['facades'];
		} else {
			console.log(getFacadesResponse['message']);
		}
	};

	let useStatussArray;
	const getUseStatuss = async () => {
		let getUseStatussResponse = await RestService.getUseStatuss(undefined, undefined);
		if (getUseStatussResponse['status']) {
			useStatussArray = getUseStatussResponse['useStatuss'];
		} else {
			console.log(getUseStatussResponse['message']);
		}
	};
	let iskanStatussArray;
	const getIskanStatuss = async () => {
		let getIskanStatussResponse = await RestService.getIskanStatuss(undefined, undefined);
		if (getIskanStatussResponse['status']) {
			iskanStatussArray = getIskanStatussResponse['iskanStatuss'];
		} else {
			console.log(getUseStatussResponse['message']);
		}
	};
	let imarStatussArray;
	const getImarStatuss = async () => {
		let getImarStatussResponse = await RestService.getImarStatuss(undefined, undefined);
		if (getImarStatussResponse['status']) {
			imarStatussArray = getImarStatussResponse['imarStatuss'];
		} else {
			console.log(getUseStatussResponse['message']);
		}
	};
	let tapuStatussArray;
	const getTapuStatuss = async () => {
		let getTapuStatussResponse = await RestService.getTapuStatuss(undefined, undefined);
		if (getTapuStatussResponse['status']) {
			tapuStatussArray = getTapuStatussResponse['tapuStatuss'];
		} else {
			console.log(getTapuStatussResponse['message']);
		}
	};
	let poolsArray;
	const getPools = async () => {
		let getPoolsResponse = await RestService.getPools(undefined, undefined);
		if (getPoolsResponse['status']) {
			poolsArray = getPoolsResponse['pools'];
		} else {
			console.log(getPoolsResponse['message']);
		}
	};
	let otoparksArray;
	const getOtoparks = async () => {
		let getOtoparksResponse = await RestService.getOtoparks(undefined, undefined);
		if (getOtoparksResponse['status']) {
			otoparksArray = getOtoparksResponse['otoparks'];
		} else {
			console.log(getOtoparksResponse['message']);
		}
	};
	let staffsArray;
	const getStaffs = async () => {
		let getStaffsResponse = await RestService.getStaffs(undefined, undefined);
		if (getStaffsResponse['status']) {
			staffsArray = getStaffsResponse['staffs'];
		} else {
			console.log(getStaffsResponse['message']);
		}
	};

	onMount(() => {
		getData();
		getPropCats();
		getPropStatuss();
		getPropTypes();
		getRoomNumbers();
		getViews();
		getClimatics();
		getFacades();
		getUseStatuss();
		getIskanStatuss();
		getImarStatuss();
		getTapuStatuss();
		getPools();
		getOtoparks();
		getStaffs();
	});
</script>

{#if $propQuery}
	<div class="">
		<div class="flex flex-col gap-4 w-full ">
			<h3 class="bg-primary text-white rounded-t p-2 text-medium">
				{$translate?.filterHeader}
			</h3>
			<div class="px-7 ">
				{#if $propQuery && $propQuery.ready && propCats}
					<SelectSmall
						bind:value={$propQuery.propCat}
						change={() => {
							boxPropCat.set($propQuery.propCat);
							boxPropStatus.set(null);
							refresh.set(true);
							getPropStatuss();
						}}
						values={propCats}
						title={$translate?.propCatChoose}
						valuesKey={'_id'}
						valuesTitleKey={'name'}
						valuesTitleKeySub={$lang}
						label={$translate?.propCatName}
						customClass={'w-full h-10 border border-black/30 text-black/50 py-1 lg:mx-0 '}
					/>
				{/if}
			</div>
			<div class="px-7">
				{#if $propQuery && $propQuery.ready && propStatuss}
					<SelectSmall
						bind:value={$propQuery.propStatus}
						change={() => {
							$propQuery.propType = null;
							getPropTypes();
							getProps();
						}}
						values={propStatuss}
						title={$translate?.propSatusChoose}
						valuesKey={'_id'}
						valuesTitleKey={'name'}
						valuesTitleKeySub={$lang}
						label={$translate?.propSatusName}
						disabled={!$propQuery.propCat}
						customClass={'w-full h-10 border border-black/30 text-black/50 py-1 lg:mx-0 '}
					/>
				{/if}
			</div>
			<div class="px-7">
				{#if $propQuery && $propQuery.ready && propTypes}
					<SelectSmall
						bind:value={$propQuery.propType}
						values={propTypes}
						title={$translate?.protTypeChoose}
						valuesKey={'_id'}
						valuesTitleKey={'name'}
						valuesTitleKeySub={$lang}
						disabled={!$propQuery.propStatus}
						label={$translate?.propTypeName}
						customClass={'w-full h-10 border border-black/30 text-black/50 py-1 lg:mx-0 '}
					/>
				{/if}
			</div>
			<div class="flex justify-between">
				<div class="px-7">
					{#if $propQuery}
						<NumberInputSmall
							bind:value={$propQuery.minPrice}
							placeholder={'Min TL'}
							label={$propQuery.propStatus == '644ad675532c013f3154e376' ||
							$propQuery.propStatus == '645379555a1b413da119d942' ||
							$propQuery.propStatus == '6453797a5a1b413da119d94b' ||
							$propQuery.propStatus == '645379a35a1b413da119d95d' ||
							$propQuery.propStatus == null
								? $translate?.sellCost
								: $translate?.rentCost}
							customClass={'w-full h-10 border border-black/30 text-black/50 py-1 lg:mx-0 '}
						/>
					{/if}
				</div>
				<span class="align-center self-center text-2xl  font-thin text-black/50">-</span>

				<div class="px-7">
					{#if $propQuery}
						<NumberInputSmall
							bind:value={$propQuery.maxPrice}
							placeholder={'Max TL'}
							customClass={'w-full h-10 border border-black/30 text-black/50 py-1 lg:mx-0 '}
						/>
					{/if}
				</div>
			</div>
			<div class="px-7">
				{#if $propQuery && staffsArray}
					<SelectSmall
						bind:value={$propQuery.staff}
						values={staffsArray}
						title={$translate?.staffChoose}
						valuesKey={'_id'}
						valuesTitleKey={'fullName'}
						label={$translate?.staffName}
						customClass={'w-full h-10 border border-black/30 text-black/50 py-1 lg:mx-0 '}
					/>
				{/if}
			</div>
		</div>
	</div>
	<div class="flex justify-center pt-4">
		<GenericButton
			customClass=" h-7 px-2 bg-secondary text-white text-sm rounded tracking-tight font-medium "
			buttonText={$translate?.search}
			handleClick={() => {
				search();
			}}
		/>
	</div>
	<div class="p-5 pt-2 flex-auto mt-2 ">
		<div class="flex flex-wrap ">
			{#if useStatussArray && $propQuery && $propQuery.useStatus}
				<div class="relative w-full lg:w-1/2 px-2 mb-2">
					<Check
						header={$translate?.useStatusName}
						topHeader={$translate?.useStatusName}
						bind:choicesArray={useStatussArray}
						bind:choices={$propQuery.useStatus}
					/>
				</div>
			{/if}
			{#if iskanStatussArray && $propQuery && $propQuery.iskanStatus && $propQuery.propCat != '64515cc880630110791bfbc2'}
				<div class="relative w-full lg:w-1/2 px-2 mb-2">
					<Check
						header={$translate?.iskanStatusName}
						topHeader={$translate?.iskanStatusName}
						bind:choicesArray={iskanStatussArray}
						bind:choices={$propQuery.iskanStatus}
					/>
				</div>
			{/if}
			{#if imarStatussArray && $propQuery && $translate && $propQuery.propCat == '64515cc880630110791bfbc2'}
				<div class="relative w-full lg:w-1/2 px-2 mb-2">
					<Check
						header={$translate?.imarSatusName}
						topHeader={$translate?.imarSatusName}
						bind:choicesArray={imarStatussArray}
						bind:choices={$propQuery.imarStatus}
					/>
				</div>
			{/if}
			{#if tapuStatussArray && $propQuery && $propQuery.tapuStatus}
				<div class="relative w-full lg:w-1/2 px-2 mb-2">
					<Check
						header={$translate?.tapuStatusName}
						topHeader={$translate?.tapuStatusName}
						bind:choicesArray={tapuStatussArray}
						bind:choices={$propQuery.tapuStatus}
					/>
				</div>
			{/if}
			{#if $propQuery.propCat != '64515cc880630110791bfbc2'}
				<div class="relative w-full lg:w-1/2 px-2 mb-2">
					<RadioBoolean
						header={$translate?.isFurniture}
						topHeader={$translate?.furnitureName}
						bind:result={$propQuery.furnished}
						}
					/>
				</div>
				<div class="relative w-full lg:w-1/2 px-2 mb-2">
					<RadioBoolean
						header={$translate?.isSecurity}
						topHeader={$translate?.securityName}
						bind:result={$propQuery.security}
					/>
				</div>
				<div class="relative w-full lg:w-1/2 px-2 mb-2">
					<RadioBoolean
						header={$translate?.isBalcone}
						topHeader={$translate?.balconeName}
						bind:result={$propQuery.balcone}
					/>
				</div>
				<div class="relative w-full lg:w-1/2 px-2 mb-2">
					<RadioBoolean
						header={$translate?.isTeras}
						topHeader={$translate?.terasName}
						bind:result={$propQuery.teras}
					/>
				</div>
				<div class="relative w-full lg:w-1/2 px-2 mb-2">
					<RadioBoolean
						header={$translate?.isElevator}
						topHeader={$translate?.elavatorName}
						bind:result={$propQuery.elevator}
					/>
				</div>
				{#if roomNumbersArray && $propQuery.ready}
					<div class="relative w-full lg:w-1/2 px-2 mb-2">
						<Check
							header={$translate?.roomNumberName}
							topHeader={$translate?.roomNumberName}
							bind:choicesArray={roomNumbersArray}
							bind:choices={$propQuery.roomNumber}
						/>
					</div>
				{/if}
				{#if viewsArray && $propQuery && $propQuery.view}
					<div class="relative w-full lg:w-1/2 px-2 mb-2">
						<Check
							header={$translate?.viewName}
							topHeader={$translate?.viewName}
							bind:choicesArray={viewsArray}
							bind:choices={$propQuery.view}
						/>
					</div>
				{/if}
				{#if climaticsArray && $propQuery && $propQuery.climatic}
					<div class="relative w-full lg:w-1/2 px-2 mb-2">
						<Check
							header={$translate?.climaticName}
							topHeader={$translate?.climaticName}
							bind:choicesArray={climaticsArray}
							bind:choices={$propQuery.climatic}
						/>
					</div>
				{/if}
				{#if facadesArray && $propQuery && $propQuery.facade}
					<div class="relative w-full lg:w-1/2 px-2 mb-2">
						<Check
							header={$translate?.facadeName}
							topHeader={$translate?.facadeName}
							bind:choicesArray={facadesArray}
							bind:choices={$propQuery.facade}
						/>
					</div>
				{/if}

				{#if numberArray && $propQuery && staffsArray}
					<div class="relative w-full lg:w-1/2 px-2 mb-2">
						<Check
							header={$translate?.bathNumberName}
							topHeader={$translate?.bathNumberName}
							bind:choicesArray={numberArray}
							notObject={true}
							bind:choices={$propQuery.bathroom}
						/>
					</div>
				{/if}
				{#if yearArray && $propQuery && staffsArray && $propQuery.yearRange}
					<div class="relative w-full lg:w-1/2 px-2 mb-2">
						<Check
							header={$translate?.yearName}
							topHeader={$translate?.yearName}
							bind:choicesArray={yearArray}
							notObject={true}
							bind:choices={$propQuery.yearRange}
						/>
					</div>
				{/if}
				{#if poolsArray && $propQuery && $propQuery.pool}
					<div class="relative w-full lg:w-1/2 px-2 mb-2">
						<Check
							header={$translate?.poolName}
							topHeader={$translate?.poolName}
							bind:choicesArray={poolsArray}
							bind:choices={$propQuery.pool}
						/>
					</div>
				{/if}
				{#if otoparksArray && $propQuery && $propQuery.otopark}
					<div class="relative w-full lg:w-1/2 px-2 mb-2">
						<Check
							header={$translate?.otoparkName}
							topHeader={$translate?.otoparkName}
							bind:choicesArray={otoparksArray}
							bind:choices={$propQuery.otopark}
						/>
					</div>
				{/if}
			{/if}
		</div>
		{#if $propQuery.propCat != '64515cc880630110791bfbc2'}
			<div class="flex justify-center pt-4">
				<GenericButton
					customClass=" h-7 px-2 bg-secondary text-white text-sm rounded tracking-tight font-medium "
					buttonText={$translate?.search}
					handleClick={() => {
						search();
					}}
				/>
			</div>
		{/if}
	</div>

	<!-- <div class="px-10 pt-10">
			<Form />
		</div> -->
{/if}

<style>
</style>
