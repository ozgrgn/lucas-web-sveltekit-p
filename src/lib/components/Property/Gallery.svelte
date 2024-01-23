<script>
	import DetailImageSlider from '../Sliders/DetailImageSlider.svelte';
	import { lang } from '$services/store';

	export let prop;

	let syncProductSlider;
</script>

{#if prop}
	<div class="w-full">
		<DetailImageSlider
			name={prop.name[$lang]}
			virtualLink={prop.virtualLink}
			bind:filteredSlides={prop.images}
			bind:sync={syncProductSlider}
		/>
	</div>
{/if}
