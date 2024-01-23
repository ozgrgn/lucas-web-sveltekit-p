<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { general } from '$services/store';



</script>

<Splide
	aria-label="My Favorite Images"
	options={{
		type: 'slide',
		perPage: 1,
		arrows: false,
		pagination: false,
		autoplay: true
	}}
>
	
		<SplideSlide>
			<div class="h-[45rem] overflow-hidden relative">
				{#if $general}
				<img
					class=" im h-full w-full object-cover  transition-all ease-in delay-150 duration-1000 focus:scale-150"
					src={$general?.slider}
					alt="1"
				/>
				{/if}
				{#if $general}
				<div class="absolute top-0 left-0 bg-[#002E51] opacity-70 h-[45rem] w-full h-full mix-blend-multiply"></div>
				<div class="absolute top-0 left-0 w-full h-[45rem] flex justify-center ">
					<div class="flex flex-col h-full justify-center items-center text-center w-3/5">
					<h2 class="text-[42px] text-white shadow font-normal">{$general?.bannerTitle?$general?.bannerTitle:""}</h2>
				<p class="text-white text-[20px]">{$general?.slogan1?$general?.slogan1:""}<br>{$general?.slogan2?$general?.slogan2:""}

				</p>
				</div>
				</div>
				{/if}
			</div>
		</SplideSlide>
		

</Splide>

<style>
	.im {
		animation: zoom 30s infinite;
	}
	@keyframes -global-zoom {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.2);
		}
	}
</style>
