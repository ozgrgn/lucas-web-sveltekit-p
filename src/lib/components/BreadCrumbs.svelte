<script>
	import { lang, boxPropCat,translate } from '$services/store';
	import { goto } from '$app/navigation';
	export let project=false;
	export let prop;
	console.log(prop,"breadcrump prop")
	export let page1Link;
	export let page2;

	const useLinks = (propCat) => {
		console.log(propCat);
		boxPropCat.set(propCat);
		goto(`/${$lang}/properties`);
	};
	export let page1 = prop && !project==false ? $translate.project : prop?.propStatus?.name[$lang];

</script>

{#if page1}
	<div class="flex w-full gap-2">
		<a href="/{$lang}/"> <h4 class="text-secondary whitespace-nowrap">Ana Sayfa</h4></a>

		<svg
			class="h-5 w-5"
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			viewBox="0 0 16 16"
			fill="#000"
			xml:space="preserve"
		>
			<polyline
				id="_x31_0_x5F_Right"
				fill="none"
				stroke="#000"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-miterlimit="10"
				points=" 6,4 10,8 6,12 "
			/>
		</svg>
		{#if page1Link}
			<a href={page1Link} class="flex gap-2">
				<h4 class="whitespace-nowrap text-secondary">{page1}</h4>
				<svg
					class="h-5 w-5"
					version="1.1"
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 16 16"
					fill="#000"
					xml:space="preserve"
				>
					<polyline
						id="_x31_0_x5F_Right"
						fill="none"
						stroke="#000"
						stroke-width="1"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points=" 6,4 10,8 6,12 "
					/>
				</svg>
			</a>
		{:else}
			<div
				on:click={() => {
					useLinks(prop?.propCat?._id);
				}}
				on:keydown
				class="flex gap-2 inline-block "
			>
				<h4 class="whitespace-nowrap {page2 ? 'text-secondary cursor-pointer' : ''}">{page1}</h4>
				{#if page2}
					<svg
						class="h-5 w-5"
						version="1.1"
						id="Layer_1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						x="0px"
						y="0px"
						viewBox="0 0 16 16"
						fill="#000"
						xml:space="preserve"
					>
						<polyline
							id="_x31_0_x5F_Right"
							fill="none"
							stroke="#000"
							stroke-width="1"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-miterlimit="10"
							points=" 6,4 10,8 6,12 "
						/>
					</svg>
				{/if}
			</div>
		{/if}
		{#if page2}
			<h4 class="">{page2}</h4>
		{/if}
	</div>
{/if}
