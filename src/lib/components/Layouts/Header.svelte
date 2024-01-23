<script>
	import Svg from '$assets/svg.json';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { navbar, lang, headerLight, propQuery, translate, propDetails,getData } from '$services/store';
	import LangSelect from '$components/Form/LangSelect.svelte';
	import { fade } from 'svelte/transition';

	let langs = [{ lang: 'tr' }, { lang: 'en' }, { lang: 'ru' }];
	let scrollPosition;
	$: navbarOpen = false;
	const langTrigger = (_lang) => {
		document.documentElement.setAttribute('lang', _lang);
		setTimeout(() => {
			lang.set(_lang);
		}, 1); // cause svelte is faster than browser
		goto(`/${_lang}`);
	};
	const navbarTrigger = (_navbarOpen) => {
		document.documentElement.setAttribute('navbarOpen', _navbarOpen);
		setTimeout(() => {
			navbar.set(_navbarOpen);
		}, 1);
	};
	const useLinks = (propCat) => {
		propQuery.set([]);
		$propQuery.propCat = propCat;
		$propQuery.propStatus = null;
		$propQuery.staff = null;
		$propQuery.propType = null;
		$propQuery.dontTouch = true;
		$propQuery.ready = true;
		getData.set(true)
		goto(`/${$lang}/properties`);
	};
	let showSubMenu = false;
	let showSub2Menu;

	function toggleModal() {
		showSubMenu = !showSubMenu;
	}
	function closeModal() {}

	function setNavbarClose() {
		navbarOpen = false;
		navbarTrigger(navbarOpen);
	}

	function setNavbarOpen() {
		navbarOpen = !navbarOpen;
		navbarTrigger(navbarOpen);
	}
</script>

<svelte:window bind:scrollY={scrollPosition} />

<!-- {$lang} -->

<!-- <p>{hakkimizda[`${$lang}_title`]}</p> -->
{#if scrollPosition < 10 || (!$page.url.pathname.includes('property')&& !$page.url.pathname.includes('project'))}
	<nav
		in:fade
		class="hidden md:flex top-0 h-20 absolute mt-2 {$headerLight
			? ''
			: 'bg-white shadow'} right-0 z-50 w-full  flex-wrap items-center justify-center px-2 lg:mr-3  navbar-expand-lg"
	>
		<div
			class="hidden md:flex w-full relative justify-between md:w-auto md:static md:block md:justify-start gap-6"
		>
			<a href={`/${$lang}`} class="absolute top-0 left-20">
				<img
					class="w-20"
					src={$headerLight ? '/assets/lucas-logo-white.svg' : '/assets/lucas-logo-primary.svg'}
					alt="Lucas Investment "
				/>
			</a>

			<button
				class="cursor-pointer text-xl text-white leading-none px-2 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
				type="button"
				on:click={setNavbarOpen}
			/>
			{#if $translate}
				<a
					href="/"
					class="{$headerLight
						? 'text-white'
						: 'text-black/70'} font-medium hover:scale-[1.03] px-1"
					><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.homepage}</h3>
				</a>
				<a href="/about" class="{$headerLight ? 'text-white' : 'text-black/70'} font-medium px-1"
					><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.aboutUs}</h3>
				</a>
				<a href="/projects" class="{$headerLight ? 'text-white' : 'text-black/70'} font-medium px-1"
					><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.projectName}</h3>
				</a>
				<div
					on:click={() => {
						useLinks('644a5b5f67133dd96468f8ee');
					}}
					on:keydown
					class="{$headerLight
						? 'text-white'
						: 'text-black/70'} hover:scale-[1.03] transition-all cursor-pointer inline-block font-medium px-1"
				>
					{$translate?.house}
				</div>
				<div
					on:click={() => {
						useLinks('644a5b7267133dd96468f8f5');
					}}
					on:keydown
					class="{$headerLight
						? 'text-white'
						: 'text-black/70'} hover:scale-[1.03] transition-all cursor-pointer inline-block font-medium px-1"
				>
					{$translate?.commercial}
				</div>
				<div
					on:click={() => {
						useLinks('64515cc880630110791bfbc2');
					}}
					on:keydown
					class="{$headerLight
						? 'text-white'
						: 'text-black/70'} hover:scale-[1.03] transition-all cursor-pointer inline-block font-medium px-1"
				>
					{$translate?.land}
				</div>
				<a
					href="/contact"
					class="{$headerLight
						? 'text-white'
						: 'text-black/70'} hover:scale-[1.03] font-medium px-1"
					><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.contact}</h3></a
				>
			{/if}
		</div>
		<div class="pl-4">
			<span class="relative ">
				{#if $lang && langs}
					<LangSelect
						value={$lang}
						change={(value) => langTrigger(value)}
						values={langs}
						valuesKey={'lang'}
						title="Lang"
						valuesTitleKey={'lang'}
						customClass="uppercase w-12 {$headerLight
							? 'text-white'
							: 'text-white'} bg-primary appearance-none w-full  shadow-none px-2 focus:outline-none text-sm font-semibold "
					/>
				{/if}
			</span>
		</div>
	</nav>
{:else if scrollPosition > 20}
	<nav
		in:fade
		class="hidden md:flex top-0 h-10 absolute mt-2 bg-primary text-white sticky shadow right-0 z-50 w-full flex-wrap items-center justify-center px-2 lg:mr-3  navbar-expand-lg"
	>
		<div
			class="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start gap-6"
		>
			{#if $propDetails && $propDetails.images && $propDetails.images[0]}
				<a href="#gallery" class="text-white font-medium hover:scale-[1.03] px-1"
					><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.gallery}</h3>
				</a>
			{/if}

			<a href="#overview" class="text-white font-medium hover:scale-[1.03] px-1"
				><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.profile}</h3>
			</a>

			{#if $propDetails && $propDetails.propMap}
				<a href="#map" class="text-white font-medium hover:scale-[1.03] px-1"
					><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.map}</h3>
				</a>
			{/if}
			{#if $propDetails && $propDetails.description}
				<a href="#description" class="text-white font-medium hover:scale-[1.03] px-1"
					><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.description}</h3>
				</a>
			{/if}
			<!-- {#if $propDetails && $propDetails.}
			<a href="#description" class="text-white font-medium hover:scale-[1.03] px-1"
				><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.description}</h3>
			</a>
		{/if} -->
			{#if $propDetails && $propDetails.propStatus}
				<a href="#technical" class="text-white font-medium hover:scale-[1.03] px-1"
					><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.generalInfo}</h3>
				</a>
			{/if}
			{#if $propDetails && $propDetails.propStatus}
			<a href="#features" class="text-white font-medium hover:scale-[1.03] px-1"
				><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.featuresName}</h3>
			</a>
			{/if}
			{#if $propDetails && $propDetails.videoLink}
			<a href="#video" class="text-white font-medium hover:scale-[1.03] px-1"
				><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.videoName}</h3>
			</a>
			{/if}
			{#if $propDetails && $propDetails.virtualLink}

			<a href="#virtual" class="text-white font-medium hover:scale-[1.03] px-1"
				><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.virtualName}</h3>
			</a>
			{/if}
		</div>
	</nav>
{/if}
<!-- <div
  class="{$overlay
    ? 'opacity-50'
    : 'opacity-0'} transition-all duration-500  absolute h-screen  inset-0 z-40 bg-black"
/> -->
<!-- <style>
	.dropdown:hover > .dropdown-content {
		display: block;
	}
</style> -->
