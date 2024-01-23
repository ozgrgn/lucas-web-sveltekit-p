<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import RestService from '$services/rest';
	import { headerLight, lang, propDetails } from '$services/store';
	import BreadCrumbs from '$src/lib/components/BreadCrumbs.svelte';
	import GenericButton from '$src/lib/components/Buttons/GenericButton.svelte';
	import CardGroup from '$src/lib/components/VerticalCard/CardGroup.svelte';
	import VerticalCard from '$src/lib/components/VerticalCard/VerticalCard.svelte';
	import Description from '$src/lib/components/Property/Description.svelte';
	import Features from '$src/lib/components/Property/Features.svelte';
	import Gallery from '$src/lib/components/Property/Gallery.svelte';
	import Overview from '$src/lib/components/Property/Overview.svelte';
	import PropertySide from '$src/lib/components/Property/PropertySide.svelte';
	import Video from '$src/lib/components/Property/Video.svelte';
	import VirtualTour from '$src/lib/components/Property/VirtualTour.svelte';
	import PropMap from '$src/lib/components/Property/PropMap.svelte';
	import Technical from '$src/lib/components/Property/Technical.svelte';
	export let data;
	let prop;
	const getProp = async (propPerma) => {
		let getPropResponse = await RestService.getUserProp(propPerma);
		if (getPropResponse && getPropResponse['status']) {
			prop = getPropResponse['prop'];
			propDetails.set(prop);
		} else {
			console.log(getPropResponse.message);
		}
	};
	$: getProp(data.property);
	console.log(data, 'property');
	headerLight.set(false);
	let filteredProperties;
</script>

<SvelteToast />
{#if prop}
<div class="bg-neutral h-full p-4 pt-20 md:pt-28 z-20">
	<div class="container mx-auto lg:px-20 text-sm text-black/80 ">
		<BreadCrumbs
			{prop}
		/>
		<div class="pt-2 md:pt-5 ">
			{#if prop}
				<h1 class="text-lg md:text-2xl pb-2">{prop?.name ? prop?.name[$lang] : ''}</h1>
			{/if}
		</div>
		<div class="">
		<GenericButton
			customClass="px-2 bg-primary text-white text-sm rounded tracking-tight font-medium "
			buttonText={prop?.propStatus && prop?.propStatus?.name[$lang]
				? prop?.propStatus?.name[$lang]
				: ''}
		/>
		<div class="flex items-center justify-start gap-2 pt-2">
			<svg
				version="1.1"
				class="h-4 w-4 fill-[#636363]"
				id="Layer_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				viewBox="0 0 25 32"
				style="enable-background:new 0 0 32 32;"
				xml:space="preserve"
			>
				<g>
					<path
						d="M16,32c-0.3183594,0-0.6181641-0.1518555-0.8066406-0.4086914L6.559082,19.8168945C4.8847656,17.5336914,4,14.8310547,4,12
					C4,5.3833008,9.3833008,0,16,0s12,5.3833008,12,12c0,2.8310547-0.8847656,5.5336914-2.5585938,7.8168945l-8.6347656,11.7744141
					C16.6181641,31.8481445,16.3183594,32,16,32z M16,2C10.4858398,2,6,6.4858398,6,12
					c0,2.4023438,0.7509766,4.6967773,2.171875,6.6342773L16,29.309082l7.8286133-10.6748047
					C25.2490234,16.6967773,26,14.4023438,26,12C26,6.4858398,21.5141602,2,16,2z M16,17c-2.7568359,0-5-2.2431641-5-5s2.2431641-5,5-5
					s5,2.2431641,5,5S18.7568359,17,16,17z M16,9c-1.6542969,0-3,1.3457031-3,3s1.3457031,3,3,3s3-1.3457031,3-3S17.6542969,9,16,9z"
					/>
				</g>
			</svg>

			<h4 class="text-sm md:text-lg font-light text-[#636363]  ">
				{prop?.city?.name && prop?.city?.name[$lang] ? prop?.city?.name[$lang] : '-'}/{prop?.state
					?.name && prop?.state?.name[$lang]
					? prop?.state?.name[$lang]
					: '-'}/{prop?.district?.name && prop?.district?.name[$lang]
					? prop?.district?.name[$lang]
					: '-'}
			</h4>
		</div>
	</div>
</div>
	<div class="container mx-auto px-2 lg:px-20 mt-10">
		<div class="lg:flex gap-10">
			<div class="w-full lg:w-2/3 flex flex-col gap-10">
				<div id="gallery" class="">
					<Gallery {prop} />
				</div>
				<div id="overview" class="">
					<Overview {prop} />
				</div>
				{#if prop?.propMap}
				<div id="map" class="">
					<PropMap {prop} />
				</div>
				{/if}
				<div id="description" class="">
					<Description {prop} />
				</div>
				<div id="technical" class="">
					<Technical {prop} />
				</div>
				<div id="features" class="">
					<Features {prop} />
				</div>
				{#if prop?.videoLink}
					<div id="video" class="">
						<Video videoLink={prop?.videoLink} />
					</div>
				{/if}
				{#if prop?.virtualLink}
				<div id="virtual" class="">
					<VirtualTour virtualLink={prop?.virtualLink} />
				</div>
				{/if}
				<div id="similar" class="">
					{#if filteredProperties}
						{#each filteredProperties as property}
							<VerticalCard />
						{/each}
					{/if}
				</div>
			</div>
			<div class="w-full mb-10 lg:w-1/3 bg-white z-20">
				<PropertySide {prop} />
			</div>
		</div>
	</div>
	
</div>
{/if}
