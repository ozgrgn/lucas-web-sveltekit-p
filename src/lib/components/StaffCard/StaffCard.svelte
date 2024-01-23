<script>
	import StaffCardMiddle from './StaffCardMiddle.svelte';
	import StaffCardTop from './StaffCardTop.svelte';
	import { goto } from '$app/navigation';
	import { lang, propQuery } from '$services/store';
	export let staff;
console.log(staff,"stafffff")
	const useLinks = () => {
		console.log(staff);
		propQuery.set({ staff: staff._id });
		goto(`/${$lang}/properties`);
	};
</script>

<div
	on:click={() => {
		useLinks();
	}}
	on:keydown
	class="cursor-pointer"
>
	<div class="flex shadow flex-col z-10 shadow transition-all hover:scale-[1.02] hover:shadow-xl ">
		<StaffCardTop {staff} />
		<div class="bg-white rounded-b  flex flex-col w-full py-2 px-4 ">
			<StaffCardMiddle {staff} />
		</div>
	</div>
</div>
<br /><br /><br />
