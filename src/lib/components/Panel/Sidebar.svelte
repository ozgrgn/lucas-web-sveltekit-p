<script>
	import { panelDrawer } from '$services/store';
	import SideMenuButton from './SideMenuButton.svelte';

	let innerWidth;
	let oldInnerWidth;
	$: {
		if (oldInnerWidth != innerWidth) {
			if (innerWidth < 1000 && $panelDrawer) {
				panelDrawer.set(false);
			}
			if (innerWidth > 1000 && !$panelDrawer) {
				panelDrawer.set(true);
			}
		}
		oldInnerWidth = innerWidth;
	}
</script>

<svelte:window bind:innerWidth />
<div
	class="fixed transition-all z-[99999] 
  {!$panelDrawer ? 'w-0 hidden' : ''}
  {$panelDrawer ? 'w-[18rem]' : ''}
  bg-[#f6f8fa] h-screen flex flex-row z-[100]"
>
	<div class="w-[18rem] shadow-lg">
		<div class="pt-5 pb-5 flex justify-center">
			<img class=" h-16" src="/assets/lucas-logo-primary.svg" alt="" />
		</div>

		<div class="overflow-y-auto h-[calc(100%-9.75rem)] px-4">
			<div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
				<h2 class="text-black text-bold border-b text-md py-1">EMLAK VERİLERİ</h2>
				<SideMenuButton closePanel={true} title={'Projeler'} href={'/panel/project'} />

				<SideMenuButton closePanel={true} title={'Emlak'} href={'/panel/prop'} />

				<SideMenuButton title={'Emlak Kategorileri (Konut)'} href={'/panel/propCat'} />
				<SideMenuButton title={'Emlak Statüleri (Satılık)'} href={'/panel/propStatus'} />
				<SideMenuButton title={'Emlak Tipleri (Villa)'} href={'/panel/propType'} />
				<SideMenuButton title={'Şehir'} href={'/panel/city'} />
				<SideMenuButton title={'Bölge'} href={'/panel/state'} />
				<SideMenuButton title={'Mahalle'} href={'/panel/district'} />
			</div>

			<div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
				<h2 class="text-black text-bold border-b text-md py-1">EMLAK ÖZELLİKLERİ</h2>
				<SideMenuButton title={'Oda Sayısı'} href={'/panel/roomNumber'} />
				<SideMenuButton title={'Manzara'} href={'/panel/view'} />
				<SideMenuButton title={'İklimlendirme'} href={'/panel/climatic'} />
				<SideMenuButton title={'İskan Durumu'} href={'/panel/iskanStatus'} />
				<SideMenuButton title={'İmar Durumu'} href={'/panel/imarStatus'} />
				<SideMenuButton title={'Tapu Durumu'} href={'/panel/tapuStatus'} />
				<SideMenuButton title={'Tapu Devri'} href={'/panel/tapuTransfer'} />
				<SideMenuButton title={'Kullanım Durumu'} href={'/panel/useStatus'} />
				<SideMenuButton title={'Cephe'} href={'/panel/facade'} />
				<SideMenuButton title={'Havuz'} href={'/panel/pool'} />
				<SideMenuButton title={'Spor İmkanı'} href={'/panel/sport'} />
				<SideMenuButton title={'Otopark'} href={'/panel/otopark'} />
				<SideMenuButton title={'Mutfak'} href={'/panel/kitchen'} />
				<SideMenuButton title={'Jenerator'} href={'/panel/jenerator'} />
				<SideMenuButton title={'Vatandaşlık İmkanı'} href={'/panel/citizenship'} />
				<SideMenuButton title={'Kira Periyodu'} href={'/panel/rentPeriod'} />
				<SideMenuButton title={'Kira Süresi'} href={'/panel/rentTime'} />

			</div>
			<div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
				<h2 class="text-black text-bold border-b text-md py-1">GENEL BİLGİLER</h2>
				<SideMenuButton title={'Diller'} href={'/panel/language'} />
				<SideMenuButton title={'Genel Bilgiler'} href={'/panel/general'} />
				<SideMenuButton title={'Çeviriler'} href={'/panel/translate'} />
				<SideMenuButton title={'Yorumlar'} href={'/panel/review'} />
				<SideMenuButton title={'Takım'} href={'/panel/staff'} />
			</div>
			<div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
				<h2 class="text-black text-bold border-b text-md py-1">SAYFALAR</h2>
				<SideMenuButton title={'Anasayfa'} href={'/panel/homePage'} />
				<SideMenuButton title={'Hakkımızda Sayfası'} href={'/panel/aboutUs'} />
			</div>
			<!-- <div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
				<h2 class="text-black text-bold border-b text-md py-1">BLOGLAR</h2>
				<SideMenuButton title={'Blog Kategorileri '} href={'/panel/blogCat'} />
				<SideMenuButton title={'Bloglar'} href={'/panel/blog'} />

			</div> -->
			<!-- <div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
        <h2 class="text-black text-bold border-b text-md py-1">TANIMLAMALAR</h2>

        <SideMenuButton
          icon={"bi bi-tag"}
          title={"Kategoriler"}
          href={"/panel/cats"}
        />
        <SideMenuButton
        icon={"bi bi-bag-heart"}
        title={"Üyelikler"}
        href={"/panel/memberships"}
      />

        <SideMenuButton
        icon={"bi bi-award"}
          title={"Markalar"}
          href={"/panel/brands"}
        />

        <SideMenuButton
        icon={"bi bi-calculator"}
          title={"Birimler"}
          href={"/panel/units"}
        />
      </div>
      <div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
        <h2 class="text-black text-bold border-b text-md py-1">SATIŞ İŞLEMLERİ</h2>

        <SideMenuButton
          icon={"bi bi-cart4"}
          title={"Ürünler"}
          href={"/panel/products"}
        />

        <SideMenuButton
        icon={"bi bi-basket2"}
          title={"Satışlar"}
          href={"/panel/transactions"}
        />

      </div>
      <div class="rounded bg-neutral p-2 flex flex-col gap-1 mb-2">
        <h2 class="text-black text-bold border-b text-md py-1">SİTE VERİLERİ</h2>

        <SideMenuButton
          icon={"bi bi-images"}
          title={"Sliderlar"}
          href={"/panel/sliders"}
        />

      </div> -->
		</div>
	</div>
</div>
