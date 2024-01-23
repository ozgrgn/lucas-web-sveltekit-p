<script>
	import RestService from '$services/rest';
	import { goto } from '$app/navigation';

	import GenericButton from '../Buttons/GenericButton.svelte';
	import NumberInput from '../Form/NumberInput.svelte';
	import { onMount } from 'svelte';
	import Select from '../Form/Select.svelte';
	import {
		translate,
		propCats,
		boxPropCat,
		boxPropStatus,
		boxPropType,
		desktop,
		lang
	} from '$services/store';
	let propStatuss = [];

	const getPropStatuss = async () => {
		let getPropStatussResponse = await RestService.getPropStatuss(
			undefined,
			undefined,
			$boxPropCat
		);
		if (getPropStatussResponse['status']) {
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
			$boxPropCat,
			$boxPropStatus
		);
		if (getPropTypesResponse['status']) {
			propTypes = getPropTypesResponse['propTypes'];
		} else {
			console.log(getPropTypesResponse['message']);
		}
	};
	let propCat;
	let propStatus;
	let propType;
	let minPrice;
	let maxPrice;

	onMount(() => {
		// boxPropCat.set('644a5b5f67133dd96468f8ee');
		// boxPropStatus.set('644ad675532c013f3154e376');

		getPropStatuss();
		getPropTypes();
	});
	const resetSearch = async () => {
		boxPropCat.set(null);
		boxPropStatus.set(null);
		boxPropType.set(null);
	};
</script>

<div
	class="relative bg-white rounded-t w-full h-36 text-black border-secondary -mt-16 shadow-xl border-t border-t-4 p-4 pt-6 "
>
	<div class="flex gap-4 h-12 w-full lg:px-20">
		<div class="w-2/6">
			{#if $propCats && $propCats[0]}
				<Select
					bind:value={$boxPropCat}
					change={() => {
						propType = null;
						propStatus = null;
						boxPropType.set(null);
						boxPropStatus.set(null);
						getPropStatuss();
						getPropTypes();
					}}
					values={$propCats}
					title={$desktop ? $translate?.propCatChoose : $translate?.propCatName}
					valuesKey={'_id'}
					valuesTitleKey={'name'}
					valuesTitleKeySub={$lang}
					label={$desktop ? $translate?.propCatChoose : $translate?.propCatName}
					customClass={'w-full text-sm md:text-[1rem] h-12 border border-black/30 text-black/50 py-1 lg:mx-0 '}
				/>
			{/if}
		</div>
		<div class="w-2/6">
			{#if propStatuss}
				<Select
					bind:value={$boxPropStatus}
					change={() => {
						boxPropType.set(null);
						getPropTypes();
					}}
					values={propStatuss}
					title={$desktop ? $translate?.propSatusChoose : $translate?.propSatusName}
					valuesKey={'_id'}
					disabled={!$boxPropCat}
					valuesTitleKey={'name'}
					valuesTitleKeySub={$lang}
					label={$desktop ? $translate?.propSatusChoose : $translate?.propSatusName}
					customClass={'w-full text-sm md:text-[1rem] h-12 md:h-12 border border-black/30 text-black/50 py-1 lg:mx-0 '}
				/>
			{/if}
		</div>
		<div class="w-2/6">
			{#if propTypes && $translate}
				<Select
					bind:value={$boxPropType}
					values={propTypes}
					title={$boxPropType? $desktop ? $translate?.protTypeChoose : $translate?.propTypeName:$translate.all}
					valuesKey={'_id'}
					disabled={!$boxPropStatus}
					valuesTitleKey={'name'}
					valuesTitleKeySub={$lang}
					label={$desktop ? $translate?.protTypeChoose : $translate?.propTypeName}
					customClass={'w-full text-sm md:text-[1rem] h-12 border border-black/30 text-black/50 py-1 lg:mx-0 '}
				/>
			{/if}
		</div>
		<!-- <div class="w-1/6">
			<NumberInput
				bind:value={minPrice}
				change={() => {
					getProps();
				}}
				placeholder={'Min $'}
				label="Emlak Fiyatı"
				customClass={'w-full h-12 border border-black/30 text-black/50 py-1 lg:mx-0 '}
			/>
		</div>
		<span class="align-center self-center text-2xl  font-thin text-black/50">-</span>

		<div class="w-1/6">
			<NumberInput
				bind:value={maxPrice}
				change={() => {
					getProps();
				}}
				placeholder={'Max $'}
				customClass={'w-full h-12 border border-black/30 text-black/50 py-1 lg:mx-0 '}
			/>
		</div> -->
	</div>
	<div class="flex justify-center pt-5 gap-2">
		<GenericButton
			customClass="px-2 py-1 text-sm rounded shadow bg-primary text-white"
			buttonText={$translate?.clear}
			handleClick={() => {
				resetSearch();
			}}
		/>
		<GenericButton
			customClass="px-2 py-1 text-sm rounded shadow bg-secondary text-white"
			buttonText={$translate?.advancedSearch}
			handleClick={() => {
				goto('/properties');
			}}
		/>
	</div>
</div>
