<script>
	import { desktop,translate } from '$services/store';
	export let prop;
</script>
{#if prop?.propMap}
<div class="bg-white px-20 shadow h-full">
	<div class="py-5 flex justify-between text-xl border-b">
		<div class="text-secondary">{$translate?.map}</div>
	</div>

	<div class="hidden md:block h-96 inline-block w-60 my-10 object-cover ">
		{@html prop?.propMap}
	</div>
</div>
{/if}