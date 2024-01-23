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

	const deleteUseStatusApprove = (useStatusId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteUseStatus(useStatusId);
					}
					modal.set(null);
				}
			})
		);
	};
	let processing = false;
	export let data;
	let useStatus;
	let editedUseStatus = {};

	let values = [
		{ key: 'name' },
		{ key: 'order', doNotEdit: true },
		{ key: 'isActive', doNotEdit: true }
	];

	const updateUseStatus = async () => {
		processing = true;
		values.map((v) => {
			if (v.doNotEdit) {
				editedUseStatus[v.key] = useStatus[v.key].value;
			} else {
				editedUseStatus[v.key] = { tr: null, en: null };
				editedUseStatus[v.key]['tr'] = useStatus[v.key]['tr'].value;
				editedUseStatus[v.key]['en'] = useStatus[v.key]['en'].value;
				editedUseStatus[v.key]['ru'] = useStatus[v.key]['ru'].value;
			}
		});

		let response = await RestService.updateUseStatus(useStatus._id, editedUseStatus);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/useStatus');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
		processing = false;
	};

	const getUseStatus = async () => {
		let response = await RestService.getUseStatus(data.useStatusId);
		console.log(response);
		if (response['status']) {
			values.map((v) => {
				if (v.doNotEdit) {
					response['useStatus'][v.key] = {
						value: response['useStatus'][v.key]
					};
				} else {
					if (response['useStatus']) {
						if (!response['useStatus'][v.key]) {
							response['useStatus'][v.key] = {};
						}
						response['useStatus'][v.key]['tr'] = {
							value: response['useStatus'][v.key]['tr']
						};
						response['useStatus'][v.key]['en'] = {
							value: response['useStatus'][v.key]['en']
						};
						response['useStatus'][v.key]['ru'] = {
							value: response['useStatus'][v.key]['ru']
						};
					}
				}
			});
			useStatus = {
				...response['useStatus']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getUseStatus();

	const deleteUseStatus = async (useStatusId) => {
		let response = await RestService.deleteUseStatus(useStatusId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			goto('/panel/useStatus');
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
					goto('/panel/useStatus');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteUseStatusApprove(data.useStatusId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">İskan Durumu Güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if useStatus}
					<div class="flex flex-wrap my-4">
						<div class="w-full lg:w-12/12 self-center">
							<div class="relative w-full mb-3 lg:w-2/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Sıra
								</label>
								<NumberInput
									bind:value={useStatus.order.value}
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
									bind:value={useStatus.name['tr'].value}
									bind:isValid={useStatus.name['tr'].isValid}
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
									bind:value={useStatus.name['en'].value}
									bind:isValid={useStatus.name['en'].isValid}
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
									bind:value={useStatus.name['ru'].value}
									bind:isValid={useStatus.name['ru'].isValid}
									placeholder={'İsim Rusça'}
									required={false}
								/>
							</div>
						</div>
					</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateUseStatus()}
								disabled={!useStatus.name['tr'].isValid}
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
