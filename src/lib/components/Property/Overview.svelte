<script>
	import { propCats } from '$src/services/store';
	import { lang, translate, desktop } from '$services/store';
	import { formatTRY } from '$services/utils';

	export let prop;
</script>

<div class="bg-white shadow h-60 px-4 lg:px-20">
	<div class="py-2 md:py-5 flex justify-between items-center text-xl ">
		<div class="text-lg ">
			<!-- <span class="font-normal text-[#222222] ">İlan No:</span>{prop?.no ? prop?.no : ''} -->
			<div class="flex items-center justify-center pt-2">
				<h3
					class="text-sm md:text-xl text-secondary hover:text-secondary cursor-pointer transition-all tracking-tight pr-2"
				>
					{prop?.name && prop?.name[$lang] ? prop?.name[$lang] : ''}
				</h3>
			</div>
			<div class="flex items-center  ">
				<!-- <i class="text-black/70 pr-1 bi bi-geo-alt-fill" /> -->
				<h4 class="text-sm font-light text-[#222222]">
					{prop?.city?.name && prop?.city?.name[$lang] ? prop?.city?.name[$lang] : '-'}/{prop?.state
						?.name && prop?.state?.name[$lang]
						? prop?.state?.name[$lang]
						: '-'}/{prop?.district?.name && prop?.district?.name[$lang]
						? prop?.district?.name[$lang]
						: '-'}
				</h4>
			</div>
			{#if prop && prop.driveLink && $translate?.driveLinkName}
				<div class="flex items-center gap-2 ">
					<i class="bi bi-cloud-arrow-down" />
					<a
						href={prop.driveLink}
						target="_blank"
						rel="noreferrer"
						class="text-sm font-light text-[#222222]"
					>
						{$translate?.driveLinkName}
					</a>
				</div>
			{/if}
		</div>
		<div class="text-sm md:text-lg block  whitespace-nowrap	 font-light">
			{#if prop?.price && prop?.price?.[$lang]}
				<span class="font-semibold text-[#222222] " />{prop?.price && prop?.price?.[$lang]
					? formatTRY(prop?.price?.[$lang])
					: ''}
			{:else if prop?.assignPrice}
				{prop?.assignPrice ? prop?.assignPrice : ''}
			{/if}
			{prop?.currency && prop?.currency[$lang] && prop?.currency[$lang] == 'TRY'
				? 'TL'
				: prop?.currency && prop?.currency[$lang] && prop?.currency[$lang] == 'USD'
				? '$'
				: prop?.currency && prop?.currency[$lang] && prop?.currency[$lang] == 'RUB'
				? '₽'
				: ''}
		</div>
	</div>
	<div class="flex justify-between border-t pt-10 text-[#5c6872] ">
		{#if prop.roomNumber && prop.roomNumber.name[$lang]}
			<div class="">
				<div class="flex items-center justify-center">
					<svg class="h-7 w-7 fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
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

					<div class="hidden md:block text-sm md:text-md font-normal pl-2">
						{#if prop}
							{prop?.roomNumber?.name && prop?.roomNumber?.name[$lang]
								? prop?.roomNumber?.name[$lang]
								: ''}
						{/if}
					</div>
				</div>
				<div class="sm:block md:hidden text-sm md:text-md font-normal pt-1 text-center">
					{#if prop}
						{prop?.roomNumber?.name && prop?.roomNumber?.name[$lang]
							? prop?.roomNumber?.name[$lang]
							: ''}
					{/if}
				</div>
				<div class="hidden md:block pt-1 text-sm md:text-md text-center md:text-left">
					{$desktop
						? $translate?.roomNumberName
						: prop?.roomNumber?.name && prop?.roomNumber?.name[$lang]
						? prop?.roomNumber?.name[$lang]
						: ''}
				</div>
			</div>
		{/if}
		{#if prop.brutm2 }
			<div class="">
				<div class="flex justify-center items-center">
					<svg class="h-7 w-7 fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
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
					<div class="hidden md:block  text-sm md:text-md font-normal pl-2">
						{prop?.brutm2 ? prop?.brutm2 : ''} <span class="font-normal">m2</span>
					</div>
				</div>
				<div class="sm:block md:hidden pt-1  text-sm md:text-md font-normal pl-2">
					{prop?.brutm2 ? prop?.brutm2 : ''} <span class="font-normal">m2</span>
				</div>
				<div class="hidden md:block pt-1 text-sm md:text-md text-center md:text-left ">
					{$desktop ? $translate?.brutM2Name : prop?.brutm2 ? prop?.brutm2 : ''}
					{!$desktop ? 'm2' : ''}
				</div>
			</div>
		{/if}
		{#if prop.floorNo}

		<div class="">
			<div class="flex items-center justify-center -ml-1">
				<svg
					class="h-8 w-8 fill-secondary  "
					version="1.0"
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 94 94"
					xml:space="preserve"
				>
					<polygon
						stroke="#ff6716"
						stroke-width="4"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points="
        42.498,33.75 50,41.25 57.5,33.75 50,41.25 "
					/>
					<path
						fill="none"
						stroke="#ff6716"
						stroke-width="4"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						d="
        M50,10v31.25V10z"
					/>
					<polygon
						fill="none"
						stroke="#ff6716"
						stroke-width="4"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points="
        50,19.999 15,37.502 50,54.999 85,37.502 "
					/>
					<polygon
						fill="none"
						stroke="#ff6716"
						stroke-width="4"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points="
        50,54.999 26.668,43.334 15,49.17 50,66.665 85,49.17 73.332,43.334 "
					/>
					<polygon
						fill="none"
						stroke="#ff6716"
						stroke-width="4"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points="
        50,66.665 26.668,55.001 15,60.835 50,78.333 85,60.835 73.332,55.001 "
					/>
					<polygon
						fill="none"
						stroke="#ff6716"
						stroke-width="4"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-miterlimit="10"
						points="
        50,78.333 26.668,66.667 15,72.504 50,90 85,72.504 73.332,66.667 "
					/>
				</svg>
				<div class="hidden md:block text-sm md:text-md font-normal pl-2">
					{prop?.floorNo ? prop?.floorNo : ''}/{prop?.buildingFloors ? prop?.buildingFloors : ''} 
				</div>
			</div>
			<div class="sm:block md:hidden text-sm md:text-md font-normal pl-2">
				{prop?.floorNo ? prop?.floorNo : ''}/{prop?.buildingFloors ? prop?.buildingFloors : ''} 
			</div>
			<div class=" hidden md:block  text-sm md:text-md text-center md:text-left">
				{$desktop ? $translate?.floorName : prop?.floorNo ? prop?.floorNo : ''}{!$desktop &&
				'/' + prop?.buildingFloors
					? prop?.buildingFloors
					: ''}
				{ $translate?.floorName }
			</div>
		</div>
		{/if}
		{#if prop.bathroom}

		<div class="">
			<div class="flex items-center justify-center">
				<svg
					class="h-8 w-8 fill-secondary"
					viewBox="-12 0 568 512"
					width="512pt"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="m488.726562 273h-97v-186c0-47.972656-39.027343-87-87-87-46.964843 0-85.355468 37.410156-86.941406 84h-33.058594v30h96v-30h-32.917968c1.566406-30.039062 26.496094-54 56.917968-54 31.429688 0 57 25.570312 57 57v186h-361.726562v30h25.726562v63.28125c0 46.996094 29.679688 87.183594 71.273438 102.824219v42.894531h30v-36.238281c2.816406.21875 5.664062.332031 8.535156.332031h217.65625c2.871094 0 5.71875-.113281 8.535156-.332031v36.238281h30v-42.894531c41.59375-15.640625 71.273438-55.828125 71.273438-102.824219v-63.28125h25.726562zm-55.726562 93.28125c0 44.007812-35.804688 79.808594-79.808594 79.808594h-217.652344c-44.007812 0-79.8125-35.800782-79.8125-79.808594v-63.28125h56.304688v74.667969h158v-74.667969h162.96875zm-192.96875-63.28125v44.667969h-98v-44.667969zm0 0"
					/>
				</svg>
				<div class="hidden md:block text-sm md:text-md font-normal pl-2">
					{prop?.bathroom}
					{$translate?.piece}
				</div>
			</div>
			<div class="block md:hidden text-sm md:text-md font-normal ">
				{prop?.bathroom}
				{$translate?.piece}
			</div>
			<div class="hidden md:block text-sm md:text-md text-center ">
				{$desktop ? $translate?.bathNumberName : prop?.bathroom}
				{!$desktop ? $translate?.bathName : ''}
			</div>
		</div>
		{/if}
		{#if prop.propType}
		<div class="">
			<div class="flex items-center justify-center">
				<svg
					class="h-[1.8rem] w-[1.8rem] fill-secondary"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 64 64"
					><defs
						><style>
							.clss-2 {
								stroke: #ff6716;
								stroke-width: 2;
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
				<div class="hidden md:block text-sm md:text-md  font-normal pl-2 text-center md:text-left">
					{prop?.propType?.name ? prop?.propType?.name[$lang] : ''}
				</div>
			</div>
			<div class="block md:hidden text-sm md:text-md  font-normal pt-1 text-center md:text-left">
				{prop?.propType?.name ? prop?.propType?.name[$lang] : ''}
			</div>
			<div class="hidden md:block pt-1 text-sm md:text-md ">
				{$desktop ? $translate?.propTypeName : prop?.propType?.name[$lang]}
			</div>
		</div>
		{/if}
	</div>
</div>
