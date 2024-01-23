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
	import Switch from '$src/lib/components/Form/Switch.svelte';

	const deletePropStatusApprove = (propStatusId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deletePropStatus(propStatusId);
					}
					modal.set(null);
				}
			})
		);
	};
	export let data
	let processing = false;
	let groups = [{ name: 'SATILIK' }, { name: 'KİRALIK' }];
	let editedPropStatus = {};
	let propStatus;
	let values = [
		{ key: 'name' },
		{ key: 'order', doNotEdit: true },
		{ key: 'group', doNotEdit: true },
		{ key: 'devir', doNotEdit: true },
		{ key: 'isActive', doNotEdit: true },
		{ key: 'propCat', doNotEdit: true },
	];
	let propCats;
	const getPropCats = async () => {
		let getPropCatsResponse = await RestService.getPropCats(undefined, undefined);
		if (getPropCatsResponse['status']) {
			console.log(getPropCatsResponse, 'getPropCatsResponse');
			propCats = getPropCatsResponse['propCats'];
			console.log(propCats,"propCats")
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
	onMount(() => {
		getPropCats();
	});
	const updatePropStatus = async () => {
		processing = true;
		values.map((v) => {
			if (v.doNotEdit) {
				editedPropStatus[v.key] = propStatus[v.key].value;
			} else {
				editedPropStatus[v.key] = { tr: null, en: null };
				editedPropStatus[v.key]['tr'] = propStatus[v.key]['tr'].value;
				editedPropStatus[v.key]['en'] = propStatus[v.key]['en'].value;
				editedPropStatus[v.key]['ru'] = propStatus[v.key]['ru'].value;
			}
		});

		let response = await RestService.updatePropStatus(propStatus._id, editedPropStatus);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/propStatus');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
		processing = false;
	};

	const getPropStatus = async () => {
		let response = await RestService.getPropStatus(data.propStatusId);
		console.log(response);
		if (response['status']) {
		
			values.map((v) => {
				if (v.doNotEdit) {
					response['propStatus'][v.key] = {
						value: response['propStatus'][v.key]
					};
				} else {
					if (response['propStatus']) {
						if(!response['propStatus'][v.key]){
							response['propStatus'][v.key]={}
						}
						response['propStatus'][v.key]['tr'] = {
							value: response['propStatus'][v.key]['tr']
						};
						response['propStatus'][v.key]['en'] = {
							value: response['propStatus'][v.key]['en']
						};
						response['propStatus'][v.key]['ru'] = {
							value: response['propStatus'][v.key]['ru']
						};
					}
				}
			});
			propStatus = {
				...response['propStatus']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getPropStatus();

	const deletePropStatus = async (propStatusId) => {
		if(propStatusId=="644ad675532c013f3154e376" || propStatusId=="644ad816532c013f3154e3b1" || propStatusId=="644adaed532c013f3154e3f9"||propStatusId=="645379555a1b413da119d942" ||propStatusId=="6453797a5a1b413da119d94b"||propStatusId=="6453798d5a1b413da119d954"||propStatusId=="645379a35a1b413da119d95d"||propStatusId=="645379c25a1b413da119d966") {
			ToastService.error("Bu emlak durumu sabit olarak tanımlandı.Maalesef silinemiyor. Ama ismini falan değiştirebilirsiniz sorun yok. Özgür");
			return
		}
		let response = await RestService.deletePropStatus(propStatusId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			goto('/panel/propStatus');
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
					goto('/panel/propStatus');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deletePropStatusApprove(data.propStatusId)}
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
				{#if propStatus}
					<div class="flex flex-wrap my-4">
						<div class="w-full flex lg:w-12/12 self-center">
							<div class="relative w-full mb-3 lg:w-4/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Emlak Kategorisi
								</label>
								{#if propCats}
								<Select
								  bind:value={propStatus.propCat.value}
								  values={propCats}
								  title={"Kategori seç"}
								  valuesKey={"_id"}
								  valuesTitleKey={"name"}
								  valuesTitleKeySub={"tr"}
								  customClass={"w-full border-0 h-9 text-md"}
								/>
							  {/if}
							</div>
							<div class="relative w-full mb-3 lg:w-4/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									SATILIK/KİRALIK
								</label>
								{#if groups}
									<Select
										bind:value={propStatus.group.value}
										values={groups}
										title={'SATILIK/KİRALIK'}
										valuesKey={'name'}
										valuesTitleKey={'name'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
							
							<div class="relative w-full mb-3 lg:w-4/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Devir mi?
								</label>
								<Switch bind:value={propStatus.devir.value} />
							</div>
							<div class="relative w-full mb-3 lg:w-2/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Sıra
								</label>
								<NumberInput
									bind:value={propStatus.order.value}
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
									bind:value={propStatus.name['tr'].value}
									bind:isValid={propStatus.name['tr'].isValid}
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
									bind:value={propStatus.name['en'].value}
									bind:isValid={propStatus.name['en'].isValid}
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
									bind:value={propStatus.name['ru'].value}
									bind:isValid={propStatus.name['ru'].isValid}
									placeholder={'İsim Rusça'}
									required={false}
								/>
							</div>
						</div>
					</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updatePropStatus()}
								disabled={!propStatus.name['tr'].isValid}
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
