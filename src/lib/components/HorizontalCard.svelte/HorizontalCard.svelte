<script>
	import HorizontalCardMiddle from "./HorizontalCardRight.svelte";
import HorizontalCardTop from "./HorizontalCardLeft.svelte";
import { lang } from '$services/store';

export let prop;

</script>
<div class="flex h-52 bg-white rounded shadow transition-all hover:scale-[1.02]">
    
    <div class="w-1/3 h-full">
    <HorizontalCardTop {prop}/>
    </div>

    <a href={`/${$lang}/property/${prop._id}`} class="w-2/3 p-5 h-full">
        <HorizontalCardMiddle {prop}/>
 
    </a>
</div>