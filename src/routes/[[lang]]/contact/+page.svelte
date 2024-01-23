<script>
	import RestService from '$services/rest';
	import Svg from '$assets/svg.json';

	import VideoBanner from '$src/lib/components/About/VideoBanner.svelte';
	import CardGroup from '$src/lib/components/VerticalCard/CardGroup.svelte';
	import StaffGroup from '$src/lib/components/StaffCard/StaffGroup.svelte';
	import { lang, general, translate } from '$services/store';
	import Form from '$src/lib/components/Home/Form.svelte';
	let aboutUs;
	const getAboutUss = async () => {
		let getAboutUssResponse = await RestService.getAboutUss(undefined, undefined, $lang);
		aboutUs = getAboutUssResponse['aboutUss'] && getAboutUssResponse['aboutUss'][0];
		console.log(aboutUs, 'about');
	};
	getAboutUss();
</script>

<VideoBanner />

<div class="container mx-auto lg:px-60 ">
	<div class=" md:flex mt-20 gap-10 px-2">
		<div class="md:w-1/3 h-[35rem] flex text-black/70 flex-col justify-center  flex flex-col gap-10">
			<div class=" h-[25rem] ">
				<Form messageSize="h-28 " />
			</div>
			<div
				class="h-full border p-5 pb-2 text-sm shadow bg-primary rounded text-white font-normal flex flex-col text-center"
			>
				<a href={`tel:${$general?.phone1}`} class="text-sm pb-1 z-40">
					<span class="font-normal">Tel:</span>
					{$general?.phone1}
				</a>
				<a href={`mailto:${$general?.email}`} class="text-sm  pb-1 z-40">
					<span class="font-normal">E-mail:</span>
					{$general?.email1}
				</a>

				<div class="">
					<span class="font-normal ">Adres:</span>
					{$general?.address1}
					{$general?.address2}
				</div>
				<div class="flex justify-center pt-5">
					<a href={$general?.facebook} class="cursor-pointer pr-6 self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class=" "
							width="25"
							height="25"
							fill="#bc74a5"
							viewBox="0 0 35 35"
						>
							{@html Svg?.facebook}
						</svg>
					</a>
					<a href={$general?.instagram} class="pr-6 self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class=" "
							width="25"
							height="25"
							fill="#0E3055"
							viewBox="0 0 35 35"
						>
							{@html Svg.instagram}
						</svg>
					</a>
					<a href="https://wa.me/{$general?.whatsapp1}" class="pr-6 self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class=""
							width="25"
							height="25"
							fill="#0E3055"
							viewBox="0 0 68 68"
						>
							{@html Svg?.whatsapp2}
						</svg>
					</a>
					<a href={$general?.youtube} class=" self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class=" "
							width="25"
							height="25"
							viewBox="0 0 108 108"
						>
							{@html Svg?.youtube}
						</svg>
					</a>
				</div>
			</div>
		</div>
		<div class="md:w-2/3 h-[35rem] rounded shadow pt-10 md:pt-0">
			<iframe
				title="map"
				src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3715.0201946201!2d30.8642328817931!3d36.857977317900094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c382c0ad4bfff1%3A0x5e83ae2f5701c8cd!2sSirius%20Town!5e0!3m2!1str!2str!4v1686043609832!5m2!1str!2str"
				width="100%"
				height="100%"
				style="border:0;"
				allowfullscreen=""
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			/>
		</div>
	</div>
	<div class="pt-3 pb-10 font-light" />
</div>
