<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$components/Form/Input.svelte';
	import { onMount } from "svelte";
	import { modal } from '$services/store';
	import { bind } from 'svelte-simple-modal';
	import Alert from '$components/Panel/Alert.svelte';
	import { TranslateApiMessage } from '$services/language';
	import ToastService from '$services/toast';
	import NumberInput from '$src/lib/components/Form/NumberInput.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';

	const deleteStateApprove = (stateId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteState(stateId);
					}
					modal.set(null);
				}
			})
		);
	};
	export let data
	let processing = false;
	let editedState = {};
	let state;
	let values = [
		{ key: 'name' },
		{ key: 'order', doNotEdit: true },
		{ key: 'isActive', doNotEdit: true },
		{ key: 'city', doNotEdit: true },
	];
	let citys;
	const getCitys = async () => {
		let getCitysResponse = await RestService.getCitys(undefined, undefined);
		if (getCitysResponse['status']) {
			console.log(getCitysResponse, 'getCitysResponse');
			citys = getCitysResponse['citys'];
			console.log(citys,"citys")
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
	onMount(() => {
		getCitys();
	});
	const updateState = async () => {
		processing = true;
		values.map((v) => {
			if (v.doNotEdit) {
				editedState[v.key] = state[v.key].value;
			} else {
				editedState[v.key] = { tr: null, en: null };
				editedState[v.key]['tr'] = state[v.key]['tr'].value;
				editedState[v.key]['en'] = state[v.key]['en'].value;
				editedState[v.key]['ru'] = state[v.key]['ru'].value;
			}
		});

		let response = await RestService.updateState(state._id, editedState);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/state');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
		processing = false;
	};

	const getState = async () => {
		let response = await RestService.getState(data.stateId);
		console.log(response);
		if (response['status']) {
		
			values.map((v) => {
				if (v.doNotEdit) {
					response['state'][v.key] = {
						value: response['state'][v.key]
					};
				} else {
					if (response['state']) {
						if(!response['state'][v.key]){
							response['state'][v.key]={}
						}
						response['state'][v.key]['tr'] = {
							value: response['state'][v.key]['tr']
						};
						response['state'][v.key]['en'] = {
							value: response['state'][v.key]['en']
						};
						response['state'][v.key]['ru'] = {
							value: response['state'][v.key]['ru']
						};
					}
				}
			});
			state = {
				...response['state']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getState();

	const deleteState = async (stateId) => {
		let response = await RestService.deleteState(stateId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			goto('/panel/state');
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
					goto('/panel/state');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteStateApprove(data.stateId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Emlak Statüsü Güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if state}
					<div class="flex flex-wrap my-4">
						<div class="w-full flex lg:w-12/12 self-center">
							<div class="relative w-full mb-3 lg:w-4/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Emlak Kategorisi
								</label>
								{#if citys}
								<Select
								  bind:value={state.city.value}
								  values={citys}
								  title={"Kategori seç"}
								  valuesKey={"_id"}
								  valuesTitleKey={"name"}
								  valuesTitleKeySub={"tr"}
								  customClass={"w-full border-0 h-9 text-md"}
								/>
							  {/if}
							</div>
							<div class="relative w-full mb-3 lg:w-2/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Sıra
								</label>
								<NumberInput
									bind:value={state.order.value}
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
									bind:value={state.name['tr'].value}
									bind:isValid={state.name['tr'].isValid}
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
									bind:value={state.name['en'].value}
									bind:isValid={state.name['en'].isValid}
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
									bind:value={state.name['ru'].value}
									bind:isValid={state.name['ru'].isValid}
									placeholder={'İsim Rusça'}
									required={false}
								/>
							</div>
						</div>
					</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateState()}
								disabled={!state.name['tr'].isValid}
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
