<script>
	import { bind } from 'svelte-simple-modal';
	import { modal } from '$services/store';
	import { goto } from '$app/navigation';
	import Alert from '$components/Panel/Alert.svelte';
	import RestService from '$services/rest';
	import Input from '$components/Form/Input.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import NumberInput from '$src/lib/components/Form/NumberInput.svelte';

	const deleteTapuTransferApprove = (tapuTransferId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteTapuTransfer(tapuTransferId);
					}
					modal.set(null);
				}
			})
		);
	};
	let processing = false;
	export let data
	let tapuTransfer;
	let editedTapuTransfer = {};

	let values = [
		{ key: 'name' },
		{ key: 'order', doNotEdit: true },
		{ key: 'isActive', doNotEdit: true }
	];

	const updateTapuTransfer = async () => {
		processing = true;
		values.map((v) => {
			if (v.doNotEdit) {
				editedTapuTransfer[v.key] = tapuTransfer[v.key].value;
			} else {
				editedTapuTransfer[v.key] = { tr: null, en: null };
				editedTapuTransfer[v.key]['tr'] = tapuTransfer[v.key]['tr'].value;
				editedTapuTransfer[v.key]['en'] = tapuTransfer[v.key]['en'].value;
				editedTapuTransfer[v.key]['ru'] = tapuTransfer[v.key]['ru'].value;
			}
		});

		let response = await RestService.updateTapuTransfer(tapuTransfer._id, editedTapuTransfer);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/tapuTransfer');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
		processing = false;
	};

	const getTapuTransfer = async () => {
		let response = await RestService.getTapuTransfer(data.tapuTransferId);
		console.log(response);
		if (response['status']) {
			values.map((v) => {
				if (v.doNotEdit) {
				
					response['tapuTransfer'][v.key] = {
						value: response['tapuTransfer'][v.key]
					};
				} else {
					if (response['tapuTransfer']) {
						if (!response['tapuTransfer'][v.key]) {
							response['tapuTransfer'][v.key] = {};
						}
						response['tapuTransfer'][v.key]['tr'] = {
							value: response['tapuTransfer'][v.key]['tr']
						};
						response['tapuTransfer'][v.key]['en'] = {
							value: response['tapuTransfer'][v.key]['en']
						};
						response['tapuTransfer'][v.key]['ru'] = {
							value: response['tapuTransfer'][v.key]['ru']
						};
					}
				}
			});
			tapuTransfer = {
				...response['tapuTransfer']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getTapuTransfer();

	const deleteTapuTransfer = async (tapuTransferId) => {
		let response = await RestService.deleteTapuTransfer(tapuTransferId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			goto('/panel/tapuTransfer');
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
					goto('/panel/tapuTransfer');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteTapuTransferApprove(data.tapuTransferId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Tapu Durumu Güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if tapuTransfer}
					<div class="flex flex-wrap my-4">
						<div class="w-full lg:w-12/12 self-center">
							<div class="relative w-full mb-3 lg:w-2/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Sıra
								</label>
								<NumberInput
									bind:value={tapuTransfer.order.value}
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
									bind:value={tapuTransfer.name['tr'].value}
									bind:isValid={tapuTransfer.name['tr'].isValid}
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
									bind:value={tapuTransfer.name['en'].value}
									bind:isValid={tapuTransfer.name['en'].isValid}
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
									bind:value={tapuTransfer.name['ru'].value}
									bind:isValid={tapuTransfer.name['ru'].isValid}
									placeholder={'İsim Rusça'}
									required={false}
								/>
							</div>
						</div>
					</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateTapuTransfer()}
								disabled={!tapuTransfer.name['tr'].isValid}
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
