<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';

	const deleteTranslateApprove = (translateId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteTranslate(translateId);
					}
					modal.set(null);
				}
			})
		);
	};
	let langs;
	const getLangs = async () => {
		let response = await RestService.getLanguages(undefined, undefined);
		langs = response['languages'];
	};
	getLangs();
	export let data;

	let translate;

	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'years', customValue: null },
		{ key: 'yourName', customValue: null },
		{ key: 'yourMail', customValue: null },
		{ key: 'yourPhone', customValue: null },
		{ key: 'yourMessage', customValue: null },
		{ key: 'phoneRequired', customValue: null },
		{ key: 'nameRequired', customValue: null },
		{ key: 'mailRequired', customValue: null },
		{ key: 'send', customValue: null },
		{ key: 'phone', customValue: null },
		{ key: 'email', customValue: null },
		{ key: 'whatsapp', customValue: null },
		{ key: 'address', customValue: null },
		{ key: 'image', customValue: null },
		{ key: 'readMore', customValue: null },
		{ key: 'postedOn', customValue: null },
		{ key: 'links', customValue: null },
		{ key: 'mailSent', customValue: null },
		{ key: 'loadMore', customValue: null },
		{ key: 'all', customValue: null },
		{ key: 'categories_BIG', customValue: null },
		{ key: 'clear', customValue: null },
		{ key: 'advancedSearch', customValue: null },
		{ key: 'search', customValue: null },
		{ key: 'project', customValue: null },
		{ key: 'projectPortfolio', customValue: null },
		{ key: 'house', customValue: null },
		{ key: 'housePortfolio', customValue: null },
		{ key: 'commercial', customValue: null },
		{ key: 'commPortfolio', customValue: null },
		{ key: 'land', customValue: null },
		{ key: 'landPortfolio', customValue: null },
		{ key: 'homepage', customValue: null },
		{ key: 'aboutUs', customValue: null },
		{ key: 'contact', customValue: null },
		{ key: 'propCatName', customValue: null },
		{ key: 'propCatChoose', customValue: null },
		{ key: 'propSatusName', customValue: null },
		{ key: 'propSatusChoose', customValue: null },
		{ key: 'propTypeName', customValue: null },
		{ key: 'protTypeChoose', customValue: null },
		{ key: 'rentByLucas', customValue: null },
		{ key: 'soldByLucas', customValue: null },
		{ key: 'showPortfolio', customValue: null },
		{ key: 'teamMeet', customValue: null },
		{ key: 'teamDesc', customValue: null },
		{ key: 'staffChoose', customValue: null },
		{ key: 'staffName', customValue: null },
		{ key: 'isFurniture', customValue: null },
		{ key: 'furnitureName', customValue: null },
		{ key: 'isSecurity', customValue: null },
		{ key: 'securityName', customValue: null },
		{ key: 'isBalcone', customValue: null },
		{ key: 'balconeName', customValue: null },
		{ key: 'isTeras', customValue: null },
		{ key: 'terasName', customValue: null },
		{ key: 'isElevator', customValue: null },
		{ key: 'elavatorName', customValue: null },
		{ key: 'roomNumberName', customValue: null },
		{ key: 'viewName', customValue: null },
		{ key: 'climaticName', customValue: null },
		{ key: 'facadeName', customValue: null },
		{ key: 'useStatusName', customValue: null },
		{ key: 'iskanStatusName', customValue: null },
		{ key: 'tapuStatusName', customValue: null },
		{ key: 'bathNumberName', customValue: null },
		{ key: 'bathName', customValue: null },
		{ key: 'yearName', customValue: null },
		{ key: 'poolName', customValue: null },
		{ key: 'otoparkName', customValue: null },
		{ key: 'netM2Name', customValue: null },
		{ key: 'brutM2Name', customValue: null },
		{ key: 'filterHeader', customValue: null },
		{ key: 'moreInfo', customValue: null },
		{ key: 'linkCopied', customValue: null },
		{ key: 'description', customValue: null },
		{ key: 'generalInfo', customValue: null },
		{ key: 'depositName', customValue: null },
		{ key: 'rentTimeName', customValue: null },
		{ key: 'rentPeriodName', customValue: null },
		{ key: 'dueName', customValue: null },
		{ key: 'heightName', customValue: null },
		{ key: 'sportName', customValue: null },
		{ key: 'doormanName', customValue: null },
		{ key: 'fireStairName', customValue: null },
		{ key: 'kitchenName', customValue: null },
		{ key: 'camName', customValue: null },
		{ key: 'jeneratorName', customValue: null },
		{ key: 'piece', customValue: null },
		{ key: 'gallery', customValue: null },
		{ key: 'profile', customValue: null },
		{ key: 'featuresName', customValue: null },
		{ key: 'videoName', customValue: null },
		{ key: 'virtualName', customValue: null },
		{ key: 'floorName', customValue: null },
		{ key: 'map', customValue: null },
		{ key: 'noProp', customValue: null },
		{ key: 'sellCost', customValue: null },
		{ key: 'rentCost', customValue: null },
		{ key: 'adaName', customValue: null },
		{ key: 'parselName', customValue: null },
		{ key: 'imarSatusName', customValue: null },
		{ key: 'tapuTransferName', customValue: null },
		{ key: 'citizenshipName', customValue: null },
		{ key: 'yesName', customValue: null },
		{ key: 'noName', customValue: null },
		{ key: 'projectName', customValue: null },
		{ key: 'projectInfoName', customValue: null },
		{ key: 'technicalName', customValue: null },
		{ key: 'driveLinkName', customValue: null }

	];

	const updateTranslate = async () => {
		let editedTranslate = {};
		values.map((v) => {
			editedTranslate[v.key] = translate[v.key].value;
		});

		let response = await RestService.updateTranslate(translate._id, editedTranslate);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/translate');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getTranslate = async () => {
		let response = await RestService.getTranslate(data.translateId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['translate'][v.key] = {
						value: response['translate'][v.key][v.customValue]
					};
				} else {
					response['translate'][v.key] = { value: response['translate'][v.key] };
				}
			});
			translate = {
				...response['translate']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getTranslate();

	const deleteTranslate = async (translateId) => {
		let response = await RestService.deleteTranslate(translateId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/translate');
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
					goto('/panel/translate');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteTranslateApprove(data.translateId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Çevirileri güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if translate}
					<div class="flex flex-wrap my-4">
						<div class="w-full lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Dil
								</label>
								{#if langs}
									<Select
										bind:value={translate.lang.value}
										bind:isValid={translate.lang.isValid}
										values={langs}
										title={'Dil Seçin'}
										valuesKey={'lang'}
										valuesTitleKey={'name'}
										customClass={'w-full h-9'}
									/>
								{/if}
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									İletişim
								</label>
								<Input
									bind:value={translate.contact.value}
									bind:isValid={translate.contact.isValid}
									placeholder={'İletişim'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Hakkımızda
								</label>
								<Input
									bind:value={translate.aboutUs.value}
									bind:isValid={translate.aboutUs.isValid}
									placeholder={'Hakkımızda'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Yıl
								</label>
								<Input
									bind:value={translate.years.value}
									bind:isValid={translate.years.isValid}
									placeholder={'(Years)'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									İsminiz
								</label>
								<Input
									bind:value={translate.yourName.value}
									bind:isValid={translate.yourName.isValid}
									placeholder={'Your Name'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Telefonunuz
								</label>
								<Input
									bind:value={translate.yourPhone.value}
									bind:isValid={translate.yourPhone.isValid}
									placeholder={'Your Phone'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Mailiniz
								</label>
								<Input
									bind:value={translate.yourMail.value}
									bind:isValid={translate.yourMail.isValid}
									placeholder={'Your E-mail'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Mesajınız
								</label>
								<Input
									bind:value={translate.yourMessage.value}
									bind:isValid={translate.yourMessage.isValid}
									placeholder={'Your Message'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Telefon Gerekli
								</label>
								<Input
									bind:value={translate.phoneRequired.value}
									bind:isValid={translate.phoneRequired.isValid}
									placeholder={'Phone Required'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									İsim Gerekli
								</label>
								<Input
									bind:value={translate.nameRequired.value}
									bind:isValid={translate.nameRequired.isValid}
									placeholder={'Name Required'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Mail Gerekli
								</label>
								<Input
									bind:value={translate.mailRequired.value}
									bind:isValid={translate.mailRequired.isValid}
									placeholder={'Mail Required'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Gönder
								</label>
								<Input
									bind:value={translate.send.value}
									bind:isValid={translate.send.isValid}
									placeholder={'Send'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-4/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Form Gönderildi
								</label>
								<Input
									bind:value={translate.mailSent.value}
									bind:isValid={translate.mailSent.isValid}
									placeholder={'Form Gönderildi'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Telefon
								</label>
								<Input
									bind:value={translate.phone.value}
									bind:isValid={translate.phone.isValid}
									placeholder={'Phone'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									E-Posta
								</label>
								<Input
									bind:value={translate.email.value}
									bind:isValid={translate.email.isValid}
									placeholder={'E-mail'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Whatsapp
								</label>
								<Input
									bind:value={translate.whatsapp.value}
									bind:isValid={translate.whatsapp.isValid}
									placeholder={'Whatsapp'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Adres
								</label>
								<Input
									bind:value={translate.address.value}
									bind:isValid={translate.address.isValid}
									placeholder={'Address'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Resim
								</label>
								<Input
									bind:value={translate.image.value}
									bind:isValid={translate.image.isValid}
									placeholder={'Image'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Devamı
								</label>
								<Input
									bind:value={translate.readMore.value}
									bind:isValid={translate.readMore.isValid}
									placeholder={'ReadMore'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Yayınlanan Yer
								</label>
								<Input
									bind:value={translate.postedOn.value}
									bind:isValid={translate.postedOn.isValid}
									placeholder={'Posted On'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Links
								</label>
								<Input
									bind:value={translate.links.value}
									bind:isValid={translate.links.isValid}
									placeholder={'LINKS'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Daha Fazla Yükle
								</label>
								<Input
									bind:value={translate.loadMore.value}
									bind:isValid={translate.loadMore.isValid}
									placeholder={'Load More'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Tümü
								</label>
								<Input
									bind:value={translate.all.value}
									bind:isValid={translate.all.isValid}
									placeholder={'Tümü'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Portföyümüz
								</label>
								<Input
									bind:value={translate.categories_BIG.value}
									bind:isValid={translate.categories_BIG.isValid}
									placeholder={'Portföyümüz'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Proje
								</label>
								<Input
									bind:value={translate.project.value}
									bind:isValid={translate.project.isValid}
									placeholder={'Proje'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Proje Portföyü
								</label>
								<Input
									bind:value={translate.projectPortfolio.value}
									bind:isValid={translate.projectPortfolio.isValid}
									placeholder={'Proje Portföyü'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Konut
								</label>
								<Input
									bind:value={translate.house.value}
									bind:isValid={translate.house.isValid}
									placeholder={'Konut'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Konut Portföyü
								</label>
								<Input
									bind:value={translate.housePortfolio.value}
									bind:isValid={translate.housePortfolio.isValid}
									placeholder={'Konut Portföyü'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Ticari
								</label>
								<Input
									bind:value={translate.commercial.value}
									bind:isValid={translate.commercial.isValid}
									placeholder={'Ticari'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Ticari Portföy
								</label>
								<Input
									bind:value={translate.commPortfolio.value}
									bind:isValid={translate.commPortfolio.isValid}
									placeholder={'Ticari Portföy'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Arsa/Arazi
								</label>
								<Input
									bind:value={translate.land.value}
									bind:isValid={translate.land.isValid}
									placeholder={'Arsa/Arazi'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Arsa/Arazi Portföyü
								</label>
								<Input
									bind:value={translate.landPortfolio.value}
									bind:isValid={translate.landPortfolio.isValid}
									placeholder={'Arsa/Arazi Portföyü'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Temizle
								</label>
								<Input
									bind:value={translate.clear.value}
									bind:isValid={translate.clear.isValid}
									placeholder={'Temizle'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Gelişmiş Arama
								</label>
								<Input
									bind:value={translate.advancedSearch.value}
									bind:isValid={translate.advancedSearch.isValid}
									placeholder={'Gelişmiş Arama'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Arama
								</label>
								<Input
									bind:value={translate.search.value}
									bind:isValid={translate.search.isValid}
									placeholder={'Arama'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Ana Sayfa
								</label>
								<Input
									bind:value={translate.homepage.value}
									bind:isValid={translate.homepage.isValid}
									placeholder={'ANASAYFA'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Hakkımızda
								</label>
								<Input
									bind:value={translate.aboutUs.value}
									bind:isValid={translate.aboutUs.isValid}
									placeholder={'HAKKIMIZDA'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									İletişim
								</label>
								<Input
									bind:value={translate.contact.value}
									bind:isValid={translate.contact.isValid}
									placeholder={'CONTACT'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Emlak Kategorisi
								</label>
								<Input
									bind:value={translate.propCatName.value}
									bind:isValid={translate.propCatName.isValid}
									placeholder={'Emlak Kategorisi'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Emlak Kategorisi Seçin
								</label>
								<Input
									bind:value={translate.propCatChoose.value}
									bind:isValid={translate.propCatChoose.isValid}
									placeholder={'Emlak Kategorisi Seçin'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Emlak Durumu Seçin
								</label>
								<Input
									bind:value={translate.propSatusName.value}
									bind:isValid={translate.propSatusName.isValid}
									placeholder={'Emlak Kategorisi Seçin'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Emlak Durumu Seçin
								</label>
								<Input
									bind:value={translate.propSatusChoose.value}
									bind:isValid={translate.propSatusChoose.isValid}
									placeholder={'Emlak Durumu Seçin'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Emlak Tipi
								</label>
								<Input
									bind:value={translate.propTypeName.value}
									bind:isValid={translate.propTypeName.isValid}
									placeholder={'Emlak Tipi'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Emlak Tipi Seçin
								</label>
								<Input
									bind:value={translate.protTypeChoose.value}
									bind:isValid={translate.protTypeChoose.isValid}
									placeholder={'Emlak Tipi Seçin'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Rent By Lucas
								</label>
								<Input
									bind:value={translate.rentByLucas.value}
									bind:isValid={translate.rentByLucas.isValid}
									placeholder={'Rent By Lucas'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Sold By Lucas
								</label>
								<Input
									bind:value={translate.soldByLucas.value}
									bind:isValid={translate.soldByLucas.isValid}
									placeholder={'Sold By Lucas'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Portföyünü Göster
								</label>
								<Input
									bind:value={translate.showPortfolio.value}
									bind:isValid={translate.showPortfolio.isValid}
									placeholder={'Portföyünü Göster'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Takımımızla Tanışın
								</label>
								<Input
									bind:value={translate.teamMeet.value}
									bind:isValid={translate.teamMeet.isValid}
									placeholder={'Takımımızla Tanışın'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Takım Spot
								</label>
								<Input
									bind:value={translate.teamDesc.value}
									bind:isValid={translate.teamDesc.isValid}
									placeholder={'Takım Spot'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Temsilci Seçin
								</label>
								<Input
									bind:value={translate.staffChoose.value}
									bind:isValid={translate.staffChoose.isValid}
									placeholder={'Temsilci Seçin'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Temsilci
								</label>
								<Input
									bind:value={translate.staffName.value}
									bind:isValid={translate.staffName.isValid}
									placeholder={'Temsilci'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Mobilyalı mı?
								</label>
								<Input
									bind:value={translate.isFurniture.value}
									bind:isValid={translate.isFurniture.isValid}
									placeholder={'Mobilyalı mı?'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Mobilyalı
								</label>
								<Input
									bind:value={translate.furnitureName.value}
									bind:isValid={translate.furnitureName.isValid}
									placeholder={'Mobilyalı'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Güvenlik var mı?
								</label>
								<Input
									bind:value={translate.isSecurity.value}
									bind:isValid={translate.isSecurity.isValid}
									placeholder={'Güvenlik var mı?'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Güvenlik
								</label>
								<Input
									bind:value={translate.securityName.value}
									bind:isValid={translate.securityName.isValid}
									placeholder={'Güvenlik'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Balkon var mı?
								</label>
								<Input
									bind:value={translate.isBalcone.value}
									bind:isValid={translate.isBalcone.isValid}
									placeholder={'Balkon var mı?'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Balkon
								</label>
								<Input
									bind:value={translate.balconeName.value}
									bind:isValid={translate.balconeName.isValid}
									placeholder={'Balkon'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Teras var mı?
								</label>
								<Input
									bind:value={translate.isTeras.value}
									bind:isValid={translate.isTeras.isValid}
									placeholder={'Teras var mı?'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Teras
								</label>
								<Input
									bind:value={translate.terasName.value}
									bind:isValid={translate.terasName.isValid}
									placeholder={'Teras'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Asansör var mı?
								</label>
								<Input
									bind:value={translate.isElevator.value}
									bind:isValid={translate.isElevator.isValid}
									placeholder={'Asansör var mı?'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Asansör
								</label>
								<Input
									bind:value={translate.elavatorName.value}
									bind:isValid={translate.elavatorName.isValid}
									placeholder={'Asansör'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Oda Sayısı
								</label>
								<Input
									bind:value={translate.roomNumberName.value}
									bind:isValid={translate.roomNumberName.isValid}
									placeholder={'Oda Sayısı'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Manzara
								</label>
								<Input
									bind:value={translate.viewName.value}
									bind:isValid={translate.viewName.isValid}
									placeholder={'Manzara'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									İklimlendirme
								</label>
								<Input
									bind:value={translate.climaticName.value}
									bind:isValid={translate.climaticName.isValid}
									placeholder={'İklimlendirme'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Cephe
								</label>
								<Input
									bind:value={translate.facadeName.value}
									bind:isValid={translate.facadeName.isValid}
									placeholder={'Cephe'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Kullanım Durumu
								</label>
								<Input
									bind:value={translate.useStatusName.value}
									bind:isValid={translate.useStatusName.isValid}
									placeholder={'Kullanım Durumu'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									İskan Durumu
								</label>
								<Input
									bind:value={translate.iskanStatusName.value}
									bind:isValid={translate.iskanStatusName.isValid}
									placeholder={'İskan Durumu'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Tapu Durumu
								</label>
								<Input
									bind:value={translate.tapuStatusName.value}
									bind:isValid={translate.tapuStatusName.isValid}
									placeholder={'Tapu Durumu'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Banyo Sayısı
								</label>
								<Input
									bind:value={translate.bathNumberName.value}
									bind:isValid={translate.bathNumberName.isValid}
									placeholder={'Banyo Sayısı'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Banyo
								</label>
								<Input
									bind:value={translate.bathName.value}
									bind:isValid={translate.bathName.isValid}
									placeholder={'Banyo'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Yıl
								</label>
								<Input
									bind:value={translate.yearName.value}
									bind:isValid={translate.yearName.isValid}
									placeholder={'Yıl'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Havuz
								</label>
								<Input
									bind:value={translate.poolName.value}
									bind:isValid={translate.poolName.isValid}
									placeholder={'Havuz'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Otopark
								</label>
								<Input
									bind:value={translate.otoparkName.value}
									bind:isValid={translate.otoparkName.isValid}
									placeholder={'Otopark'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Net m2
								</label>
								<Input
									bind:value={translate.netM2Name.value}
									bind:isValid={translate.netM2Name.isValid}
									placeholder={'Net m2'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Brüt m2
								</label>
								<Input
									bind:value={translate.brutM2Name.value}
									bind:isValid={translate.brutM2Name.isValid}
									placeholder={'Brüt m2'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Filtre Başlığı
								</label>
								<Input
									bind:value={translate.filterHeader.value}
									bind:isValid={translate.filterHeader.isValid}
									placeholder={'Filtre Başlığı'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Detaylı Bilgi
								</label>
								<Input
									bind:value={translate.moreInfo.value}
									bind:isValid={translate.moreInfo.isValid}
									placeholder={'Detaylı Bilgi'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Link Kopyalandı
								</label>
								<Input
									bind:value={translate.linkCopied.value}
									bind:isValid={translate.linkCopied.isValid}
									placeholder={'Link Kopyalandı'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Açıklama
								</label>
								<Input
									bind:value={translate.description.value}
									bind:isValid={translate.description.isValid}
									placeholder={'Açıklama'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Genel Bilgiler
								</label>
								<Input
									bind:value={translate.generalInfo.value}
									bind:isValid={translate.generalInfo.isValid}
									placeholder={'Genel Bilgiler'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Depozito
								</label>
								<Input
									bind:value={translate.depositName.value}
									bind:isValid={translate.depositName.isValid}
									placeholder={'Depozito'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Kira Süresi
								</label>
								<Input
									bind:value={translate.rentTimeName.value}
									bind:isValid={translate.rentTimeName.isValid}
									placeholder={'Kira Süresi'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Kira Periyodu
								</label>
								<Input
									bind:value={translate.rentPeriodName.value}
									bind:isValid={translate.rentPeriodName.isValid}
									placeholder={'Kira Periyodu'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Aidat
								</label>
								<Input
									bind:value={translate.dueName.value}
									bind:isValid={translate.dueName.isValid}
									placeholder={'Aidat'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Tavan Yüksekliği
								</label>
								<Input
									bind:value={translate.heightName.value}
									bind:isValid={translate.heightName.isValid}
									placeholder={'Tavan Yüksekliği'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Spor İmkanı
								</label>
								<Input
									bind:value={translate.sportName.value}
									bind:isValid={translate.sportName.isValid}
									placeholder={'Spor İmkanı'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Kapıcı
								</label>
								<Input
									bind:value={translate.doormanName.value}
									bind:isValid={translate.doormanName.isValid}
									placeholder={'Kapıcı'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Yangın Merdiveni
								</label>
								<Input
									bind:value={translate.fireStairName.value}
									bind:isValid={translate.fireStairName.isValid}
									placeholder={'Yangın Merdiveni'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Mutfak
								</label>
								<Input
									bind:value={translate.kitchenName.value}
									bind:isValid={translate.kitchenName.isValid}
									placeholder={'Mutfak'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Güvenlik
								</label>
								<Input
									bind:value={translate.camName.value}
									bind:isValid={translate.camName.isValid}
									placeholder={'Güvenlik'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Jeneratör
								</label>
								<Input
									bind:value={translate.jeneratorName.value}
									bind:isValid={translate.jeneratorName.isValid}
									placeholder={'Jeneratör'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Adet
								</label>
								<Input
									bind:value={translate.piece.value}
									bind:isValid={translate.piece.isValid}
									placeholder={'Adet'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Galeri
								</label>
								<Input
									bind:value={translate.gallery.value}
									bind:isValid={translate.gallery.isValid}
									placeholder={'Galeri'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Profil
								</label>
								<Input
									bind:value={translate.profile.value}
									bind:isValid={translate.profile.isValid}
									placeholder={'Profil'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Özellikler
								</label>
								<Input
									bind:value={translate.featuresName.value}
									bind:isValid={translate.featuresName.isValid}
									placeholder={'Özellikler'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Video
								</label>
								<Input
									bind:value={translate.videoName.value}
									bind:isValid={translate.videoName.isValid}
									placeholder={'Video'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Sanal Tur
								</label>
								<Input
									bind:value={translate.virtualName.value}
									bind:isValid={translate.virtualName.isValid}
									placeholder={'Sanal Tur'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Kat
								</label>
								<Input
									bind:value={translate.floorName.value}
									bind:isValid={translate.floorName.isValid}
									placeholder={'Kat'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Harita
								</label>
								<Input
									bind:value={translate.map.value}
									bind:isValid={translate.map.isValid}
									placeholder={'Harita'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Portföy bulunamadı
								</label>
								<Input
									bind:value={translate.noProp.value}
									bind:isValid={translate.noProp.isValid}
									placeholder={'Portföy bulunamadı'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Satış Bedeli
								</label>
								<Input
									bind:value={translate.sellCost.value}
									bind:isValid={translate.sellCost.isValid}
									placeholder={'Satış Bedeli'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Kira Bedeli
								</label>
								<Input
									bind:value={translate.rentCost.value}
									bind:isValid={translate.rentCost.isValid}
									placeholder={'Kira Bedeli'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Ada
								</label>
								<Input
									bind:value={translate.adaName.value}
									bind:isValid={translate.adaName.isValid}
									placeholder={'Ada'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Parsel
								</label>
								<Input
									bind:value={translate.parselName.value}
									bind:isValid={translate.parselName.isValid}
									placeholder={'Parsel'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									İmar Durumu
								</label>
								<Input
									bind:value={translate.imarSatusName.value}
									bind:isValid={translate.imarSatusName.isValid}
									placeholder={'İmar Durumu'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Tapu Devir Durumu
								</label>
								<Input
									bind:value={translate.tapuTransferName.value}
									bind:isValid={translate.tapuTransferName.isValid}
									placeholder={'Tapu Devir Durumu'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Vatandaşlık
								</label>
								<Input
									bind:value={translate.citizenshipName.value}
									bind:isValid={translate.citizenshipName.isValid}
									placeholder={'Vatandaşlığa Uygun mu?'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Evet
								</label>
								<Input
									bind:value={translate.yesName.value}
									bind:isValid={translate.yesName.isValid}
									placeholder={'Evet'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Hayır
								</label>
								<Input
									bind:value={translate.noName.value}
									bind:isValid={translate.noName.isValid}
									placeholder={'Hayır'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Projeler
								</label>
								<Input
									bind:value={translate.projectName.value}
									bind:isValid={translate.projectName.isValid}
									placeholder={'Proje'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Proje Bilgileri
								</label>
								<Input
									bind:value={translate.projectInfoName.value}
									bind:isValid={translate.projectInfoName.isValid}
									placeholder={'Proje Bilgileri'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Teknik Bilgiler
								</label>
								<Input
									bind:value={translate.technicalName.value}
									bind:isValid={translate.technicalName.isValid}
									placeholder={'Teknik Bilgiler'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Drive Linki
								</label>
								<Input
									bind:value={translate.driveLinkName.value}
									bind:isValid={translate.driveLinkName.isValid}
									placeholder={'Drive Linki'}
									required={false}
								/>
							</div>
						</div>
					</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateTranslate()}
								disabled={!translate.lang.isValid}
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
