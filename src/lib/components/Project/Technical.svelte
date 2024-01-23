<script>
	import FeaturesLine from './FeaturesLine.svelte';
	import { lang, translate } from '$services/store';

	export let prop;
</script>

{#if (prop && prop?.technicalDesc && prop?.technicalDesc[$lang] && $lang == 'tr' && prop?.technicalElementsTR && prop?.technicalElementsTR[0]) || ($lang == 'en' && prop?.technicalElementsEN && prop.technicalElementsEN[0]) || ($lang == 'ru' && prop?.technicalElementsRU && prop.technicalElementsRU[0])}
	<div class="bg-white h-fit shadow px-4 md:px-20 pb-10 z-20">
		<div class="py-5 flex justify-between text-xl ">
			<div class="text-secondary">{$translate?.technicalName}</div>
		</div>
		<div class="border-t  text-[#5c6872]">
			{#if prop && prop?.technicalDesc[$lang]}
				<div class="text-[#5c6872] text-sm py-2 ">{@html prop?.technicalDesc[$lang]}</div>
			{/if}
			<div class="flex justify-between  ">
				<div class=" w-full">
					<div class="w-full grid md:grid-cols-2 gap-x-20 ">
						{#if prop}
							{#if $lang == 'tr' && prop.technicalElementsTR && prop.technicalElementsTR[0]}
								{#each prop.technicalElementsTR as element}
									<FeaturesLine header="{element.header}:" feature={element.name} />
								{/each}
							{/if}
							{#if $lang == 'en' && prop.technicalElementsEN && prop.technicalElementsEN[0]}
								{#each prop.technicalElementsEN as element}
									<FeaturesLine header="{element.header}:" feature={element.name} />
								{/each}
							{/if}
							{#if $lang == 'ru' && prop.technicalElementsRU && prop.technicalElementsRU[0]}
								ffs
								{#each prop.technicalElementsRU as element}
									<FeaturesLine header="{element.header}:" feature={element.name} />
								{/each}
							{/if}
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
