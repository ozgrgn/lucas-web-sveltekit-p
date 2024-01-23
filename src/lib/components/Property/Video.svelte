<script>
	import { desktop,translate } from '$services/store';
	export let videoLink;
</script>

<div class="bg-white px-20 shadow h-full">
	<div class="py-10 flex justify-between text-xl border-b">
		<div class="text-secondary">{$translate?.videoName}</div>
	</div>

	{#if $desktop}
		<div class="hidden md:block h-96 w-full my-10">
			<iframe
				width="100%"
				height="100%"
				src={`https://www.youtube.com/embed/${videoLink}?autoplay=1;controls=1`}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay=0; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			/>
		</div>
	{:else}
		<div class="block md:hidden flex justify-center h-full w-full pt-8">
			<iframe
				width="100%"
				height="100%"
				src={`https://www.youtube.com/embed/${videoLink}?autoplay=1;controls=1`}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			/>
		</div>
	{/if}
</div>
