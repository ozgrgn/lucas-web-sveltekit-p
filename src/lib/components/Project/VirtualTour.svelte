<script>
	import { desktop,translate } from '$services/store';
	export let virtualLink;
</script>

<div class="bg-white px-2 md:px-20 shadow h-full">
	<div class="py-5 flex justify-between text-xl border-b">
		<div class="text-secondary">{$translate?.virtualName}</div>
	</div>

	{#if $desktop}
		<div class="hidden md:block h-96  w-full my-10">
			<iframe
			width="100%"
				height="100%"
			id="ds"
			title="LUCAS"
			src='https://matterport.com/discover/space/{virtualLink}&play=1'
			frameborder="0"
			allowfullscreen={false}
			allow="xr-spatial-tracking"
		  />
	
		</div>
	{:else}
	<div class="block md:hidden h-96  w-full my-10">
		<iframe
		width="100%"
			height="100%"
		id="ds2"
		title="LUCAS"
		src='https://matterport.com/discover/space/{virtualLink}&play=1'
		frameborder="0"
		allowfullscreen={false}
		allow="xr-spatial-tracking"
	  />

	</div>
	{/if}
</div>
