<script>
	import RestService from '$services/rest';

	import { headerLight, boxPropCat, boxPropStatus, boxPropType, translate } from '$services/store';
	import Box from '$src/lib/components/Home/Box.svelte';
	import CardGroup from '$src/lib/components/VerticalCard/CardGroup.svelte';
	import StaffGroup from '$src/lib/components/StaffCard/StaffGroup.svelte';

	import { onMount } from 'svelte';
	import MainSlider from '$components/Sliders/MainSlider.svelte';
	import SoldSlider from '$components/Sliders/SoldSlider.svelte';
	import GenericButton from '$src/lib/components/Buttons/GenericButton.svelte';
	import Loading from '$src/lib/components/Loading.svelte';

	let scrollPosition;
	headerLight.set(true);
	let doneProps;
	let props;
	let limit = 6;
	let skip = 0;
	let count;
	let loading;

	const getProps = async (propCat, propStatus, propType) => {
		loading = 'yes';
		let getPropsResponse = await RestService.getProps(
			limit,
			skip,
			'yes',
			'no',
			propCat,
			propStatus,
			propType
		);
		if (getPropsResponse['status']) {
			props = getPropsResponse['props'];
			count = getPropsResponse['count'];
			console.log(props,"anasayfa propsss");

		} else {
			console.log(getPropsResponse['message']);
		}
		loading = 'no';
	};
	const getDoneProps = async () => {
		let getPropsResponse = await RestService.getProps(
			undefined,
			undefined,
			'yes',
			'yes',
			undefined,
			undefined,
			undefined
		);
		if (getPropsResponse['status']) {
			doneProps = getPropsResponse['props'];
		} else {
			console.log(getPropsResponse['message']);
		}
	};

	onMount(() => {
		getDoneProps();
	});
	$: {
		getProps($boxPropCat, $boxPropStatus, $boxPropType);
	}
</script>

<svelte:window bind:scrollY={scrollPosition} />

<div class="relative w-full h-full text-black bg-[#fafafa]">
	<MainSlider />
	<div class="w-full">
		<div class="container mx-auto w-full lg:px-20 px-2 md-px-0 ">
			<Box />
		</div>
	</div>
	<div class="container px-2 md-px-0 mx-auto mt-16 lg:px-20">
		{#if props}
			<CardGroup {props} />
		{:else if loading == 'no'}
			<p class="text-primary/80 w-full ">rrrr</p>
		{/if}
		{#if loading == 'yes'}
			<div class="flex justify-center">
				<Loading />
			</div>
		{/if}
		{#if props && count > limit}
			<div class="h-20 ">
				<div class="flex h-20 justify-center items-center">
					<GenericButton
						customClass="px-2 py-1 text-sm rounded shadow bg-primary text-white"
						buttonText={$translate?.loadMore}
						handleClick={() => {
							limit = limit + 3;
							getProps($boxPropCat, $boxPropStatus, $boxPropType);
						}}
					/>
				</div>
			</div>
		{/if}
	</div>
	{#if doneProps}
		<div class="mt-10  h-[35rem] ">
			<div class="relative">
				<SoldSlider {doneProps} />
				<!-- <div class="absolute top-0 right-0 bg-black/60 w-[30rem] h-[35rem]"> <Reviews {reviews}/></div> -->
			</div>
		</div>
	{/if}
	<div class="bg-neutral  h-full">
		<div class="container mx-auto w-full pb-5 pt-20 lg:px-20 h-full">
			<StaffGroup interval="3000" />
		</div>
	</div>
</div>
