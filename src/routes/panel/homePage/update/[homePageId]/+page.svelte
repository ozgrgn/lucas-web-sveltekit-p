<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';

	const deleteHomePageApprove = (homePageId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteHomePage(homePageId);
					}
					modal.set(null);
				}
			})
		);
	};
	  let langs; const getLangs = async () => {
    let response = await RestService.getLanguages(undefined, undefined);
    langs = response["languages"];
  };
  getLangs();	export let data;
	

	let homePage;

	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'signSpot', customValue: null },
		{ key: 'signHeader', customValue: null },

		{ key: 'signText1', customValue: null },
		{ key: 'signText2', customValue: null },
		{ key: 'signText3', customValue: null },
		{ key: 'signText4', customValue: null },

		{ key: 'signYear', customValue: null },
		{ key: 'signManager', customValue: null },
		{ key: 'signManagerTitle', customValue: null },
		{ key: 'signImage', customValue: null },
		{ key: 'signAvatar', customValue: null },
		{ key: 'signatureImage', customValue: null },

		{ key: 'reviewSpot', customValue: null },
		{ key: 'reviewHeader', customValue: null },

		{ key: 'actionSpot', customValue: null },
		{ key: 'actionHeader', customValue: null },

		{ key: 'middleBannerTop', customValue: null },
		{ key: 'middleBannerCenter1', customValue: null },
		{ key: 'middleBannerCenter2', customValue: null },
		{ key: 'middleBannerBottom', customValue: null },
		{ key: 'middleBannerImage', customValue: null },
		{ key: 'middleBannerLink', customValue: null },

		{ key: 'formSlogan1', customValue: null },
		{ key: 'formSlogan2', customValue: null },
		{ key: 'formButton', customValue: null },
		{ key: 'formButtonLink', customValue: null },

		{ key: 'lastBlogsSpot', customValue: null },
		{ key: 'lastBlogsHeader', customValue: null },

		{ key: 'lastBlogTopLinkName', customValue: null },
		{ key: 'lastBlogTopLinkIcon', customValue: null },
		{ key: 'lastBlogTopLinkPerma', customValue: null },

		{ key: 'lastBlogLeftLinkIcon', customValue: null },
		{ key: 'lastBlogLeftLinkName', customValue: null },
		{ key: 'lastBlogLeftLinkPerma', customValue: null },

		{ key: 'lastBlogRightLinkImage', customValue: null },
		{ key: 'lastBlogRightLinkSpot', customValue: null },
		{ key: 'lastBlogRightLinkHeader', customValue: null },
		{ key: 'lastBlogRightLinkPerma', customValue: null },

		{ key: 'metaTitle', customValue: null },
		{ key: 'metaDescription', customValue: null }
	];


	const updateHomePage = async () => {
		let editedHomePage = {};
		values.map((v) => {
			editedHomePage[v.key] = homePage[v.key].value;
		});

		let response = await RestService.updateHomePage(homePage._id, editedHomePage);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/homePage');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getHomePage = async () => {
		let response = await RestService.getHomePage(data.homePageId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['homePage'][v.key] = {
						value: response['homePage'][v.key][v.customValue]
					};
				} else {
					response['homePage'][v.key] = { value: response['homePage'][v.key] };
				}
			});
			homePage = {
				...response['homePage']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getHomePage();

	const deleteHomePage = async (homePageId) => {
		let response = await RestService.deleteHomePage(homePageId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/homePage');
		} else {
			ToastService.success('İşlem başarılı');
		}
	};


</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<div class="flex justify-between">
			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => {
					goto('/panel/homePage');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteHomePageApprove(data.homePageId)}
			>
				<i class="fa fa-trash" />
				Sil
			</button>
		</div>

		<div
			class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
		>
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="text-center flex justify-between">
					<h3 class="font-semibold text-lg text-blueGray-700">Anasayfayı Güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if homePage}
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							{#if langs}
								<Select
									bind:value={homePage.lang.value}
									bind:isValid={homePage.lang.isValid}
									values={langs}
									title={'Dil Seçin'}
									valuesKey={'lang'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
								/>
							{/if}
						</div>
					</div>
					<div class="w-full lg:w-5/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İmzalı Tanıtım Spotu
							</label>
							<Input
								bind:value={homePage.signSpot.value}
								bind:isValid={homePage.signSpot.isValid}
								placeholder={'Spot Giriniz (Büyük Harf)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-5/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İmzalı Tanıtım Başlığı
							</label>
							<Input
								bind:value={homePage.signHeader.value}
								bind:isValid={homePage.signHeader.isValid}
								placeholder={'Başlık Giriniz'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İmzalı Tanıtım Text1
							</label>
							<Input
								bind:value={homePage.signText1.value}
								bind:isValid={homePage.signText1.isValid}
								placeholder={'Text1'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İmzalı Tanıtım Text2
							</label>
							<Input
								bind:value={homePage.signText2.value}
								bind:isValid={homePage.signText2.isValid}
								placeholder={'Text2'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İmzalı Tanıtım Text3
							</label>
							<Input
								bind:value={homePage.signText3.value}
								bind:isValid={homePage.signText3.isValid}
								placeholder={'Text3'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İmzalı Tanıtım Text4
							</label>
							<Input
								bind:value={homePage.signText4.value}
								bind:isValid={homePage.signText4.isValid}
								placeholder={'Text4'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İmzalı Tanıtım Yıl
							</label>
							<Input
								bind:value={homePage.signYear.value}
								bind:isValid={homePage.signYear.isValid}
								placeholder={'Yıl (15)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Manager İsmi
							</label>
							<Input
								bind:value={homePage.signManager.value}
								bind:isValid={homePage.signManager.isValid}
								placeholder={'Manager İsmi'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Manager Title
							</label>
							<Input
								bind:value={homePage.signManagerTitle.value}
								bind:isValid={homePage.signManagerTitle.isValid}
								placeholder={'(Manager)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İmzalı Tanıtım Büyük Resim (960x540)
							</label>
							<Image
								bind:value={homePage.signImage.value}
								bind:isValid={homePage.signImage.isValid}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İmzalı Tanıtım Avatar (100x100)
							</label>
							<Image
								bind:value={homePage.signAvatar.value}
								bind:isValid={homePage.signAvatar.isValid}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 ">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İmzalı Tanıtım İmza (150x48)
							</label>
							<Image
								bind:value={homePage.signatureImage.value}
								bind:isValid={homePage.signatureImage.isValid}
							/>
						</div>
					</div>

					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Yorumlar Spot
							</label>
							<Input
								bind:value={homePage.reviewSpot.value}
								bind:isValid={homePage.reviewSpot.isValid}
								placeholder={'Yorumlar Spot Giriniz (Büyük Harf)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Yorumlar Başlık
							</label>
							<Input
								bind:value={homePage.reviewHeader.value}
								bind:isValid={homePage.reviewHeader.isValid}
								placeholder={'Yorumlar Başlık Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Actions Spot
							</label>
							<Input
								bind:value={homePage.actionSpot.value}
								bind:isValid={homePage.actionSpot.isValid}
								placeholder={'Actions Spot Giriniz (Büyük Harf)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Actions Başlık
							</label>
							<Input
								bind:value={homePage.actionHeader.value}
								bind:isValid={homePage.actionHeader.isValid}
								placeholder={'Actions Başlık Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Orta Banner Üst Metin
							</label>
							<Input
								bind:value={homePage.middleBannerTop.value}
								bind:isValid={homePage.middleBannerTop.isValid}
								placeholder={'(FINANCIAL APPLICATION)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Orta Banner Orta 1
							</label>
							<Input
								bind:value={homePage.middleBannerCenter1.value}
								bind:isValid={homePage.middleBannerCenter1.isValid}
								placeholder={'(12)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Orta Banner Orta 2
							</label>
							<Input
								bind:value={homePage.middleBannerCenter2.value}
								bind:isValid={homePage.middleBannerCenter2.isValid}
								placeholder={'(months)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Orta Banner Alt Metin
							</label>
							<Input
								bind:value={homePage.middleBannerBottom.value}
								bind:isValid={homePage.middleBannerBottom.isValid}
								placeholder={'(NO IMPACT ON YOUR CREDIT SCORE)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-10/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Orta Banner Link
							</label>
							<Input
								bind:value={homePage.middleBannerLink.value}
								bind:isValid={homePage.middleBannerLink.isValid}
								placeholder={'link'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 ">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Orta Banner Resim (1512x544)
							</label>
							<Image
								bind:value={homePage.middleBannerImage.value}
								bind:isValid={homePage.middleBannerImage.isValid}
							/>
						</div>
					</div>

					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Form Slogan1 (Büyük)
							</label>
							<Input
								bind:value={homePage.formSlogan1.value}
								bind:isValid={homePage.formSlogan1.isValid}
								placeholder={'GET'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-5/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Form Slogan2 (Devam Metin)
							</label>
							<Input
								bind:value={homePage.formSlogan2.value}
								bind:isValid={homePage.formSlogan2.isValid}
								placeholder={'Form Slogan 2'}
								required={false}
							/>
						</div>
					</div>

				
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Form Button İsmi
							</label>
							<Input
								bind:value={homePage.formButton.value}
								bind:isValid={homePage.formButton.isValid}
								placeholder={'Form Buton İsmi Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Form Button Link
							</label>
							<Input
								bind:value={homePage.formButtonLink.value}
								bind:isValid={homePage.formButtonLink.isValid}
								placeholder={'Form Buton Linki Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Spot
							</label>
							<Input
								bind:value={homePage.lastBlogsSpot.value}
								bind:isValid={homePage.lastBlogsSpot.isValid}
								placeholder={'Son Bloglar Spot Giriniz (Büyük Harf)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Başlık
							</label>
							<Input
								bind:value={homePage.lastBlogsHeader.value}
								bind:isValid={homePage.lastBlogsHeader.isValid}
								placeholder={'Son Bloglar Başlık Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Üst Link İsmi
							</label>
							<Input
								bind:value={homePage.lastBlogTopLinkName.value}
								bind:isValid={homePage.lastBlogTopLinkName.isValid}
								placeholder={'Link İsmi Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Üst Link
							</label>
							<Input
								bind:value={homePage.lastBlogTopLinkPerma.value}
								bind:isValid={homePage.lastBlogTopLinkPerma.isValid}
								placeholder={'Linki Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Üst Icon SVG
							</label>
							<Input
								bind:value={homePage.lastBlogTopLinkIcon.value}
								bind:isValid={homePage.lastBlogTopLinkIcon.isValid}
								placeholder={'SVG Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Sol Link İsmi
							</label>
							<Input
								bind:value={homePage.lastBlogLeftLinkName.value}
								bind:isValid={homePage.lastBlogLeftLinkName.isValid}
								placeholder={'Link İsmi Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Sol Link
							</label>
							<Input
								bind:value={homePage.lastBlogLeftLinkPerma.value}
								bind:isValid={homePage.lastBlogLeftLinkPerma.isValid}
								placeholder={'Linki Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Sol Icon SVG
							</label>
							<Input
								bind:value={homePage.lastBlogLeftLinkIcon.value}
								bind:isValid={homePage.lastBlogLeftLinkIcon.isValid}
								placeholder={'SVG Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Sağ Kategori
							</label>
							<Input
								bind:value={homePage.lastBlogRightLinkSpot.value}
								bind:isValid={homePage.lastBlogRightLinkImage.isValid}
								placeholder={'Kategori Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Sağ Alt Başlık
							</label>
							<Input
								bind:value={homePage.lastBlogRightLinkHeader.value}
								bind:isValid={homePage.lastBlogRightLinkHeader.isValid}
								placeholder={'Başlık Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Sağ Alt Link
							</label>
							<Input
								bind:value={homePage.lastBlogRightLinkPerma.value}
								bind:isValid={homePage.lastBlogRightLinkPerma.isValid}
								placeholder={'Link Giriniz'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Son Bloglar Sağ Alt Resim (400x400)
							</label>
							<Image
								bind:value={homePage.lastBlogRightLinkImage.value}
								bind:isValid={homePage.lastBlogRightLinkImage.isValid}
								
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Meta Başlığı Max 50 ({homePage?.metaTitle?.value?.length
									? homePage?.metaTitle?.value?.length
									: 0})
							</label>
							<Input
								bind:value={homePage.metaTitle.value}
								bind:isValid={homePage.metaTitle.isValid}
								placeholder={'Anasayfa Meta Başlığı 50 Karakter'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Meta Açıklası Max 150 ({homePage?.metaDescription?.value?.length
									? homePage?.metaDescription?.value?.length
									: 0})
							</label>
							<Input
								bind:value={homePage.metaDescription.value}
								bind:isValid={homePage.metaDescription.isValid}
								placeholder={'Anasayfa Meta Açıklaması 150 Karakter'}
								required={false}
							/>
						</div>
					</div>
				</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateHomePage()}
								disabled={!homePage.lang.isValid}
								class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
								type="button"
							>
								Güncelle
							</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
