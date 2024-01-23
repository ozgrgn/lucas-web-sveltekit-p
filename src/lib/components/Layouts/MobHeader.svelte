<script>
	import Svg from '$assets/svg.json';
	import { goto } from '$app/navigation';

	import {
		navbar,
		general,
		lang,
		overlay,
		headerLight,
		translate,
		propQuery,
		getData
	} from '$services/store';
	import { fade } from 'svelte/transition';

	import LangSelect from '$components/Form/LangSelect.svelte';
	let langs = [{ lang: 'tr' }, { lang: 'en' }, { lang: 'ru' }];

	$: navbarOpen = false;
	const langTrigger = (_lang) => {
		document.documentElement.setAttribute('lang', _lang);
		setTimeout(() => {
			lang.set(_lang);
		}, 1); // cause svelte is faster than browser
	};
	const navbarTrigger = (_navbarOpen) => {
		document.documentElement.setAttribute('navbarOpen', _navbarOpen);
		setTimeout(() => {
			navbar.set(_navbarOpen);
		}, 1);
	};
	let showSubMenu = false;
	let showSub2Menu;

	function toggleModal() {
		showSubMenu = !showSubMenu;
	}
	function closeModal() {}
	export let menu;

	function setNavbarClose() {
		navbarOpen = false;
		overlay.set(false);
		navbarTrigger(navbarOpen);
	}

	function setNavbarOpen() {
		faqOpen = false;
		treatmentOpen = false;
		navbarOpen = !navbarOpen;
		overlay.set(!$overlay);
		navbarTrigger(navbarOpen);
	}
	const useLinks = (propCat) => {
		propQuery.set([]);
		$propQuery.propCat = propCat;
		$propQuery.propStatus = null;
		$propQuery.staff = null;
		$propQuery.propType = null;
		$propQuery.dontTouch = true;
		getData.set(true);
		goto(`/${$lang}/properties`);
	};
	let faqOpen = false;
	let treatmentOpen = false;
	let blogOpen = false;
</script>

<!-- {$lang} -->

<!-- <p>{hakkimizda[`${$lang}_title`]}</p> -->
<nav
	in:fade
	class="top-0 right-0 z-50 absolute w-full flex flex-wrap items-center justify-between px-4 pb-2 md:px-2  lg:mr-3 my-2 navbar-expand-lg 
	{$headerLight ? 'bg-transparent' : 'bg-white shadow'}"
>
	<div class="w-full relative flex justify-between w-auto xl:static xl:block xl:justify-start">
		<a
			class="text-white text-sm font-bold leading-relaxed inline-block  whitespace-nowrap uppercase"
			href={`/${$lang}`}
			>{#if $general}
				<img
					class="h-auto w-16 py-1"
					src={$headerLight ? '/assets/lucas-logo-white.svg' : '/assets/lucas-logo-primary.svg'}
					alt="Lucas-Investment"
				/>
			{/if}
		</a>

		<button
			class="cursor-pointer text-xl text-white leading-none  px-2 py-1 border border-solid border-transparent rounded bg-transparent  outline-none focus:outline-none"
			type="button"
			on:click={setNavbarOpen}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="25"
				fill={$headerLight ? '#fff' : '#005b70'}
				viewBox="0 0 16 16"
			>
				{@html !navbarOpen ? Svg.openedToggle : Svg.closedToggle}
			</svg>
		</button>
	</div>
	<div
		class="flex flex-grow items-center {navbarOpen ? 'block' : 'hidden'}"
		id="example-navbar-warning"
	>
		<ul class=" flex flex-col xl:flex-row list-none xl:ml-auto md:px-4 pt-4 md:pt-10">
			<li class="text-white px-2 py-1 flex items-center text-sm uppercase font-bold">
				{#if $translate}
					<a
						href="/about"
						class="{$headerLight ? 'text-white' : 'text-black/70'} font-medium px-1"
						on:click={setNavbarClose}
						><h3 class="inline-block hover:scale-[1.03] transition-all">{$translate?.aboutUs}</h3>
					</a>
				{/if}
			</li>
			<li class="text-white px-2 py-1 flex items-center text-sm uppercase font-bold">
				{#if $translate}
					<a
						href="/projects"
						on:click={setNavbarClose}
						class="{$headerLight ? 'text-white' : 'text-black/70'} font-medium px-1"
						><h3 class="inline-block hover:scale-[1.03] transition-all">
							{$translate?.projectName}
						</h3>
					</a>
				{/if}
			</li>
			<li class="text-white px-2 py-1 flex items-center text-sm uppercase font-bold">
				<div
					on:click={() => {
						useLinks('644a5b5f67133dd96468f8ee');
					}}
					on:click={setNavbarClose}
					on:keydown
					class="{$headerLight
						? 'text-white'
						: 'text-black/70'} hover:scale-[1.03] transition-all cursor-pointer inline-block font-medium px-1"
				>
					{$translate?.house}
				</div>
			</li>
			<li class="text-white px-2 py-1 flex items-center text-sm uppercase font-bold">
				{#if $translate}
					<div
						on:click={() => {
							useLinks('644a5b7267133dd96468f8f5');
						}}
						on:click={setNavbarClose}
						on:keydown
						class="{$headerLight
							? 'text-white'
							: 'text-black/70'} hover:scale-[1.03] transition-all cursor-pointer inline-block font-medium px-1"
					>
						{$translate?.commercial}
					</div>
				{/if}
			</li>

			<li class="text-white px-2 py-1 flex items-center text-sm uppercase font-bold">
				{#if $translate}
					<div
						on:click={() => {
							useLinks('64515cc880630110791bfbc2');
						}}
						on:click={setNavbarClose}
						on:keydown
						class="{$headerLight
							? 'text-white'
							: 'text-black/70'} hover:scale-[1.03] transition-all cursor-pointer inline-block font-medium px-1"
					>
						{$translate?.land}
					</div>
				{/if}
			</li>
			<li>
				<a
					on:click={setNavbarClose}
					class="{$headerLight
						? 'text-white'
						: 'text-black/70'} hover:scale-[1.03] transition-all text-sm  cursor-pointer inline-block font-medium px-3 py-1 "
									href={`/${$lang}/contact`}
				>
					{$translate?.contact}
				</a>
			</li>

			<li class="flex items-center px-2 py-1 h-8">
				<span class="relative">
					{#if $lang && langs}
						<LangSelect
							value={$lang}
							change={(value) => langTrigger(value)}
							values={langs}
							valuesKey={'lang'}
							title="Lang"
							valuesTitleKey={'lang'}
							customClass="uppercase px-1 w-12 appearance-none w-full self-center shadow-none bg-transparent focus:outline-none text-sm font-semibold {$headerLight
								? 'text-white'
								: 'text-secondary'} "
						/>
					{/if}
				</span>
			</li>
		</ul>
	</div>
</nav>
{#if showSubMenu}
	<div
		class=" md:hidden flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center  "
	>
		<div class="relative w-auto my-6 mx-auto  ">
			<!--content-->
			<div
				class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
			>
				<!--header-->
				<div class="flex items-start justify-between p-5 border-white rounded-t ">
					<h3 class="text-xl font-semibold">{translate?.contact}</h3>
					<button
						class="p-1 ml-auto bg-transparent border-0 text-gray-700  float-right line leading-none font-semibold outline-none focus:outline-none"
						on:click={toggleModal}
					>
						<span
							class="bg-transparent text-gray-700  h-6 w-6 text-2xl leading-3	 block outline-none focus:outline-none"
						>
							×
						</span>
					</button>
				</div>
				<!--body-->
			</div>
			<!--footer-->
		</div>
	</div>
{/if}
