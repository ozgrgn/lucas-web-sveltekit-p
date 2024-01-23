<script>
	import FeaturesLine from './FeaturesLine.svelte';
	import { lang, translate } from '$services/store';

	export let prop;
</script>

{#if (prop && prop.generalDesc && prop?.generalDesc[$lang]) && ($lang == 'tr' && prop?.generalElementsTR && prop?.generalElementsTR[0]) || ($lang == 'en' && prop?.generalElementsEN && prop.generalElementsEN[0]) || ($lang == 'ru' && prop?.generalElementsRU && prop.generalElementsRU[0])}
	<div class="bg-white h-fit shadow px-4 md:px-20 pb-10 z-20">
		<div class="py-5 flex justify-between text-xl ">
			<div class="text-secondary">{$translate?.featuresName}</div>
		</div>
		<div class="border-t  text-[#5c6872]">
			{#if prop && prop?.generalDesc[$lang]}
				<div class="text-[#5c6872] text-sm py-2 ">{@html prop?.generalDesc[$lang]}</div>
			{/if}
			<div class="flex justify-between  ">
				<div class=" w-full">
					<div class="w-full grid md:grid-cols-2 gap-x-20 ">
						{#if prop}
							{#if $lang == 'tr' && prop.generalElementsTR && prop.generalElementsTR[0]}
								{#each prop.generalElementsTR as element}
									<FeaturesLine header="{element.header}:" feature={element.name} />
								{/each}
							{/if}
							{#if $lang == 'en' && prop.generalElementsEN && prop.generalElementsEN[0]}
								{#each prop.generalElementsEN as element}
									<FeaturesLine header="{element.header}:" feature={element.name} />
								{/each}
							{/if}
                            {#if $lang == 'ru' && prop.generalElementsRU && prop.generalElementsRU[0]}
                            ffs
                            {#each prop.generalElementsRU as element}
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
