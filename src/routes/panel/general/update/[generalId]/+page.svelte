<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';
	import TextEditor from '$src/lib/components/Form/TextEditor.svelte';

	const deleteGeneralApprove = (generalId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteGeneral(generalId);
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

	let general;

	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'bannerTitle', customValue: null },
		{ key: 'slogan1', customValue: null },
		{ key: 'slogan2', customValue: null },

		{ key: 'phone1', customValue: null },
		{ key: 'phone2', customValue: null },
		{ key: 'whatsapp1', customValue: null },
		{ key: 'whatsapp2', customValue: null },

		{ key: 'address1', customValue: null },
		{ key: 'address2', customValue: null },
		{ key: 'email1', customValue: null },
		{ key: 'email2', customValue: null },

		{ key: 'facebook', customValue: null },
		{ key: 'instagram', customValue: null },
		{ key: 'youtube', customValue: null },

		{ key: 'companyShortDesc', customValue: null },
		{ key: 'copright', customValue: null },
		{ key: 'maplink', customValue: null },
		{ key: 'slider', customValue: null },
		{ key: 'googleRate', customValue: null },
		{ key: 'trustPilotRate', customValue: null },
		{ key: 'facebookRate', customValue: null },

		{ key: 'faqHeader', customValue: null },
		{ key: 'faqSpot', customValue: null },

		{ key: 'formSpot', customValue: null },
		{ key: 'formHeader', customValue: null },
		{ key: 'generalMetaTitle', customValue: null },
		{ key: 'generalMetaDescription', customValue: null },
		{ key: 'footer1', customValue: null },
		{ key: 'footer1Perma', customValue: null },
		{ key: 'footer2', customValue: null },
		{ key: 'footer2Perma', customValue: null },
		{ key: 'footer3', customValue: null },
		{ key: 'footer3Perma', customValue: null },
		{ key: 'footer4', customValue: null },
		{ key: 'footer4Perma', customValue: null },
		{ key: 'cookies', customValue: null },
		{ key: 'blogContactLink', customValue: null },
	];

	const updateGeneral = async () => {
		let editedGeneral = {};
		values.map((v) => {
			editedGeneral[v.key] = general[v.key].value;
		});

		let response = await RestService.updateGeneral(general._id, editedGeneral);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/general');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getGeneral = async () => {
		let response = await RestService.getGeneral(data.generalId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['general'][v.key] = {
						value: response['general'][v.key][v.customValue]
					};
				} else {
					response['general'][v.key] = { value: response['general'][v.key] };
				}
			});
			general = {
				...response['general']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getGeneral();

	const deleteGeneral = async (generalId) => {
		let response = await RestService.deleteGeneral(generalId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/general');
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
					goto('/panel/general');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteGeneralApprove(data.generalId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Genel Bilgileri güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if general}
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							{#if langs}
								<Select
									bind:value={general.lang.value}
									bind:isValid={general.lang.isValid}
									values={langs}
									title={'Dil Seçin'}
									valuesKey={'lang'}
									valuesTitleKey={'name'}
									customClass={'w-full h-9'}
								/>
							{/if}
						</div>
					</div>
					<div class="flex w-full">
						<div class="w-full lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Header Buton
								</label>
								<Input
									bind:value={general.bannerTitle.value}
									bind:isValid={general.bannerTitle.isValid}
									placeholder={'Banner Title (Büyük Harf)'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Slogan 1
								</label>
								<Input
									bind:value={general.slogan1.value}
									bind:isValid={general.slogan1.isValid}
									placeholder={'Slogan 1'}
									required={false}
								/>
							</div>
						</div>

						<div class="w-full lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Slogan 2
								</label>
								<Input
									bind:value={general.slogan2.value}
									bind:isValid={general.slogan2.isValid}
									placeholder={'Slogan 2'}
									required={false}
								/>
							</div>
						</div>
					</div>

					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Telefon 1
							</label>
							<Input
								bind:value={general.phone1.value}
								bind:isValid={general.phone1.isValid}
								placeholder={'Telefon 1'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Telefon 2
							</label>
							<Input
								bind:value={general.phone2.value}
								bind:isValid={general.phone2.isValid}
								placeholder={'Telefon 2'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Whatsapp
							</label>
							<Input
								bind:value={general.whatsapp1.value}
								bind:isValid={general.whatsapp1.isValid}
								placeholder={'Whatsapp'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								E-mail
							</label>
							<Input
								bind:value={general.email1.value}
								bind:isValid={general.email1.isValid}
								placeholder={'E-mail'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Adres 1
							</label>
							<Input
								bind:value={general.address1.value}
								bind:isValid={general.address1.isValid}
								placeholder={'Adres 1'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Adres 2
							</label>
							<Input
								bind:value={general.address2.value}
								bind:isValid={general.address2.isValid}
								placeholder={'Adres 2'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Google Puanı
							</label>
							<Input
								bind:value={general.googleRate.value}
								bind:isValid={general.googleRate.isValid}
								placeholder={'5.0/5'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Facebook Linki
							</label>
							<Input
								bind:value={general.facebook.value}
								bind:isValid={general.facebook.isValid}
								placeholder={'Facebook'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Instagram Linki
							</label>
							<Input
								bind:value={general.instagram.value}
								bind:isValid={general.instagram.isValid}
								placeholder={'Instagram'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Youtube Linki
							</label>
							<Input
								bind:value={general.youtube.value}
								bind:isValid={general.youtube.isValid}
								placeholder={'Youtube'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link1
							</label>
							<Input
								bind:value={general.footer1.value}
								bind:isValid={general.footer1.isValid}
								placeholder="Footer Link 1"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link1 Perma
							</label>
							<Input
								bind:value={general.footer1Perma.value}
								bind:isValid={general.footer1Perma.isValid}
								placeholder="Footer Link 1 Perma"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link2
							</label>
							<Input
								bind:value={general.footer2.value}
								bind:isValid={general.footer2.isValid}
								placeholder="Footer Link 2"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link2 Perma
							</label>
							<Input
								bind:value={general.footer2Perma.value}
								bind:isValid={general.footer2Perma.isValid}
								placeholder="Footer Link 2 Perma"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link3
							</label>
							<Input
								bind:value={general.footer3.value}
								bind:isValid={general.footer3.isValid}
								placeholder="Footer Link 3"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link3 Perma
							</label>
							<Input
								bind:value={general.footer3Perma.value}
								bind:isValid={general.footer3Perma.isValid}
								placeholder="Footer Link 3 Perma"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link4
							</label>
							<Input
								bind:value={general.footer4.value}
								bind:isValid={general.footer4.isValid}
								placeholder="Footer Link 4"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Footer Link4 Perma
							</label>
							<Input
								bind:value={general.footer4Perma.value}
								bind:isValid={general.footer4Perma.isValid}
								placeholder="Footer Link 4 Perma"
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Şirket Kısa Açıklaması Max 200 ({general?.companyShortDesc?.value?.length
									? general?.companyShortDesc?.value?.length
									: 0})
							</label>
							<Input
								bind:value={general.companyShortDesc.value}
								bind:isValid={general.companyShortDesc.isValid}
								placeholder={'Şirket Kısa Açıklaması 150 Karakter'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Copright Yazısı
							</label>
							<Input
								bind:value={general.copright.value}
								bind:isValid={general.copright.isValid}
								placeholder={'Copright Yazısı'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Harita Linki
							</label>
							<Input
								bind:value={general.maplink.value}
								bind:isValid={general.maplink.isValid}
								placeholder={'Harita Linki Giriniz (Orta)'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Slider Resmi (1440x900)
							</label>
							<Image
								bind:value={general.slider.value}
								bind:isValid={general.slider.isValid}
								placeholder={'Slider Resmi'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-12/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Cookies Policy
							</label>
							<TextEditor
								bind:value={general.cookies.value}
								bind:incomingValue={general.cookies.value}
								placeholder="Cookies Policy"
								required={false}
							/>
						</div>
					</div>
				</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateGeneral()}
								disabled={!general.lang.isValid}
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
