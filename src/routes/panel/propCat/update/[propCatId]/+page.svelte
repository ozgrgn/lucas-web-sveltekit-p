<script>
	import { bind } from 'svelte-simple-modal';
	import { modal } from '$services/store';
	import { goto } from '$app/navigation';
	import Alert from '$components/Panel/Alert.svelte';
	import RestService from '$services/rest';
	import Input from '$components/Form/Input.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Switch from '$components/Form/Switch.svelte';
	import NumberInput from '$src/lib/components/Form/NumberInput.svelte';

	const deletePropCatApprove = (propCatId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deletePropCat(propCatId);
					}
					modal.set(null);
				}
			})
		);
	};
	let processing = false;
	export let data;
	let propCat;
	let editedPropCat = {};

	let values = [
		{ key: 'name' },
		{ key: 'order', doNotEdit: true },
		{ key: 'isActive', doNotEdit: true }
	];

	const updatePropCat = async () => {
		processing = true;
		values.map((v) => {
			if (v.doNotEdit) {
				editedPropCat[v.key] = propCat[v.key].value;
			} else {
				editedPropCat[v.key] = { tr: null, en: null };
				editedPropCat[v.key]['tr'] = propCat[v.key]['tr'].value;
				editedPropCat[v.key]['en'] = propCat[v.key]['en'].value;
				editedPropCat[v.key]['ru'] = propCat[v.key]['ru'].value;
			}
		});

		let response = await RestService.updatePropCat(propCat._id, editedPropCat);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/propCat');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
		processing = false;
	};

	const getPropCat = async () => {
		let response = await RestService.getPropCat(data.propCatId);
		console.log(response);
		if (response['status']) {
			values.map((v) => {
				if (v.doNotEdit) {
					response['propCat'][v.key] = {
						value: response['propCat'][v.key]
					};
				} else {
					if (response['propCat']) {
						response['propCat'][v.key]['tr'] = {
							value: response['propCat'][v.key]['tr']
						};
						response['propCat'][v.key]['en'] = {
							value: response['propCat'][v.key]['en']
						};
						response['propCat'][v.key]['ru'] = {
							value: response['propCat'][v.key]['ru']
						};
					}
				}
			});
			propCat = {
				...response['propCat']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getPropCat();

	const deletePropCat = async (propCatId) => {
		if(propCatId=="644a5b5f67133dd96468f8ee" || propCatId=="644a5b7267133dd96468f8f5" || propCatId=="64515cc880630110791bfbc2" ) {
			ToastService.error("Bu kategori sabit olarak tanımlandı.Maalesef silinemiyor. Ama ismini falan değiştirebilirsiniz sorun yok. Özgür");
			return
		}
		let response = await RestService.deletePropCat(propCatId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/propCat');
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
					goto('/panel/propCat');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deletePropCatApprove(data.propCatId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Emlak Kategorisi Güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if propCat}
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-12/12 self-center">
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Sıra
							</label>
							<NumberInput
								bind:value={propCat.order.value}
								placeholder={'Sıralama'}
								required={false}
								customClass="h-9"
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								İsim Türkçe
							</label>
							<Input
								bind:value={propCat.name['tr'].value}
								bind:isValid={propCat.name['tr'].isValid}
								placeholder={'İsim Türkçe'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								İsim İngilizce
							</label>
							<Input
								bind:value={propCat.name['en'].value}
								bind:isValid={propCat.name['en'].isValid}
								placeholder={'İsim İngilizce'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								İsim Rusça
							</label>
							<Input
								bind:value={propCat.name['ru'].value}
								bind:isValid={propCat.name['ru'].isValid}
								placeholder={'İsim Rusça'}
								required={false}
							/>
						</div>
					</div>
				</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updatePropCat()}
								disabled={!propCat.name['tr'].isValid}
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
