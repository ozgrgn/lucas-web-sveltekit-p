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
				{#if prop?.furnished != undefined}
					<FeaturesLine header="{$translate?.isFurniture}:" feature={prop?.furnished ? $translate?.yesName : $translate?.noName} />
				{/if}
				{#if prop?.kitchen}
					<FeaturesLine
						header="{$translate?.kitchenName}:"
						feature={prop?.kitchen && prop?.kitchen?.name && prop?.kitchen?.name[$lang]
							? prop?.kitchen.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.balcone != undefined}
					<FeaturesLine header="{$translate?.balconeName}:" feature={prop?.balcone ? $translate?.yesName : $translate?.noName}  />
				{/if}
				{#if prop?.teras != undefined}
					<FeaturesLine header="{$translate?.terasName}:" feature={prop?.teras ? $translate?.yesName : $translate?.noName}  />
				{/if}
				{#if prop?.elevator != undefined}
					<FeaturesLine header="{$translate?.elavatorName}:" feature={prop?.elevator ? $translate?.yesName : $translate?.noName}  />
				{/if}

				{#if prop?.pool}
					<FeaturesLine
						header="{$translate?.poolName}:"
						feature={prop?.pool && prop?.pool?.name && prop?.pool?.name[$lang]
							? prop?.pool.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.sport}
					<FeaturesLine
						header="{$translate?.sportName}:"
						feature={prop?.sport && prop?.sport?.name && prop?.sport?.name[$lang]
							? prop?.sport.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.otopark}
					<FeaturesLine
						header="{$translate?.otoparkName}:"
						feature={prop?.otopark && prop?.otopark?.name && prop?.otopark?.name[$lang]
							? prop?.otopark.name[$lang]
							: '-'}
					/>
				{/if}

				{#if prop?.security != undefined}
					<FeaturesLine header="{$translate?.otoparkName}:" feature={prop?.security ? $translate?.yesName : $translate?.noName}  />
				{/if}
				{#if prop?.camSystem != undefined}
					<FeaturesLine header="{$translate?.camName}:"  feature={prop?.camSystem ? $translate?.yesName : $translate?.noName}  />
				{/if}
				{#if prop?.doorman != undefined}
					<FeaturesLine header="{$translate?.doormanName}:"  feature={prop?.doorman ? $translate?.yesName : $translate?.noName}  />
				{/if}
				{#if prop?.jenerator != undefined}
					<FeaturesLine header="{$translate?.jeneratorName}:" feature={prop?.jenerator ? $translate?.yesName : $translate?.noName}  />
				{/if}
				{#if prop?.fireStair != undefined}
					<FeaturesLine header="{$translate?.fireStairName}:" feature={prop?.fireStair ? $translate?.yesName : $translate?.noName}  />
				{/if}
			</div>
		
		</div>
	</div>
</div>
