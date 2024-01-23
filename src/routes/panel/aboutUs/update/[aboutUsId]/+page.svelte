<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';
	import TextEditor from '$src/lib/components/Form/TextEditor.svelte';

	const deleteAboutUsApprove = (aboutUsId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteAboutUs(aboutUsId);
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

	let aboutUs;

	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'text1', customValue: null },
		{ key: 'text2', customValue: null },
		{ key: 'staffText', customValue: null },
		{ key: 'metaTitle', customValue: null },
		{ key: 'metaDescription', customValue: null },
		{ key: 'image1', customValue: null },
		{ key: 'image2', customValue: null }
	];

	const updateAboutUs = async () => {
		let editedAboutUs = {};
		values.map((v) => {
			editedAboutUs[v.key] = aboutUs[v.key].value;
		});

		let response = await RestService.updateAboutUs(aboutUs._id, editedAboutUs);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/aboutUs');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getAboutUs = async () => {
		let response = await RestService.getAboutUs(data.aboutUsId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['aboutUs'][v.key] = {
						value: response['aboutUs'][v.key][v.customValue]
					};
				} else {
					response['aboutUs'][v.key] = { value: response['aboutUs'][v.key] };
				}
			});
			aboutUs = {
				...response['aboutUs']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getAboutUs();

	const deleteAboutUs = async (aboutUsId) => {
		let response = await RestService.deleteAboutUs(aboutUsId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/aboutUs');
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
					goto('/panel/aboutUs');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteAboutUsApprove(data.aboutUsId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Hakkımızda Sayfasını Güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if aboutUs}
					<div class="flex flex-wrap my-4">
						<div class="w-full lg:w-2/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Dil
								</label>
								{#if langs}
									<Select
										bind:value={aboutUs.lang.value}
										bind:isValid={aboutUs.lang.isValid}
										values={langs}
										title={'Dil Seçin'}
										valuesKey={'lang'}
										valuesTitleKey={'name'}
										customClass={'w-full h-9'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full lg:w-12/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Text 1 (Resimlerin Üstü)
								</label>
								<TextEditor
									placeholder={'Üst Text'}
									bind:value={aboutUs.text1.value}
									bind:incomingValue={aboutUs.text1.value}
								/>
							</div>
						</div>
						<div class="w-full lg:w-12/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Text 1 (Resimlerin Altı)
								</label>
								<TextEditor
									bind:value={aboutUs.text2.value}
									bind:incomingValue={aboutUs.text2.value}
									placeholder={'Alt Text'}
								/>
							</div>
						</div>

						
						<div class="w-full lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Meta Başlığı Max 50 ({aboutUs?.metaTitle?.value?.length
										? aboutUs?.metaTitle?.value?.length
										: 0})
								</label>
								<Input
									bind:value={aboutUs.metaTitle.value}
									bind:isValid={aboutUs.metaTitle.isValid}
									placeholder={'Hakkımızda sayfası Meta Başlığı 50 Karakter'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-8/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Meta Açıklası Max 150 ({aboutUs?.metaDescription?.value?.length
										? aboutUs?.metaDescription?.value?.length
										: 0})
								</label>
								<Input
									bind:value={aboutUs.metaDescription.value}
									bind:isValid={aboutUs.metaDescription.isValid}
									placeholder={'Hakkımızda Sayfası Meta Açıklaması 150 Karakter'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-6/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Hakkımızda Resim  (560x500)
								</label>
								<Image bind:value={aboutUs.image1.value} bind:isValid={aboutUs.image1.isValid} />
							</div>
						</div>
						
					</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateAboutUs()}
								disabled={!aboutUs.lang.isValid}
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
