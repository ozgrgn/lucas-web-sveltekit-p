<script>
	import '$src/app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import { panelDrawer } from '$services/store';
	import Sidebar from '$src/lib/components/Panel/Sidebar.svelte';
	import { modal, lang } from '$services/store';

	import Navbar from '$src/lib/components/Panel/Navbar.svelte';
	import { Modal } from 'svelte-simple-modal';
	export let data;

	
	lang.set('tr');
</script>

<SvelteToast />
<Modal show={$modal} />

<div class="fontFamily panel relative bg-blueGray-100">
	<Sidebar />
	<div
		class="
	{!$panelDrawer ? 'ml-0' : ''}
	{$panelDrawer ? 'ml-[18rem]' : ''}
	 transition-all flex flex-col"
	>
		<div class="relative bg-primary md:pt-32 pb-32 pt-12" />

		<div class="px-2 mx-auto w-full -m-24">
			<Navbar adminName={data?.user?.fullName} />
			<div class="z-20">
				<slot />
			</div>
		</div>
	</div>
</div>
<style>
.fontFamily	 {
	font-family: 'Quicksand', sans-serif !important;
	font-size: 16px !important;
	}
</style>