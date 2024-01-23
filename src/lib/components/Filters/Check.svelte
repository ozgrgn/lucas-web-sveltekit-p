<script>
		import { lang, propQuery } from '$services/store';
		import { fade } from 'svelte/transition';

	export let header;
	export let topHeader;
	export let choicesArray;
	export let choices=[]
	export let notObject=false;
</script>
<div 
	class="px-3 group h-10 flex flex-col hover:h-fit {choices && choices[0] && propQuery.ready
		? 'h-fit'
		: ''} transition-all duration-500 ease justify-start border border-black/30  py-1 lg:mx-0 shadow text-black/50 bg-white rounded text-md  hover:border-secondary  focus:outline-0 w-full disabled:bg-slate-100"
>
	<div class="{choices && choices[0] ? 'hidden group-hover:block' : 'block'} pt-1">
		{header}
	</div>
	<div class="pt-[0.3rem] pb-[0.13rem]">
		{#if choices}
		{#each choicesArray as choice}
			<div class="flex gap-x-1 ">
				<input
					id={notObject?choice:choice?._id}
					class="accent-primary hidden checked:block group-hover:block"
					type="checkbox"
					bind:group={choices}
					value={notObject?choice:choice._id}
				/>
				<label class="hidden group-hover:block" for={notObject?choice:choice._id}> {notObject?choice:choice.name[$lang]}</label>
			</div>{/each}
			{/if}
	</div>

<div
	class="{choices && choices[0]
		? 'group-hover:hidden'
		: 'hidden '} absolute -top-2 text-secondary  bg-white px-1 text-xs "
>
	{topHeader}
</div>
</div>
<style>
	input:checked + label {
		display: block !important;
	}
</style>
