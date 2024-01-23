<script>
	import HorizontalCardImage from './HorizontalCardImage.svelte';
	import { lang } from '$services/store';

	export let prop
</script>

<div class="relative z-10">
	<HorizontalCardImage {prop}/>

	<a href={`/${$lang}/property/${prop._id}`}
		class="absolute rounded bottom-0 left-0 h-20 w-full bg-gradient-to-b from-black/0 via-black/30 to-black/50  items-end text-white flex "
	>
	</a>
</div>
 