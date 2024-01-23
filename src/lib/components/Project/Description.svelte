<script>
	import { lang,translate } from '$services/store';
	export let prop;
</script>

<div class="bg-white shadow h-fit px-4 md:px-20 pb-10">
	<div class="py-5 flex justify-between text-xl ">
		<div class="text-secondary ">{$translate?.description}</div>
	</div>

	<div class="  border-t pt-10 text-[#5c6872] text-sm">
	{@html	prop?.description && prop?.description[$lang] ? prop?.description[$lang] : ''}
	</div>
</div>
