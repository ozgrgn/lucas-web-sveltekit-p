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

	const deletePropTypeApprove = (propTypeId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deletePropType(propTypeId);
					}
					modal.set(null);
				}
			})
		);
	};
	let processing = false;
	let editedPropType = {};
	let propType;
	export let data;
	let values = [
		{ key: 'name' },
		{ key: 'order', doNotEdit: true },
		{ key: 'isActive', doNotEdit: true },
		{ key: 'propCat', doNotEdit: true },
		{ key: 'propStatus', doNotEdit: true }
	];
	let propCat;
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
	let propStatus;
	let propStatuss;
	const getPropStatuss = async (propCat) => {
		let getPropStatussResponse = await RestService.getPropStatuss(undefined, undefined,propCat);
		if (getPropStatussResponse['status']) {
			console.log(getPropStatussResponse, 'getPropStatussResponse');
			propStatuss = getPropStatussResponse['propStatuss'];
			console.log(propStatus,"propStatuss")
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
	onMount(() => {
		getPropCats();
		
	});
	const updatePropType = async () => {
		processing = true;
		console.log(propType,"dsdfs")
		if (!propType?.propCat?.value || !propType?.propStatus?.value) {
			ToastService.error("Kategori ve Statüyü Boş Bırakırsanız Hiç Olmaz !");
return
		 }
		values.map((v) => {
			if (v.doNotEdit) {
				editedPropType[v.key] = propType[v.key].value;
			} else {
				editedPropType[v.key] = { tr: null, en: null };
				editedPropType[v.key]['tr'] = propType[v.key]['tr'].value;
				editedPropType[v.key]['en'] = propType[v.key]['en'].value;
				editedPropType[v.key]['ru'] = propType[v.key]['ru'].value;
			}
		});

		let response = await RestService.updatePropType(propType._id, editedPropType);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/propType');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
		processing = false;
	};

	const getPropType = async () => {
		let response = await RestService.getPropType(data.propTypeId);
		console.log(response);
		if (response['status']) {
			values.map((v) => {
				if (v.doNotEdit) {
					response['propType'][v.key] = {
						value: response['propType'][v.key]
					};
				} else {
					if (response['propType']) {
						response['propType'][v.key]['tr'] = {
							value: response['propType'][v.key]['tr']
						};
						response['propType'][v.key]['en'] = {
							value: response['propType'][v.key]['en']
						};
						response['propType'][v.key]['ru'] = {
							value: response['propType'][v.key]['ru']
						};
					}
				}
			});
			propType = {
				...response['propType']
			};
			if(propType.propCat.value) {
				getPropStatuss(propType.propCat.value)
			}
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getPropType();

	const deletePropType = async (propTypeId) => {
		if(propTypeId=="644acdf467133dd96468fa5a" || propTypeId=="644adb07532c013f3154e40b" || propTypeId=="644b13ab7f956d455805afbd" || propTypeId=="6451672e80630110791c0cd7") {
			ToastService.error("Bu Emlak Tipi sabit olarak tanımlandı.Maalesef silinemiyor. Ama ismini falan değiştirebilirsiniz sorun yok. Özgür");
			return
		}
		let response = await RestService.deletePropType(propTypeId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			goto('/panel/propType');
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
					goto('/panel/propType');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deletePropTypeApprove(data.propTypeId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Emlak Tipi Güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if propType}
					<div class="flex flex-wrap my-4">
						<div class="w-full flex lg:w-12/12 self-center">
							<div class="relative w-full mb-3 lg:w-4/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Emlak Kategorisi
								</label>
								{#if propCats}
								<Select
								  bind:value={propType.propCat.value}
								  change={() => getPropStatuss(propType.propCat.value)}
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
									Emlak Statüsü
								</label>
								{#if propStatuss}
								<Select
								  bind:value={propType.propStatus.value}
								  values={propStatuss}
								  title={"Statü seç"}
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
									bind:value={propType.order.value}
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
									bind:value={propType.name['tr'].value}
									bind:isValid={propType.name['tr'].isValid}
									placeholder={'İsim Türkçe'}
									required={true}
								/>
							</div>
						</div>
						<div class="w-full lg:w-4/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									İsim İngilizce
								</label>
								<Input
									bind:value={propType.name['en'].value}
									bind:isValid={propType.name['en'].isValid}
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
									bind:value={propType.name['ru'].value}
									bind:isValid={propType.name['ru'].isValid}
									placeholder={'İsim Rusça'}
									required={false}
								/>
							</div>
						</div>
					</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updatePropType()}
								disabled={!propType.name['tr'].isValid}
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
