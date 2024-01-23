<script>
	export let header ;
	export let topHeader;
	import {
		translate
	} from '$services/store';
	// export let choices = [
	// 	{ name: 'Evet', value: true },
	// 	{ name: 'Hayır', value: false },
	// 	{ name: 'Farketmez', value: undefined }
	// ];
	export let result;

</script>

<div
	class="px-3  group h-10 flex flex-col hover:h-fit transition-all duration-500 ease justify-start border border-black/30  py-1 lg:mx-0 shadow text-black/50 bg-white rounded text-md  hover:border-secondary  focus:outline-0 w-full disabled:bg-slate-100"
>
	<div class="{result == true || result == false ? 'hidden group-hover:block' : 'block'} pt-1">
		{header}
	</div>
	<div class="flex flex-col  pt-[0.3rem]">
		<div class="{result ? 'visible' : 'hidden group-hover:block'} flex gap-1 items-center">
			<input class="accent-primary" type="radio" bind:group={result} value={true} /> {$translate?.yesName}
		</div>
		<div class="{result==false ? 'visible' : 'hidden group-hover:block'} flex gap-1 items-center">
			<input class="accent-primary " type="radio" bind:group={result} value={false} /> {$translate?.noName}
		</div>
		<div
			class="{result == true || result == false
				? 'hidden group-hover:block'
				: 'hidden group-hover:block'} flex gap-1 items-center"
		>
			<input class="accent-primary " type="radio" bind:group={result} value={undefined} /> {$translate?.all}
		</div>
	</div>
	<div
		class="{result == true || result == false
			? 'group-hover:hidden'
			: 'hidden '} absolute -top-2 text-secondary  bg-white px-1 text-xs"
	>
		{topHeader}
	</div>
</div>

