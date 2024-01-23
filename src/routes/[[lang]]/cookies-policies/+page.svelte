<script>
	import RestService from '$services/rest';
	import { general, translate} from '$services/store';
	import VideoBanner from '$src/lib/components/About/VideoBanner.svelte';
	import HtmlText from '$src/lib/components/HtmlText.svelte';

</script>
<VideoBanner />
<div class="container mx-auto lg:px-40 px-4 py-10">
	<div class="md:flex gap-10 pt-10">
		<div class="w-full  flex flex-col gap-2 text-sm text-black/80 leading-6">
			
			{#if $general}
				<HtmlText text={$general?.cookies} />
				
				{/if}
		</div>
	
	</div>
</div>
