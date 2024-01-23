<script>
	import { goto } from '$app/navigation';
	import Svg from '$assets/svg.json';
	import {
		lang,
		general,
		translate,
		propQuery,
		getData
	} from '$services/store';

	const useLinks = (propCat) => {
		propQuery.set({})
		$propQuery.propCat = propCat;
		$propQuery.propStatus = null;
		$propQuery.staff = null;
		$propQuery.propType = null;
		$propQuery.dontTouch = true;
		$propQuery.ready = true;
		getData.set(true)

		goto(`/${$lang}/properties`);
	};
	
</script>

<footer class="relative bg-primary xl:bg-primary  px-4 xl:px-0" aria-labelledby="footer-heading">
	<!-- <img
		class="absolute opacity-10 h-full w-full object-cover  object-top z-1"
		src="/assets/img/pr-02.jpg"
		alt=""
	/> -->

	<div class="max-w-7xl mx-auto pt-8 pb-4 :py-12  ">
		<div class="md:pb-8 xl:grid xl:grid-cols-6 xl:gap-6">
			<div class="xl:grid xl:col-span-2">
				<div class="first z-10">
					<a
						class="text-white text-sm font-bold leading-relaxed inline-block  whitespace-nowrap uppercase"
						href={`/${$lang}`}
					>
						<img class="w-20" src="/assets/lucas-logo-white.svg" alt="Lucas-Investment" />
					</a>
					<div class="pt-2 md:pt-2 ">
						<p class="text-md tracking-tight leading-7 text-white shadows ">
							{$general?.companyShortDesc}
						</p>
					</div>
				</div>
			</div>
			<div class="second z-20 ">
				<h3
					class="h-10 md:h-14  flex flex-col justify-end md:justify-center  text-xl font-semibold text-white"
				>
					{$translate?.links}
				</h3>
				<div class="lg:pt-5">
					{#if $general}
						<ul>
							<li class="pt-2 hover:scale-[1.03] ">
								<a
									href={`/${$lang}/${$general.footer1Perma}`}
									class="text-white text-sm font-medium pb-1 z-40"
								>
									{$general?.footer1}
								</a>
							</li>
							<li class="pt-2 hover:scale-[1.03]">
								<a
									href={`/${$lang}/${$general.footer2Perma}`}
									class="text-white text-sm font-medium pb-1 z-40"
								>
									{$general?.footer2}
								</a>
							</li>
							<li class="pt-2 hover:scale-[1.03]">
								<a
									href={`/${$lang}/${$general.footer3Perma}`}
									class="text-white text-sm font-medium pb-1 z-40"
								>
									{$general?.footer3}
								</a>
							</li>
							<!-- <li class="pt-2">
								<a
									href={`/${$lang}/${$general.footer4Perma}`}
									class="text-white text-sm font-semibold pb-1 z-40"
								>
									{$general?.footer4}
								</a>
							</li> -->
						</ul>
					{/if}
				</div>
			</div>
			<div class="third z-20 ">
				<h3
					class="h-10 md:h-14 flex flex-col justify-end md:justify-center text-xl hover:scale-[1.03] font-semibold text-white"
				>
					{$translate?.categories_BIG}
				</h3>
				<div class="lg:pt-5 ">
					<ul>
						<li class="pt-2">
							<div
								on:click={() => {
									useLinks('644a5b5f67133dd96468f8ee');
								}}
								on:keydown
								class="cursor-pointer text-white text-sm font-medium hover:scale-[1.03] pb-1 z-40"
							>
							{$translate?.housePortfolio}
							</div>
						</li>
						<li class="pt-2">
							<div
								on:click={() => {
									useLinks('644a5b7267133dd96468f8f5');
								}}
								on:keydown
								class="cursor-pointer text-white text-sm font-medium hover:scale-[1.03] pb-1 z-40"
							>
							{$translate?.commPortfolio}
							</div>
						</li>
						<li class="pt-2">
							<div
								on:click={() => {
									useLinks('64515cc880630110791bfbc2');
								}}
								on:keydown
								class="cursor-pointer text-white text-sm font-medium hover:scale-[1.03] pb-1 z-40"
							>
							{$translate?.landPortfolio}
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="fourth z-20 col-span-2 pt-1 ">
				<h3
					class="h-10 md:h-14 flex flex-col justify-end md:justify-center text-xl hover:scale-[1.03] font-semibold text-white"
				>
					{$translate?.contact}
				</h3>
				<div class="pt-2 lg:pt-4 h-auto ">
					<ul>
						<li class="pt-1 hover:scale-[1.03]">
							<a href={`tel:${$general?.phone1}`} class="text-white text-sm font-medium pb-1 z-40">
								<span class="font-semibold">{$translate?.phone}:</span>
								{$general?.phone1}
							</a>
						</li>
						<li class="pt-1 hover:scale-[1.03]">
							<a
								href={`mailto:${$general?.email}`}
								class="text-white text-sm font-medium pb-1 z-40"
							>
								<span class="font-semibold">{$translate?.email}:</span>
								{$general?.email1}
							</a>
						</li>

						<li class="pt-1 hover:scale-[1.03]">
							<span class="text-white text-sm font-medium pb-1 z-40">
								<span class="font-semibold">{$translate?.address}:</span>
								{$general?.address1}
								{$general?.address2}
							</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</footer>
<div class="bg-primary h-20 md:h-16 z-40 text-white py-2">
	<div
		class="h-full text-sm md:text-md flex flex-col md:flex-row justify-between items-center container mx-auto"
	>
		<div class="font-medium pb-2">
			{@html $general?.copright}
		</div>
		<div class="flex justify-center">
			<a href={$general?.facebook} class="cursor-pointer pr-6 self-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class=" "
					width="25"
					height="25"
					fill="#bc74a5"
					viewBox="0 0 35 35"
				>
					{@html Svg.facebook}
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
					{@html Svg.whatsapp2}
				</svg>
			</a>
			<a href={$general?.youtube} class="pr-5 self-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class=" "
					width="25"
					height="25"
					viewBox="0 0 108 108"
				>
					{@html Svg.youtube}
				</svg>
			</a>
		</div>
	</div>
</div>
