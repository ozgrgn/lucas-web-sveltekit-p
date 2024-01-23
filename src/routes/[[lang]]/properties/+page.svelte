<script>
	import { onMount } from 'svelte';
	import RestService from '$services/rest';

	import {
		headerLight,
		propQuery,
		lang,
		desktop,
		translate,
		getData,
		refresh
	} from '$services/store';

	import BreadCrumbs from '$src/lib/components/BreadCrumbs.svelte';
	import HorizontalCard from '$src/lib/components/HorizontalCard.svelte/HorizontalCard.svelte';
	import PropsSide from '$src/lib/components/Props/PropsSide.svelte';
	import VerticalCard from '$src/lib/components/VerticalCard/VerticalCard.svelte';
	import GenericButton from '$src/lib/components/Buttons/GenericButton.svelte';
	import Loading from '$src/lib/components/Loading.svelte';
	import { goto } from '$app/navigation';

	headerLight.set(false);
	console.log($propQuery, '$propquertt');

	let props;
	let loading;
	$: if ($getData) {
		getProps();
	}
	const search = async () => {
		if ($desktop) {
			document.body.scrollIntoView();
		} else {
			goto('#first');
		}
		getProps();
	};
	const getProps = async () => {
		console.log($propQuery, '$p1ropquertt');
		loading = 'yes';
		let getPropsResponse = await RestService.getPropsQuery($propQuery);
		if (getPropsResponse['status']) {
			props = getPropsResponse['props'];
			loading = 'no';
			getData.set(false);
		} else {
		}
	};

	onMount(() => {
		if (!$propQuery?.propCat) {
			console.log('yok');
		}
	});
</script>

<div class="bg-neutral h-full pt-32 min-h-screen">
	<div class="container mx-auto lg:px-20 text-sm text-black/80 ">
		{#if $propQuery && $propQuery?.propCat}
			<BreadCrumbs
				page1={$propQuery?.propCat?.name ? $propQuery?.propCat?.name[$lang] : undefined}
			/>
		{/if}
	</div>

	<div class="container mx-auto px-4 lg:px-20 pb-20 ">
		<div class="flex flex-col md:flex-row gap-10">
			<div class="md:w-2/3 order-2	">
				<div class="flex flex-col gap-5 " id="first">
					{#if props && props[0]}
						{#each props as prop (prop)}
							{#if $desktop}
								<div class="">
									<HorizontalCard {prop} />
								</div>
							{:else}
								<div class="">
									<VerticalCard {prop} />
								</div>
							{/if}
						{/each}
					{:else if loading == 'no'}
						<p class="text-primary/80 w-full ">
							{$translate?.noProp}
						</p>
					{/if}
				</div>
				{#if loading == 'yes'}
					<div class="flex justify-center">
						<Loading />
					</div>{/if}
			</div>

			<div class="md:w-1/3 order-first relative	flex flex-col">
				<div class="sticky top-5 bg-white h-fit pb-10  shadow overflow-scroll">
					{#key $refresh}
						<PropsSide
							search={() => {
								search();
							}}
							getProps={() => {
								getProps();
							}}
						/>
					{/key}
				</div>
			</div>
		</div>
	</div>
</div>
