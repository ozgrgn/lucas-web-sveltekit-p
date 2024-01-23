<script>
	import { lang,translate } from '$services/store';
	import { Translate } from '$services/language';
	import moment from 'moment';
console.log($translate,"translate overviewden")
	export let prop;
	console.log (prop)
</script>

{#if prop}
	<div class="bg-white shadow h-40 px-4 lg:px-20">
		<div class="py-2 md:py-5 flex justify-between items-center text-xl ">
			<div class="text-lg ">
				<!-- <span class="font-normal text-[#222222] ">İlan No:</span>{prop?.no ? prop?.no : ''} -->
				<div class="flex items-center justify-center pt-2">
					<h3
						class="text-sm md:text-xl text-secondary hover:text-secondary cursor-pointer transition-all tracking-tight pr-2"
					>
						{prop?.name && prop?.name[$lang] ? prop?.name[$lang] : ''}
					</h3>
				</div>
				<div class="flex items-center  ">
					<!-- <i class="text-black/70 pr-1 bi bi-geo-alt-fill" /> -->
					<h4 class="text-sm font-light text-[#222222]">
						{prop?.city?.name && prop?.city?.name[$lang] ? prop?.city?.name[$lang] : '-'}/{prop
							?.state?.name && prop?.state?.name[$lang]
							? prop?.state?.name[$lang]
							: '-'}/{prop?.district?.name && prop?.district?.name[$lang]
							? prop?.district?.name[$lang]
							: '-'}
					</h4>
				</div>
				{#if prop.date}

				<div class="flex text-secondary text-sm py-2">
					{prop.type ? prop?.type : ''} {prop?.type && prop.date ? ' | ' : ''}{$Translate(
						moment(prop.date).format('MMMM')
					)}
					{moment(prop.date).format('YYYY')}
					
				</div>
				{/if}
				{#if prop && prop.driveLink && $translate?.driveLinkName}
				<div class="flex items-center gap-2 ">
					<i class="bi bi-cloud-arrow-down"></i>
					<a href={prop.driveLink} target="_blank" rel="noreferrer" class="text-sm font-light text-[#222222]">
						{$translate?.driveLinkName}
					</a>
				</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
