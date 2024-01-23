<script>
	import VerticalCard from './VerticalCard.svelte';
	import { flip } from 'svelte/animate'
	import {fly, fade} from 'svelte/transition';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import GenericButton from '../Buttons/GenericButton.svelte';
	// export let interval = 5000;
	// export let perPage = 3;
	export let props;
	console.log(props,"props")
	export let project
	let options={}
</script>


<div class="md:grid lg:grid-cols-2 w-full xl:grid-cols-3 gap-6">
{#if props}
	{#each props as prop (prop)}

	<div  class="">
	{#if prop.isActive}
		<VerticalCard {prop} {project}/>	
		{/if}
	</div>
	
	{/each}
{/if}

</div>
<!-- <div class="-mx-2 custom-slider"> -->
	<!-- <Splide
		aria-label="Lucas Real Estate"
		options={{
			type: 'loop',
			perPage: perPage,
			arrows: false,
			pagination: true,
			autoplay: false,
			interval: interval,

			classes: {
				pagination: 'splide__pagination custom-class-pagination',
				prev: 'splide__arrow--prev custom-class-prev',
				next: 'splide__arrow--next custom-class-next'
			}
		}}
	>
		<SplideSlide>
			<div class="mx-2 py-1">
				<VerticalCard propery {perPage} />
			</div>
		</SplideSlide>
		<SplideSlide>
			<div class="mx-2 py-1">
				<VerticalCard propery {perPage}/>
			</div>
		</SplideSlide>
		<SplideSlide>
			<div class="mx-2 py-1">
				<VerticalCard propery {perPage}/>
			</div>
		</SplideSlide>
		<SplideSlide>
			<div class="mx-2 py-1">
				<VerticalCard propery {perPage}/>
			</div>
		</SplideSlide>
		<SplideSlide>
			<div class="mx-2 py-1">
				<VerticalCard propery {perPage}/>
			</div>
		</SplideSlide>
	</Splide> -->
<!-- </div> -->

<style>
	:global(.custom-slider .custom-class-prev) {
		margin-left: -40px !important;
	}
	:global(.custom-slider .custom-class-next) {
		margin-right: -40px !important;
	}
	:global(.custom-slider .custom-class-pagination) {
		bottom: -20px !important;
	}

	:global(.custom-slider .custom-class-pagination .is-active) {
		background-color: rgba(0, 0, 0, 0.168) !important;
	}
</style>
