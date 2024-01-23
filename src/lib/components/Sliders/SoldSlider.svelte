<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import ScrollText from './ScrollText.svelte';
	import {lang,translate } from '$services/store';
	export let doneProps;
	console.log(doneProps,"hfhfhfh")
</script>

<div class="relative">
	<Splide
		aria-label="My Favorite Images"
		options={{
			type: 'fade',
			perPage: 1,
			arrows: false,
			pagination: false,
			autoplay: true,
			interval: 5000,
			rewind: true,
			speed: 1000
		}}
	>
		{#if doneProps}
			{#each doneProps as sold}
				{#if sold.sold || sold.rent}
					<SplideSlide>
						<div class="h-[35rem] overflow-hidden relative">
							<img
								class=" im h-full w-full object-cover transition-all ease-in delay-150 duration-1000 focus:scale-150"
								src={sold?.coverImage}
								alt={sold?.name}
							/>

							<div
								class="absolute top-0 left-0 bg-black opacity-70  w-full h-full mix-blend-multiply"
							/>
							<div class="absolute top-0 w-full h-[35rem] left-0 ">
								<div class="h-[24rem] w-full flex flex-col items-end justify-end ">
									<ScrollText text={sold?.sold?$translate?.soldByLucas:$translate?.rentByLucas} />
								</div>
							</div>
							<div class="absolute top-4 left-4 md:left-10 ">
								<div class="flex items-center pt-2 w-full">
									<h3
										class="md:text-2xl text-white hover:text-secondary cursor-pointer transition-all tracking-tight"
									>
									{sold?.name && sold?.name[$lang] ? sold?.name[$lang] : ''}
									</h3>
								</div>
								<div class="flex items-center ">
									<!-- <i class="text-black/70 pr-1 bi bi-geo-alt-fill" /> -->
									<h4 class="text-md font-light text-white">
										{sold?.city && sold?.city?.name ? sold?.city?.name[$lang] : ''}/{sold?.state?.name && sold?.state?.name[$lang]?sold?.state?.name[$lang]:""}/{sold?.district?.name && sold?.district?.name[$lang]?sold?.district?.name[$lang]:""}
									</h4>
								</div>
							</div>
						</div>
					</SplideSlide>
				{/if}
			{/each}
		{/if}
	</Splide>
	<!-- 
	<div class="absolute top-0 right-10 h-full flex items-center w-72">
		<div class="w-full">
			<Form />
		</div>
	</div> -->
</div>

<style>
	.im {
		animation: zoom 30s infinite;
	}
	@keyframes -global-zoom {
		0%,
		100% {
			transform: scale(1.1);
		}
		50% {
			transform: scale(1.2);
		}
	}
</style>
