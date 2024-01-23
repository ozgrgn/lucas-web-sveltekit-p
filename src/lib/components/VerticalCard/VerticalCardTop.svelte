<script>
	import GenericButton from '../Buttons/GenericButton.svelte';
	import VerticalCardImage from './VerticalCardImage.svelte';
	import { lang } from '$services/store';
	import { formatTRY } from "$services/utils";


	export let prop;
	export let project
</script>

<div class="relative z-10">
	<VerticalCardImage {prop} {project}/>
	<div class="absolute top-3 right-3 ">
		<GenericButton
			customClass=" py-[0.1rem] px-1  bg-primary text-white text-xs rounded tracking-tight font-medium "
			buttonText={prop.propStatus && prop?.propStatus?.name[$lang]
				? prop?.propStatus?.name[$lang]
				: ''}
		/>
	</div>
	<a class="" href={`/${$lang}/${project ? 'project' : 'property'}/${prop._id}`}>

	<div
		class="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-b from-black/0 via-black/30 to-black/50  items-end text-white flex "
	>
		<h4 class=" p-1 px-4 text-[16px] font-medium text-white tracking-tight">
			{prop?.price && prop?.price[$lang] ? formatTRY(prop?.price[$lang]) : ''}
			{prop?.currency && prop?.currency[$lang] && prop?.currency[$lang] == 'TRY'
				? 'TL'
				: prop?.currency && prop?.currency[$lang] && prop?.currency[$lang] == 'USD'
				? '$'
				: prop?.currency && prop?.currency[$lang] && prop?.currency[$lang] == 'RUB'
				? '₽'
				: ''}
		</h4>
	</div>
	</a>
</div>
