<script>
	import RestService from '$services/rest';
	import VideoBanner from '$src/lib/components/About/VideoBanner.svelte';
	import CardGroup from '$src/lib/components/VerticalCard/CardGroup.svelte';
	import StaffGroup from '$src/lib/components/StaffCard/StaffGroup.svelte';
	import { lang, headerLight } from '$services/store';
	import HtmlText from '$src/lib/components/HtmlText.svelte';
	headerLight.set(true);
	let aboutUs;
	const getAboutUss = async () => {
		let getAboutUssResponse = await RestService.getAboutUss(undefined, undefined, $lang);
		aboutUs = getAboutUssResponse['aboutUss'] && getAboutUssResponse['aboutUss'][0];
		console.log(aboutUs, 'about');
	};
	getAboutUss();
</script>

<VideoBanner />

<div class="container mx-auto px-2 lg:px-20 pt-2">
	<div class=" md:flex mt-10 lg:mt-20 gap-10">
		<div class="md:w-1/2 md:h-96 mt-10 lg:mt-28 text-sm flex text-black/70 flex-col justify-center">
			{#if aboutUs}
				<HtmlText text={aboutUs?.text1} />
			{/if}
		</div>
		<div class="md:w-1/2 ">
			<img class="w-full h-auto object-cover" src={aboutUs?.image1} alt="" />
		</div>
	</div>
</div>
<div class="mt-20 pt-2 md:pt-10 bg-neutral px-4">
	<div class="container mx-auto lg:px-20">
		<div class="flex flex-col text-black/70 pb-5 ">
			{#if aboutUs}
				{@html aboutUs?.text2}
			{/if}
		</div>
		<StaffGroup />
	</div>
</div>

<div class="container mx-auto  lg:px-20">
	<CardGroup interval="5000" />
</div>
