<script>
	import { lang } from '$services/store';

	export let header;
	export let topHeader;
	export let choicesArray;
	export let selectedChoice
</script>

<div
	class="px-3 group h-10 flex flex-col hover:h-fit {selectedChoice
		? 'h-fit'
		: ''} transition-all duration-500 ease justify-start border border-black/30  py-1 lg:mx-0 shadow text-black/50 bg-white rounded text-md  hover:border-secondary  focus:outline-0 w-full disabled:bg-slate-100"
>
	<div class="{selectedChoice ? 'hidden group-hover:block' : 'block'} pt-1">
		{header}
	</div>
	<div class="pt-[0.3rem] pb-[0.13rem]">
		{#each choicesArray as choice}
			<div class="flex gap-x-1 ">
				<input
					id={choice}
					class="accent-primary hidden checked:block group-hover:block"
					type="radio"
					bind:group={selectedChoice}
					value={choice}
				/>
				<label class="hidden group-hover:block" for={choice}> {choice}</label>
			</div>{/each}
	</div>

	<div
		class="{selectedChoice
			? 'group-hover:hidden'
			: 'hidden '} absolute -top-2  text-secondary bg-white px-1 text-xs "
	>
		{topHeader}
	</div>
</div>

<style>
	input:checked + label {
		display: block !important;
	}
</style>
