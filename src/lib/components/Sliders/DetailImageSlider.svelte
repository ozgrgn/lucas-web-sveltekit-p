<script>
	import RestService from '$services/rest';

	import ToastService from '$services/toast';
	import { page } from '$app/stores';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { bind } from 'svelte-simple-modal';
	import { onMount } from 'svelte';
	import { copy } from 'svelte-copy';
	import { modal, translate } from '$services/store';
	import DownloadImages from '../DownloadImages.svelte';

	export let name;
	const showModal = () => modal.set(bind(DownloadImages, { images: filteredSlides, name: name }));

	console.log($page, 'pagesss');

	export let filteredSlides = undefined;
	export let virtualLink;
	console.log(filteredSlides, 'oooo');

	let changeThumb = false;
	let main;
	let thumbs;
	const mainOptions = {
		type: 'slide',
		perPage: 1,
		perMove: 1,
		gap: '1rem',
		pagination: false
	};
	const thumbsOptions = {
		type: 'slide',
		rewind: true,
		gap: '1rem',
		pagination: false,
		fixedWidth: 143,
		fixedHeight: 90,
		cover: true,
		isNavigation: true,
		updateOnMove: true,
		arrows: false
	};

	export let sync = async () => {
		changeThumb = false;
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 50);
		});
		changeThumb = true;

		await new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 50);
		});

		if (main && thumbs) {
			main.sync(thumbs.splide);
		}
	};
	let file;

	onMount(() => {
		sync();
	});
	const toaster = () => {
		ToastService.success($translate?.linkCopied);
		console.log('wedfs');
	};
	// 	const downloadURI = (url, name)=>{
	// 	fetch(url)
	//         .then(resp => resp.blob())
	//         .then(blob => {
	//             const url = window.URL.createObjectURL(blob);
	//             const a = document.createElement('a');
	//             a.style.display = 'none';
	//             a.href = url;
	//             // the filename you want
	//             a.download = name;
	//             document.body.appendChild(a);
	//             a.click();
	//             window.URL.revokeObjectURL(url);
	//         })
	//         .catch(() => alert('An error sorry'));
	// 	}
	// downloadURI("https://storage.googleapis.com/lucas-own-bucket/14.jpeg","ss")
</script>

<div class="wrapper w-full h-full">
	{#if filteredSlides && changeThumb}
		<Splide options={mainOptions} bind:this={main} aria-labelledby="thumbnails-example-heading">
			<SplideSlide>
				<div class="h-[15rem] md:h-[30rem] w-full pb-5">
					<img
						class="relative h-[15rem] md:h-[30rem] w-full object-cover "
						src={filteredSlides[0]?.image}
						alt={filteredSlides[0]?.alt}
					/>
					<div class="absolute bottom-8 right-8 flex gap-2">
						<button
							use:copy={$page.url.origin + $page.url.pathname}
							on:click={() => {
								toaster();
							}}
							on:keydown
							class="rounded w-10 flex items-center justify-center bg-primary p-1"
						>
							<img class="h-6" src="/assets/copylink.svg" alt="" />
						</button>
						<a href="#map" class="rounded w-10 flex items-center justify-center bg-primary p-1">
							<img class="h-5" src="/assets/pin.svg" alt="" />
						</a>
						<button
							on:click={() => {
								showModal();
							}}
							class="rounded w-10 flex items-center justify-center bg-primary p-1"
						>
							<img class="h-5" src="/assets/download.svg" alt="" />
						</button>
					</div>
				</div>
			</SplideSlide>
			{#if virtualLink}
			
				<SplideSlide>
					<div class="h-full w-full pb-5">
						<iframe
							width="100%"
							height="100%"
							id="ds"
							title="LUCAS"
							src='https://matterport.com/discover/space/{virtualLink}&play=1'
							frameborder="0"
							allowfullscreen={false}
							allow="xr-spatial-tracking"
						/>
					</div>
				</SplideSlide>
				{/if}
			{#each filteredSlides as slide , index}
			{#if index != 0}
				<SplideSlide>
					<div class="h-full w-full pb-5">
						<img class="w-full h-[15rem] md:h-[30rem] object-cover " src={slide.image} alt={slide.alt} />
						<div class="absolute bottom-8 right-8 flex gap-2">
							<button
								use:copy={$page.url.origin + $page.url.pathname}
								on:click={() => {
									toaster();
								}}
								on:keydown
								class="rounded w-10 flex items-center justify-center bg-primary p-1"
							>
								<img class="h-6" src="/assets/copylink.svg" alt="" />
							</button>
							<a href="#map" class="rounded w-10 flex items-center justify-center bg-primary p-1">
								<img class="h-5" src="/assets/pin.svg" alt="" />
							</a>
							<button
								on:click={() => {
									showModal();
								}}
								class="rounded w-10 flex items-center justify-center bg-primary p-1"
							>
								<img class="h-5" src="/assets/download.svg" alt="" />
							</button>
						</div>
					</div></SplideSlide
				>
				{/if}
			{/each}
		</Splide>
	{/if}
	{#if filteredSlides && changeThumb}
		<Splide options={thumbsOptions} bind:this={thumbs}>
			<SplideSlide>
				<img
					class="h-full w-full object-cover"
					src={filteredSlides[0]?.image}
					alt={filteredSlides[0]?.alt}
				/>
			</SplideSlide>
			{#if virtualLink}

			<SplideSlide>
				<img
					class="h-full w-full object-cover"
					src="https://my.matterport.com/api/v1/player/models/{virtualLink}/thumb"
					alt={filteredSlides[0]?.alt}
				/>
			</SplideSlide>
{/if}
			{#each filteredSlides as slide, index}
				{#if index != 0}
					<SplideSlide>
						<img class="h-full w-full object-cover" src={slide.image} alt={slide.alt} />
					</SplideSlide>
				{/if}
			{/each}
		</Splide>
	{/if}
</div>
