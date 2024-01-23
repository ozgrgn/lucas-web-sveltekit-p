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

	const deleteDistrictApprove = (districtId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteDistrict(districtId);
					}
					modal.set(null);
				}
			})
		);
	};
	let processing = false;
	let editedDistrict = {};
	let district;
	export let data
	let values = [
		{ key: 'name' },
		{ key: 'order', doNotEdit: true },
		{ key: 'isActive', doNotEdit: true },
		{ key: 'city', doNotEdit: true },
		{ key: 'state', doNotEdit: true }
	];
	let city;
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
	let state;
	let states;
	const getStates = async (city) => {
		let getStatesResponse = await RestService.getStates(undefined, undefined,city);
		if (getStatesResponse['status']) {
			console.log(getStatesResponse, 'getStatesResponse');
			states = getStatesResponse['states'];
			console.log(state,"states")
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
	onMount(() => {
		getCitys();
		
	});
	const updateDistrict = async () => {
		processing = true;
		console.log(district,"dsdfs")
		if (!district?.city?.value || !district?.state?.value) {
			ToastService.error("Şehir ve Bölgeyi Boş Bırakırsanız Hiç Olmaz !");
return
		 }
		values.map((v) => {
			if (v.doNotEdit) {
				editedDistrict[v.key] = district[v.key].value;
			} else {
				editedDistrict[v.key] = { tr: null, en: null };
				editedDistrict[v.key]['tr'] = district[v.key]['tr'].value;
				editedDistrict[v.key]['en'] = district[v.key]['en'].value;
				editedDistrict[v.key]['ru'] = district[v.key]['ru'].value;
			}
		});

		let response = await RestService.updateDistrict(district._id, editedDistrict);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/district');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
		processing = false;
	};

	const getDistrict = async () => {
		let response = await RestService.getDistrict(data.districtId);
		console.log(response);
		if (response['status']) {
			values.map((v) => {
				if (v.doNotEdit) {
					response['district'][v.key] = {
						value: response['district'][v.key]
					};
				} else {
					if (response['district']) {
						response['district'][v.key]['tr'] = {
							value: response['district'][v.key]['tr']
						};
						response['district'][v.key]['en'] = {
							value: response['district'][v.key]['en']
						};
						response['district'][v.key]['ru'] = {
							value: response['district'][v.key]['ru']
						};
					}
				}
			});
			district = {
				...response['district']
			};
			if(district.city.value) {
				getStates(district.city.value)
			}
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getDistrict();

	const deleteDistrict = async (districtId) => {
		let response = await RestService.deleteDistrict(districtId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			goto('/panel/district');
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
					goto('/panel/district');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteDistrictApprove(data.districtId)}
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
				{#if district}
					<div class="flex flex-wrap my-4">
						<div class="w-full flex lg:w-12/12 self-center">
							<div class="relative w-full mb-3 lg:w-4/12 px-4">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Emlak Kategorisi
								</label>
								{#if citys}
								<Select
								  bind:value={district.city.value}
								  change={() => getStates(district.city.value)}
								  values={citys}
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
									Bölge
								</label>
								{#if states}
								<Select
								  bind:value={district.state.value}
								  values={states}
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
									bind:value={district.order.value}
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
									bind:value={district.name['tr'].value}
									bind:isValid={district.name['tr'].isValid}
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
									bind:value={district.name['en'].value}
									bind:isValid={district.name['en'].isValid}
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
									bind:value={district.name['ru'].value}
									bind:isValid={district.name['ru'].isValid}
									placeholder={'İsim Rusça'}
									required={false}
								/>
							</div>
						</div>
					</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateDistrict()}
								disabled={!district.name['tr'].isValid}
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
