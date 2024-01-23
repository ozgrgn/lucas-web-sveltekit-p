<script>
	import { enhance } from '$app/forms';
	import { lang, admin } from '$services/store';
	import { panelDrawer } from '$services/store';
	export let adminName;
	const langTrigger = (_lang) => {
		document.documentElement.setAttribute('lang', _lang);
		setTimeout(() => {
			lang.set(_lang);
		}, 1); // cause svelte is faster than browser
	};

	let navbarOpen = false;

	const logout = () => {
		admin.set(null);
	};
</script>

<!-- Navbar -->
<nav
	class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
>
	<div class="w-full items-center flex justify-end lg:justify-between md:flex-nowrap flex-wrap">
		<!-- Brand -->

		<nav class="flex flex-row gap-2 items-center w-full">
			<div class="flex flex-wrap justify-between items-center w-full">
				<a href="/panel/dashboard" class="md:hidden text-white font-bold">LUCAS WEB</a>
				<button
					on:click={() => (navbarOpen = !navbarOpen)}
					type="button"
					class="inline-flex items-center p-2 ml-3 rounded-lg md:hidden focus:outline-none outline-0"
				>
					{#if navbarOpen}
						<i class="fa fa-window-close text-xl text-white" />
					{:else}
						<svg fill="#fff" viewBox="0 0 100 80" width="40" height="40">
							<rect width="80" height="5" />
							<rect y="30" width="80" height="5" />
							<rect y="60" width="80" height="5" />
						</svg>
					{/if}
				</button>
				<div class="{!navbarOpen ? 'hidden' : 'flex'} w-full md:flex" id="navbar-default">
					<div
						class="md:min-h-0 w-full flex flex-col justify-center md:justify-between items-center bg-transparent rounded border md:border-0 md:flex-row gap-2 w-full"
					>
						<div
							class="w-full flex flex-col md:flex-row flex-wrap  items-start justify-start mx-1 transition-all {$panelDrawer
								? 'lg:pl-[18rem]'
								: ''}"
						>
							<button class="" on:click={() => panelDrawer.set(!$panelDrawer)}>
								<svg fill="#fff" viewBox="0 0 100 80" width="40" height="40">
									<rect width="80" height="5" />
									<rect y="30" width="80" height="5" />
									<rect y="60" width="80" height="5" />
								</svg>
							</button>
						</div>
						<div class="flex flex-col md:flex-row items-center justify-center gap-2 w-4/12">
							<span class="text-white/80 font-medium cursor-pointer">
								{adminName}
							</span> <span class="text-white/80 mx-1 font-thin hidden md:block">|</span>

							<form use:enhance method="POST" action="/panel?/logout">
								<button class="text-white">Çıkış yap</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<!-- <div class="flex flex-row gap-2 items-center">
      <a
        class="text-white hidden lg:inline-block font-semibold {$location.pathname.indexOf(
          '/admin/dashboard'
        ) !== -1
          ? 'hover:text-white text-base'
          : 'text-white/80 hover:text-white'}"
        href="/panel/dashboard"
        
        
      >
        {$Translate("Dashboard")}
      </a>

      <a
        class="text-white hidden lg:inline-block font-semibold {$location.pathname.indexOf(
          'slider'
        ) !== -1
          ? 'hover:text-white text-base'
          : 'text-white/80 hover:text-white'}"
        href="/panel/sliders"
        
        
      >
        Slider
      </a>

      <a
        class="text-white hidden lg:inline-block font-semibold {$location.pathname.indexOf(
          'seatPlan'
        ) !== -1
          ? 'hover:text-white text-base'
          : 'text-white/80 hover:text-white'}"
        href="/panel/seatPlans"
        
        
      >
        Oturma Planı
      </a>
    </div> -->
		<!-- Form -->

		<!-- User -->

		<!-- <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
      <div class="mr-2">
        <a
          class="font-bold  text-white mr-2"
          on:click={() => langTrigger("tr")}
          href={"#"}>TR</a
        >
        <a
          class="font-bold  text-white mr-2"
          on:click={() => langTrigger("en")}
          href={"#"}>EN</a
        >
        <span class="text-white mx-1 font-thin">|</span>
        <span class="text-white font-medium  mr-4"> {$user?.email} </span>
      </div>

      <UserDropdown />
    </ul> -->
	</div>
</nav>
<!-- End Navbar -->
