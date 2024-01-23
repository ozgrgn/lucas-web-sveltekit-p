<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$components/Form/Input.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import NumberInput from '$src/lib/components/Form/NumberInput.svelte';

	const deleteKitchenApprove = (kitchenId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteKitchen(kitchenId);
					}
					modal.set(null);
				}
			})
		);
	};
	let processing = false;
	export let data
	let kitchen;
	let editedKitchen = {};

	let values = [
		{ key: 'name' },
		{ key: 'order', doNotEdit: true },
		{ key: 'isActive', doNotEdit: true }
	];

	const updateKitchen = async () => {
		processing = true;
		values.map((v) => {
			if (v.doNotEdit) {
				editedKitchen[v.key] = kitchen[v.key].value;
			} else {
				editedKitchen[v.key] = { tr: null, en: null };
				editedKitchen[v.key]['tr'] = kitchen[v.key]['tr'].value;
				editedKitchen[v.key]['en'] = kitchen[v.key]['en'].value;
				editedKitchen[v.key]['ru'] = kitchen[v.key]['ru'].value;
			}
		});

		let response = await RestService.updateKitchen(kitchen._id, editedKitchen);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/kitchen');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
		processing = false;
	};

	const getKitchen = async () => {
		let response = await RestService.getKitchen(data.kitchenId);
		console.log(response);
		if (response['status']) {
			values.map((v) => {
				if (v.doNotEdit) {
				
					response['kitchen'][v.key] = {
						value: response['kitchen'][v.key]
					};
				} else {
					if (response['kitchen']) {
						if (!response['kitchen'][v.key]) {
							response['kitchen'][v.key] = {};
						}
						response['kitchen'][v.key]['tr'] = {
							value: response['kitchen'][v.key]['tr']
						};
						response['kitchen'][v.key]['en'] = {
							value: response['kitchen'][v.key]['en']
						};
						response['kitchen'][v.key]['ru'] = {
							value: response['kitchen'][v.key]['ru']
						};
					}
				}
			});
			kitchen = {
				...response['kitchen']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getKitchen();

	const deleteKitchen = async (kitchenId) => {
		let response = await RestService.deleteKitchen(kitchenId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/kitchen');
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
					goto('/panel/kitchen');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteKitchenApprove(data.kitchenId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Spor İmkanı Güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if kitchen}
					<div class="flex flex-wrap my-4">
						<div class="w-full lg:w-12/12 self-center">
							<div class="relative w-full mb-3 lg:w-2/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Sıra
								</label>
								<NumberInput
									bind:value={kitchen.order.value}
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
									bind:value={kitchen.name['tr'].value}
									bind:isValid={kitchen.name['tr'].isValid}
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
									bind:value={kitchen.name['en'].value}
									bind:isValid={kitchen.name['en'].isValid}
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
									bind:value={kitchen.name['ru'].value}
									bind:isValid={kitchen.name['ru'].isValid}
									placeholder={'İsim Rusça'}
									required={false}
								/>
							</div>
						</div>
					</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateKitchen()}
								disabled={!kitchen.name['tr'].isValid}
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
