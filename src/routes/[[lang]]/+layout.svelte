<script>
	import RestService from '$services/rest';
	import Modal from 'svelte-simple-modal';
	import { isDesktop } from '$src/lib/utils/isDesktop.js';

	import {
		modal,
		staffs,
		propCats,
		headerLight,
		desktop,
		lang,
		general,
		translate
	} from '$services/store';
	import '$src/app.css';
	import Header from '$src/lib/components/Layouts/Header.svelte';

	import { onMount } from 'svelte';
	import MobHeader from '$src/lib/components/Layouts/MobHeader.svelte';
	import Footer from '$src/lib/components/Layouts/Footer.svelte';
	export let data;
	let limit=6;
	let skip=0;
	console.log(data,"agaggag")
	lang.set(data.lang);
	desktop.set(isDesktop());
	let languages;

	const getLanguages = async () => {
		let getLanguagesResponse = await RestService.getLanguages();
		languages = getLanguagesResponse && getLanguagesResponse['languages'];
	};

	const getGenerals = async (lang) => {
		let getGeneralsResponse = await RestService.getGenerals(lang);
		general.set(getGeneralsResponse['generals'] && getGeneralsResponse['generals'][0]);
		console.log($general,"general")
	};

	const getTranslates = async (lang) => {
		let getTranslatesResponse = await RestService.getTranslates(lang);
		translate.set(getTranslatesResponse['translates'] && getTranslatesResponse['translates'][0]);
		console.log($translate,"translate")
	};
	const getStaffs = async (lang) => {
		let getStaffsResponse = await RestService.getStaffs(lang);
		if (getStaffsResponse['status']) {
			staffs.set(getStaffsResponse['staffs']);
		} else {
			console.log(getStaffsResponse['message']);
		}
	};

	const getPropCats = async () => {
		let getPropCatsResponse = await RestService.getPropCats();
		if (getPropCatsResponse['status']) {
			propCats.set(getPropCatsResponse['propCats']);
		} else {
			console.log(getPropCatsResponse['message']);
		}
	};

	$:getTranslates($lang);
	$:getGenerals($lang);
	$:getStaffs($lang);

	onMount(() => {
	

		getPropCats();
	});
	let scrollPosition;
</script>

<svelte:window bind:scrollY={scrollPosition} />
<Modal show={$modal} />
<div class="h-full">
	{#if $desktop}
		<Header
	
		/>
	{:else}
		<MobHeader 

		/>
	{/if}

	<slot />

	<Footer  />
</div>
