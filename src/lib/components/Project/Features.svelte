<script>
	import FeaturesLine from './FeaturesLine.svelte';
	import { lang,translate } from '$services/store';

	export let prop;
</script>

<div class="bg-white h-fit shadow px-4 md:px-20 pb-10 z-20">


	<div class="py-5 flex justify-between text-xl ">
		<div class="text-secondary">{$translate?.featuresName}</div>
	</div>

	<div class="flex justify-between  border-t py-10 text-[#5c6872]">
		<div class=" w-full">
			
			<div class="w-full grid md:grid-cols-2 gap-x-20 ">
				{#if prop}
				{#each prop.generalElementsTR as element}
				<FeaturesLine header="{element.header}:" feature={element.name} />

				{/each}
				{/if}
			
			</div>
		
		</div>
	</div>
</div>
