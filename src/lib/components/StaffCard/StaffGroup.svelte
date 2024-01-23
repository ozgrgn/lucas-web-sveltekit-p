<script>
	import StaffCard from './StaffCard.svelte';
	import { staffs,desktop } from '$services/store';

	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	export let interval = 5000;
</script>

<div class="md:-mx-2 staff-slider ">
	<Splide
		aria-label="Lucas Real Estate"
		options={{
			type: 'loop',
			perPage: $desktop?4:1,
			arrows: false,
			pagination: true,
			autoplay: true,
			interval: interval,
			

			classes: {
				pagination: 'splide__pagination custom-class-pagination',
				prev: 'splide__arrow--prev custom-class-prev',
				next: 'splide__arrow--next custom-class-next'
			}
		}}
	>
	{#if $staffs}
	{#each $staffs as staff }
	<SplideSlide>
		<div class="mx-2 py-1  ">
			<StaffCard {staff}/>
		</div>
	</SplideSlide>
	{/each}
		{/if}
	</Splide>
</div>

<style>
	:global(.staff-slider .custom-class-prev) {
		margin-left: -40px !important;
	}
	:global(.staff-slider .custom-class-next) {
		margin-right: -40px !important;
	}
	:global(.staff-slider .custom-class-pagination .is-active) {
		background-color: rgba(49, 17, 17, 0.347) !important;
	}
</style>
