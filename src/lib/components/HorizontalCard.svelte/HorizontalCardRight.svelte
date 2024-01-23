<script>
	import GenericButton from '../Buttons/GenericButton.svelte';
	import { desktop, lang,translate } from '$services/store';
	import { formatTRY } from '$services/utils';
	import moment from 'moment';

	export let prop;
</script>

<div class="flex h-36">
	<div class="w-full">
		<div class="w-full flex justify-between ">
			<GenericButton
				customClass=" h-7 px-2  bg-primary text-white text-sm rounded tracking-tight font-medium "
				buttonText={prop.propStatus && prop?.propStatus?.name[$lang]
					? prop?.propStatus?.name[$lang]
					: ''}
			/>

			<h4 class=" p-1  text-lg font-normal text-black tracking-tight">
				{prop?.price && prop?.price[$lang] ? formatTRY(prop?.price[$lang]) : ''}
				{prop?.currency && prop?.currency[$lang] && prop?.currency[$lang] == 'TRY'
					? 'TL'
					: prop?.currency && prop?.currency[$lang] && prop?.currency[$lang] == 'USD'
					? '$'
					: prop?.currency && prop?.currency[$lang] && prop?.currency[$lang] == 'RUB'
					? '₽'
					: ''}
			</h4>
		</div>
		<div class="flex items-center pt-1 ">
			<h3
				class="text-md truncate text-[#222222] hover:text-secondary cursor-pointer transition-all tracking-tight"
			>
				{prop?.name && prop?.name[$lang] ? prop?.name[$lang] : ''}
			</h3>
		</div>

		<div class="flex items-center ">
			<!-- <i class="text-black/70 pr-1 bi bi-geo-alt-fill" /> -->
			<h4 class="text-md font-light text-[#636363]">
				{prop?.city?.name && prop?.city?.name[$lang] ? prop?.city?.name[$lang] : '-'}/{prop?.state
					?.name && prop?.state?.name[$lang]
					? prop?.state?.name[$lang]
					: '-'}/{prop?.district?.name && prop?.district?.name[$lang]
					? prop?.district?.name[$lang]
					: '-'}
			</h4>
		</div>
		<div class="flex justify-between">
			<div class="flex py-3 gap-4">
				{#if prop.roomNumber && prop.roomNumber.name[$lang]}
					<div class="flex items-center">
						<svg
							class="h-6 w-6 fill-secondary"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 64 64"
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

						<div class="text-sm font-normal pl-2">
							{prop?.roomNumber?.name && prop?.roomNumber?.name[$lang]
								? prop?.roomNumber?.name[$lang]
								: ''}
						</div>
					</div>
				{/if}
				<div class="flex items-center">
					<svg class="h-6 w-6 fill-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
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

					<div class="text-sm font-normal pl-2">
						{prop?.brutm2 ? prop?.brutm2 : ''} <span class="font-normal">m2</span>
					</div>
				</div>
				{#if prop.propType	}
				<div class="flex items-center">
					<svg
						class="h-[1.6rem] w-[1.6rem] fill-secondary"
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
					<div class="text-sm font-normal pl-2">
						{prop?.propType?.name ? prop?.propType?.name[$lang] : ''}
					</div>
				</div>
				{/if}
				{#if prop.floorNo}
					<div class="flex items-center -ml-1">
						<svg
							class="h-7 w-7 fill-secondary mb-[0.14rem] "
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
								points=" 50,78.333 26.668,66.667 15,72.504 50,90 85,72.504 73.332,66.667 "
							/>
						</svg>
						<div class="text-sm font-normal pl-2">
							{prop?.floorNo ? prop?.floorNo : ''}/{prop?.buildingFloors
								? prop?.buildingFloors
								: ''} {$translate.floorName}
						</div>
					</div>
				{/if}
			</div>

			<div class="self-center">
				<GenericButton
					customClass=" h-7 px-2  bg-secondary text-white text-sm rounded tracking-tight font-medium "
					buttonText="DETAYLI BİLGİ"
				/>
			</div>
		</div>
	</div>
</div>
<div class=" border-t text-md  text-[#636363] flex flex-wrap justify-between pt-3">
	<div class=" ">
		<div class="text-sm  cursor-pointer font-light  flex items-center gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				class="bi bi-person"
				viewBox="0 0 16 16"
			>
				<path
					d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"
				/>
			</svg>
			<div class="min-w-28  cursor-pointer">
				{prop?.staff?.fullName ? prop?.staff?.fullName : ''}
			</div>
			<div class="flex justify-center items-center gap-2 pl-2">
				{#if !$desktop}
					<a href="tel:{prop?.staff?.phone}">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="14"
							height="14"
							fill="currentColor"
							class="bi bi-telephone hover:fill-secondary"
							viewBox="0 0 16 16"
						>
							<path
								d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
							/>
						</svg>
					</a>
				{/if}
				<a href="tel:{prop?.staff?.email}">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="15"
						height="15"
						fill="currentColor"
						class="bi bi-envelope hover:fill-secondary"
						viewBox="0 0 16 16"
					>
						<path
							d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
						/>
					</svg>
				</a>

				<a
					href={prop?.no
						? `https://wa.me/${prop?.staff?.whatsapp}?text=Merhaba ${prop?.no} numaralı ilanınız ile ilgili bilgi almak istiyorum.`
						: `https://wa.me/${prop?.staff?.whatsapp}`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="14"
						height="14"
						fill="currentColor"
						class="ml-[0.2rem] bi bi-whatsapp hover:fill-secondary"
						viewBox="0 0 16 16"
					>
						<path
							d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
	<div class="text-xs font-light flex gap-2 items-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			fill="currentColor"
			class="bi bi-paperclip ml-[0.1rem] "
			viewBox="0 0 16 16"
		>
			<path
				d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"
			/>
		</svg>
		<div class="text-sm">{prop?.no ? prop?.no : ''}</div>
	</div>
</div>
