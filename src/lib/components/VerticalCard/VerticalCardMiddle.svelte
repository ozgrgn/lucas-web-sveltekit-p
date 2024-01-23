<script>
	import { lang, translate } from '$services/store';
	import { TranslateApiMessage, Translate } from '$services/language';

	import moment from 'moment';

	export let prop;
	export let project;
</script>

<div class="flex items-center pt-2">
	<h3
		class="text-[14px] h-6 text-[#222222] truncate hover:text-secondary cursor-pointer transition-all tracking-tight"
	>
		{prop?.name && prop?.name[$lang] ? prop?.name[$lang] : ''}
	</h3>
</div>
<div class="flex items-center ">
	<!-- <i class="text-black/70 pr-1 bi bi-geo-alt-fill" /> -->
	<h4 class="text-sm font-light text-[#636363]">
		{prop?.city?.name && prop?.city?.name[$lang] ? prop?.city?.name[$lang] : '-'}/{prop?.state
			?.name && prop?.state?.name[$lang]
			? prop?.state?.name[$lang]
			: '-'}/{prop?.district?.name && prop?.district?.name[$lang]
			? prop?.district?.name[$lang]
			: '-'}
	</h4>
</div>
{#if !project}
	<div class="flex py-4 gap-4 h-14">
		{#if prop.roomNumber && prop.roomNumber.name[$lang]}
			<div class="flex items-center">
				<svg class="h-4 w-4 fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
					><defs
						><style>
							.clss-3 {
								stroke: #ff6716;
								stroke-width: 1;
							}
						</style></defs
					><title>Oda Sayısı</title><g id="Layer_2" data-name="Layer 2"
						><g id="Layer_1-2" data-name="Layer 1"
							><path
								class="clss-3"
								d="M32.55.23a.78.78,0,0,0-1.1,0L.23,31.45a.78.78,0,0,0,0,1.1l2.22,2.22a.8.8,0,0,0,1.1,0l.91-.92V63.22a.78.78,0,0,0,.78.78H58.76a.78.78,0,0,0,.78-.78V33.86l.91.92a.8.8,0,0,0,1.1,0l2.22-2.22a.78.78,0,0,0,0-1.1ZM58,62.44H6V32.29l26-26,26,26Zm3-29.32L32.55,4.63a.78.78,0,0,0-1.1,0L3,33.12,1.88,32,32,1.88,62.12,32Z"
							/><path
								class="clss-3"
								d="M13.5,34.75A13.25,13.25,0,0,0,33,46.48l10.89,10.9a3.9,3.9,0,1,0,5.52-5.52L38.49,41a13.27,13.27,0,1,0-25-6.21ZM48.27,53A2.34,2.34,0,1,1,45,56.27l-8.39-8.39a16.37,16.37,0,0,0,1.77-1.54,16.2,16.2,0,0,0,1.54-1.77Zm-9.51-9.51a15.23,15.23,0,0,1-3.31,3.31l-1.12-1.12a13.37,13.37,0,0,0,3.31-3.31Zm-.28-8.69A11.71,11.71,0,1,1,26.77,23,11.72,11.72,0,0,1,38.48,34.75Z"
							/></g
						></g
					></svg
				>

				<div class="text-xs font-normal pl-2">
					{prop?.roomNumber?.name && prop?.roomNumber?.name[$lang]
						? prop?.roomNumber?.name[$lang]
						: ''}
				</div>
			</div>
		{/if}
		<div class="flex items-center">
			<svg class="h-4 w-4 fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
				><defs
					><style>
						.clss-1 {
							stroke: #ff6716;
							stroke-width: 1;
						}
					</style></defs
				><title>Asset 6</title><g id="Layer_2" data-name="Layer 2"
					><g id="Layer_1-2" data-name="Layer 1"
						><path
							class="clss-1"
							d="M32.55.23a.78.78,0,0,0-1.1,0L.23,31.45a.78.78,0,0,0,0,1.1l2.22,2.22a.8.8,0,0,0,1.1,0l2.7-2.7V50.73a.78.78,0,0,0,.78.78H57a.78.78,0,0,0,.78-.78V32.07l2.7,2.7a.8.8,0,0,0,1.1,0l2.22-2.22a.78.78,0,0,0,0-1.1ZM56.2,50H7.8V30.51L32,6.29,56.2,30.51ZM61,33.12,32.55,4.64a.78.78,0,0,0-1.1,0L3,33.12,1.88,32,32,1.88,62.12,32Z"
						/><path
							class="clss-1"
							d="M.78,64H63.22a.78.78,0,0,0,.78-.78V53.85a.78.78,0,0,0-.78-.78H.78a.78.78,0,0,0-.78.78v9.37A.78.78,0,0,0,.78,64Zm.78-9.37H6.24V57A.78.78,0,1,0,7.8,57V54.63h4.68V60.1a.78.78,0,1,0,1.56,0V54.63h4.68V57a.78.78,0,1,0,1.56,0V54.63H25V60.1a.78.78,0,1,0,1.56,0V54.63h4.68V57a.78.78,0,1,0,1.56,0V54.63h4.68V60.1a.78.78,0,1,0,1.56,0V54.63h4.68V57a.78.78,0,1,0,1.56,0V54.63H50V60.1a.78.78,0,1,0,1.56,0V54.63H56.2V57a.78.78,0,1,0,1.56,0V54.63h4.68v7.81H1.56Z"
						/></g
					></g
				></svg
			>

			<div class="text-xs font-normal pl-2">
				{prop?.brutm2 ? prop?.brutm2 : ''} <span class="font-normal">m2</span>
			</div>
		</div>
		{#if prop.floorNo}
			<div class="flex items-center -ml-1">
				<svg
					class="h-5 w-5 fill-secondary mb-[0.14rem] "
					version="1.0"
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					width="100px"
					height="100px"
					viewBox="0 0 90 90"
					enable-background="new 0 0 64 64"
					xml:space="preserve"
				>
					<polygon
						stroke="#ff6716"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points="42.498,33.75 50,41.25 57.5,33.75 50,41.25 "
					/>
					<path
						fill="none"
						stroke="#ff6716"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						d="M50,10v31.25V10z"
					/>
					<polygon
						fill="none"
						stroke="#ff6716"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points="50,19.999 15,37.502 50,54.999 85,37.502 "
					/>
					<polygon
						fill="none"
						stroke="#ff6716"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points="50,54.999 26.668,43.334 15,49.17 50,66.665 85,49.17 73.332,43.334 "
					/>
					<polygon
						fill="none"
						stroke="#ff6716"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points="50,66.665 26.668,55.001 15,60.835 50,78.333 85,60.835 73.332,55.001 "
					/>
					<polygon
						fill="none"
						stroke="#ff6716"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points="50,78.333 26.668,66.667 15,72.504 50,90 85,72.504 73.332,66.667 "
					/>
				</svg>
				<div class="text-xs font-normal pl-2">
					{prop?.floorNo ? prop?.floorNo : ''}/{prop?.buildingFloors ? prop?.buildingFloors : ''}
					{$translate?.floorName}
				</div>
			</div>
		{/if}
		{#if prop.propType}
			<div class="flex items-center">
				<svg
					class="h-[1.1rem] w-[1.1rem] fill-secondary"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 64 64"
					><defs
						><style>
							.clss-2 {
								stroke: #ff6716;
								stroke-width: 1;
							}
						</style></defs
					><title>Asset 4</title><g id="Layer_2" data-name="Layer 2"
						><g id="Layer_1-2" data-name="Layer 1"
							><path
								class="clss-2"
								d="M12.88,46,25.37,53.2a.78.78,0,0,0,1.17-.68V40.47a.78.78,0,0,0-.41-.68L13.64,32.92a.78.78,0,0,0-1.16.68V45.31A.78.78,0,0,0,12.88,46ZM14,34.92l10.93,6V51.17L14,44.86Z"
							/><path
								class="clss-2"
								d="M.41,20.2l5.84,3.21V48.8a.78.78,0,0,0,.39.68l25,14.42a.78.78,0,0,0,.78,0l25-14.42a.78.78,0,0,0,.39-.68V23.41l5.84-3.21a.78.78,0,0,0,0-1.35L32.4.11a.78.78,0,0,0-.8,0L.38,18.84a.78.78,0,0,0,0,1.35Zm48,32.66-7.8,4.51V40l7.8-4.29ZM32.78,2.16,61.65,19.48,32.78,35.36Zm0,35L56.19,24.27V48.34L50,52V34.37a.78.78,0,0,0-1.16-.68l-9.37,5.15a.78.78,0,0,0-.41.68V58.26l-6.24,3.61ZM31.22,61.87,7.8,48.34V24.27L31.22,37.14Zm0-59.71v33.2L2.35,19.48Z"
							/></g
						></g
					></svg
				>
				<div class="text-xs font-normal pl-2">
					{prop?.propType?.name ? prop?.propType?.name[$lang] : ''}
				</div>
			</div>
		{/if}
	</div>
{:else}
	<div class="h-8">
		{#if prop.date}
			<div class="flex text-secondary text-sm py-1">
				{prop.type && prop.type[$lang]? prop.type[$lang] : ''}{prop.type && prop.date ? ' | ' : ''}{$Translate(
					moment(prop.date).format('MMMM')
				)}
				{moment(prop.date).format('YYYY')}
			</div>
		{/if}
	</div>
{/if}
