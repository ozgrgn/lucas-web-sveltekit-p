<script>
	import FeaturesLine from './FeaturesLine.svelte';
	import { lang, translate } from '$services/store';

	export let prop;
</script>

<div class="bg-white h-fit shadow px-4 md:px-20 pb-10 z-20">
	<div class="py-5 flex justify-between text-xl ">
		<div class="text-secondary">{$translate?.generalInfo}</div>
	</div>

	<div class="flex w-full justify-between border-t py-5 md:py-10  text-[#5c6872] overflow-hidden">
		<div class=" w-full">
			<div class="w-full grid md:grid-cols-2 gap-x-10 md:gap-x-20 ">
				{#if prop?.ada && prop?.parsel}
					<FeaturesLine
						header="{`${$translate?.adaName}/${$translate?.parselName}`}:"
						feature="{prop?.ada ? prop.ada : '-'} /{prop?.parsel ? prop.parsel : '-'}"
					/>
				{/if}

				{#if prop?.useStatus}
					<FeaturesLine
						header="{$translate?.useStatusName}:"
						feature={prop?.useStatus?.name && prop?.useStatus?.name[$lang]
							? prop?.useStatus.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.rentPeriod}
					<FeaturesLine
						header="{$translate?.rentPeriodName}:"
						feature={prop?.rentPeriod?.name && prop?.rentPeriod?.name[$lang]
							? prop?.rentPeriod.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.rentTime}
					<FeaturesLine
						header="{$translate?.rentTimeName}:"
						feature={prop?.rentTime?.name && prop?.rentTime?.name[$lang]
							? prop?.rentTime.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.dues}
					<FeaturesLine header="{$translate?.dueName}:" feature={prop?.dues ? prop?.dues : '-'} />
				{/if}
				{#if prop?.deposit}
					<FeaturesLine
						header="{$translate?.depositName}:"
						feature={prop?.deposit ? prop?.deposit : '-'}
					/>
				{/if}
				{#if prop?.iskanStatus}
					<FeaturesLine
						header="{$translate?.iskanStatusName}:"
						feature={prop?.iskanStatus?.name && prop?.iskanStatus?.name[$lang]
							? prop?.iskanStatus.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.imarStatus}
					<FeaturesLine
						header="{$translate?.imarSatusName}:"
						feature={prop?.imarStatus?.name && prop?.imarStatus?.name[$lang]
							? prop?.imarStatus.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.tapuStatus}
					<FeaturesLine
						header="{$translate?.tapuStatusName}:"
						feature={prop?.tapuStatus?.name && prop?.tapuStatus?.name[$lang]
							? prop?.tapuStatus.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.tapuTransfer}
					<FeaturesLine
						header="{$translate?.tapuTransferName}:"
						feature={prop?.tapuTransfer?.name && prop?.tapuTransfer?.name[$lang]
							? prop?.tapuTransfer.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.citizenship}
					<FeaturesLine
						header="{$translate?.citizenshipName}:"
						feature={prop?.citizenship?.name && prop?.citizenship?.name[$lang]
							? prop?.citizenship.name[$lang]
							: '-'}
					/>
				{/if}

				{#if prop?.height}
					<FeaturesLine
						header="{$translate?.heightName}:"
						feature="{prop?.height ? prop.height : '-'} m"
					/>
				{/if}
				{#if prop?.view?.name}
					<FeaturesLine
						header="{$translate?.viewName}:"
						feature={prop?.view?.name && prop?.view?.name[$lang] ? prop?.view.name[$lang] : '-'}
					/>
				{/if}
				{#if prop?.year}
					<FeaturesLine
						header="{$translate?.yearName}:"
						feature="{prop?.year ? prop?.year : '-'} {$translate.year}"
					/>
				{/if}
				{#if prop?.climatic1}
					<FeaturesLine
						header="{$translate?.climaticName}1:"
						feature={prop?.climatic1 && prop?.climatic1.name && prop?.climatic1.name[$lang]
							? prop?.climatic1.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.climatic2}
					<FeaturesLine
						header="{$translate?.climaticName}2:"
						feature={prop?.climatic2 && prop?.climatic2?.name && prop?.climatic2?.name[$lang]
							? prop?.climatic2.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.climatic3}
					<FeaturesLine
						header="{$translate?.climaticName}3:"
						feature={prop?.climatic3 && prop?.climatic3?.name && prop?.climatic3?.name[$lang]
							? prop?.climatic3.name[$lang]
							: '-'}
					/>
				{/if}
				{#if prop?.facade}
					<FeaturesLine
						header="{$translate?.facadeName}:"
						feature={prop?.facade && prop?.facade?.name && prop?.facade?.name[$lang]
							? prop?.facade.name[$lang]
							: '-'}
					/>
				{/if}
			</div>
		</div>
	</div>
</div>
