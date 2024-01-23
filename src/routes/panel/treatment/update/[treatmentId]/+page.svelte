<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';
	import TextEditor from '$src/lib/components/Form/TextEditor.svelte';

	const deleteTreatmentApprove = (treatmentId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteTreatment(treatmentId);
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

	let treatmentGroups;
	const getTreatmentGroups = async () => {
		let response = await RestService.getTreatmentGroups(undefined, undefined);
		treatmentGroups = response['treatmentGroups'];
	};
	getTreatmentGroups();

	export let data;

	let treatment;

	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'treatmentGroup', customValue: null },
		{ key: 'name', customValue: null },
		{ key: 'name_BIG', customValue: null },
		{ key: 'text', customValue: null },
		{ key: 'treatmentThumbImage', customValue: null },
		{ key: 'treatmentImage', customValue: null },
		{ key: 'metaTitle', customValue: null },
		{ key: 'metaDescription', customValue: null },
		{ key: 'order', customValue: null },
		{ key: 'perma', customValue: null },
		{ key: 'treatmentShortDesc', customValue: null }
	];

	const updateTreatment = async () => {
		let editedTreatment = {};
		values.map((v) => {
			editedTreatment[v.key] = treatment[v.key].value;
			console.log(editedTreatment[v.key]);
		});

		let response = await RestService.updateTreatment(treatment._id, editedTreatment);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/treatment');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getTreatment = async () => {
		let response = await RestService.getTreatment(data.treatmentId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['treatment'][v.key] = {
						value: response['treatment'][v.key][v.customValue]
					};
				} else {
					response['treatment'][v.key] = { value: response['treatment'][v.key] };
				}
			});
			treatment = {
				...response['treatment']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getTreatment();

	const deleteTreatment = async (treatmentId) => {
		let response = await RestService.deleteTreatment(treatmentId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/treatment');
		} else {
			ToastService.success('İşlem başarılı');
		}
	};

	// values.map((v) => {
	// 	if (v.defaultValue) {
	// 		treatment[v.key] = { value: v.defaultValue };
	// 	} else {
	// 		treatment[v.key] = {};
	// 	}
	// });
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<div class="flex justify-between">
			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => {
					goto('/panel/treatment');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteTreatmentApprove(data.treatmentId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Tedavi güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if treatment}
					<div class="flex flex-wrap my-4">
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Dil
								</label>
								{#if langs}
									<Select
										bind:value={treatment.lang.value}
										bind:isValid={treatment.lang.isValid}
										values={langs}
										title={'Dil Seçin'}
										valuesKey={'lang'}
										valuesTitleKey={'name'}
										customClass={'w-full'}
									/>
								{/if}
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Tedavi Kategorisi
								</label>
								{#if treatmentGroups}
									<Select
										bind:value={treatment.treatmentGroup.value}
										bind:isValid={treatment.treatmentGroup.isValid}
										values={treatmentGroups}
										title={'Kategori Seçin'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										customClass={'w-full'}
									/>
								{/if}
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Sıra
								</label>
								<Input
									bind:value={treatment.order.value}
									bind:isValid={treatment.order.isValid}
									placeholder={'Sıra'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									İsim
								</label>
								<Input
									bind:value={treatment.name.value}
									bind:isValid={treatment.name.isValid}
									placeholder={'Tedavi İsmi'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Tedavi İsmi (Büyük Harf)
								</label>
								<Input
									bind:value={treatment.name_BIG.value}
									bind:isValid={treatment.name_BIG.isValid}
									placeholder={'TEDAVİ İSMİ'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Perma (link)
								</label>
								<Input
									bind:value={treatment.perma.value}
									bind:isValid={treatment.perma.isValid}
									placeholder={'face-lifting'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-10/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Kısa Açıklama Max 250 ({treatment?.treatmentShortDesc?.value?.length
										? treatment?.treatmentShortDesc?.value?.length
										: 0})
								</label>
								<Input
									bind:value={treatment.treatmentShortDesc.value}
									bind:isValid={treatment.treatmentShortDesc.isValid}
									placeholder={'Kısa Açıklama '}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Meta Başlığı Max 50 ({treatment?.metaTitle?.value?.length
										? treatment?.metaTitle?.value?.length
										: 0})
								</label>
								<Input
									bind:value={treatment.metaTitle.value}
									bind:isValid={treatment.metaTitle.isValid}
									placeholder={'Tedavi Sayfası Meta Başlığı 50 Karakter'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-8/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Meta Açıklası Max 150 ({treatment?.metaDescription?.value?.length
										? treatment?.metaDescription?.value?.length
										: 0})
								</label>
								<Input
									bind:value={treatment.metaDescription.value}
									bind:isValid={treatment.metaDescription.isValid}
									placeholder={'Tedavi Sayfası Meta Açıklaması 150 Karakter'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-12/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Tedavi Metni
								</label>
								<TextEditor
									bind:value={treatment.text.value}
									bind:incomingValue={treatment.text.value}
									placeholder={'Tedavi Metni'}
									required={false}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Tedavi Thumb Resim (800x800)
								</label>
								<Image
									bind:value={treatment.treatmentThumbImage.value}
									bind:isValid={treatment.treatmentThumbImage.isValid}
								/>
							</div>
						</div>
						<div class="w-full lg:w-3/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
									Tedavi Büyük Resim (1024x683)
								</label>
								<Image
									bind:value={treatment.treatmentImage.value}
									bind:isValid={treatment.treatmentImage.isValid}
								/>
							</div>
						</div>
					</div>
					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateTreatment()}
								disabled={!treatment.lang.isValid}
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
