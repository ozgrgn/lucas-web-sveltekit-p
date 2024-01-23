<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { lang } from '$services/store';
	export let prop;
	export let project
</script>

<div class="custom-slider2">
	<Splide
		aria-label="Lucas Real Estate"
		options={{
			type: 'slide',
			perPage: 1,
			arrows: true,
			pagination: false,
			classes: {
				prev: 'splide__arrow--prev custom-class-prevs',
				next: 'splide__arrow--next custom-class-nexts'
			}
		}}
	>
		{#if prop}
			<SplideSlide>
				<a class="" href={`/${$lang}/${project?"project":"property"}/${prop._id}`}>
					<img
						class="shadow rounded-t z-10 w-full h-72 object-cover"
						src={prop?.coverImage}
						alt={prop?.name[$lang]}
					/>
				</a>
			</SplideSlide>
			{#each prop.images as image, index}
				<SplideSlide>
					<a class="" href={`/${$lang}/property/${prop._id}`}>
						<img
							class="shadow rounded-t z-10 w-full h-72 object-cover"
							src={image.image}
							alt="{prop?.name}{index}"
						/>
					</a>
				</SplideSlide>
			{/each}
		{/if}
	</Splide>
</div>

<!-- <style>
	:global(.custom-slider2 .custom-class-prevs) {
		background-color: transparent !important;
		color: white !important;
		opacity: 1;
	}
	:global(.custom-slider2 .custom-class-nexts) {
		color: white;
		background-color: transparent !important;
		opacity: 1;
	}
	:global(.custom-slider2 .splide__arrow svg) {
		fill: white;
		-webkit-text-stroke: 1px #fff !important;
		text-shadow: 2px 0 2px #000 !important;
	}
</style> -->
