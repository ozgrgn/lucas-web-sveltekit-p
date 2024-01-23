<script>
	import FeaturesLine from './FeaturesLine.svelte';
	import { lang, translate } from '$services/store';

	export let prop;
</script>

{#if (prop && prop.infoDesc && prop.infoDesc["tr"]) && ($lang == 'tr' && prop?.infoElementsTR && prop?.infoElementsTR[0]) || ($lang == 'en' && prop?.infoElementsEN && prop.infoElementsEN[0]) || ($lang == 'ru' && prop?.infoElementsRU && prop.infoElementsRU[0])}
	<div class="bg-white h-fit shadow px-4 md:px-20 pb-10 z-20">
		<div class="py-5 flex justify-between text-xl ">
			<div class="text-secondary">{$translate?.projectInfoName}</div>
		</div>
		<div class="border-t  text-[#5c6872]">
			{#if prop && prop?.infoDesc[$lang]}
				<div class="text-[#5c6872] text-sm py-2 ">{@html prop?.infoDesc[$lang]}</div>
			{/if}
			<div class="flex justify-between  ">
				<div class=" w-full">
					<div class="w-full grid md:grid-cols-2 gap-x-20 ">
						{#if prop}
							{#if $lang == 'tr' && prop.infoElementsTR && prop.infoElementsTR[0]}
								{#each prop.infoElementsTR as element}
									<FeaturesLine header="{element.header}:" feature={element.name} />
								{/each}
							{/if}
							{#if $lang == 'en' && prop.infoElementsEN && prop.infoElementsEN[0]}
								{#each prop.infoElementsEN as element}
									<FeaturesLine header="{element.header}:" feature={element.name} />
								{/each}
							{/if}
							{#if $lang == 'ru' && prop.infoElementsRU && prop.infoElementsRU[0]}
								ffs
								{#each prop.infoElementsRU as element}
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
