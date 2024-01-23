<script>
	import VerticalCardFooter from './VerticalCardFooter.svelte';
	import VerticalCardMiddle from './VerticalCardMiddle.svelte';
	import VerticalCardTop from './VerticalCardTop.svelte';
	import { lang } from '$services/store';

	export let prop;
	export let project
	// export let perPage
</script>

<div class="flex flex-col z-10  py-4 cursor-pointer ">
	<div class="shadow hover:shadow-lg">
		<VerticalCardTop {prop} {project} />
		<a class="" href={`/${$lang}/${project?"project":"property"}/${prop._id}`}>

			<div class="bg-white rounded-b shadow flex flex-col w-full py-2 px-4 ">
				<VerticalCardMiddle {prop} {project}  />
				<VerticalCardFooter {prop}  {project}/>
			</div></a
		>
	</div>
</div>
