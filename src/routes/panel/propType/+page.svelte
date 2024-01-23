<script>
	import Select from '$components/Form/Select.svelte';
	import { bind } from 'svelte-simple-modal';
	import { modal } from '$services/store';
	import { goto } from '$app/navigation';
	import Alert from '$components/Panel/Alert.svelte';
	import { onMount } from 'svelte';
	import RestService from '$services/rest';
	import { TranslateApiMessage } from '$services/language';
	import ToastService from '$services/toast';

	const deletePropTypeApprove = (propTypeId) => {
		console.log(propTypeId);
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
	let limit = 10;
	let skip = 0;
	let totalDataCount = 0;
	let color = 'light';
	let propCat;
	let propTypes;
	const getPropTypes = async () => {
		let getPropTypesResponse = await RestService.getPropTypes(limit, skip, propCat, propStatus);
		if (getPropTypesResponse['status']) {
			propTypes = getPropTypesResponse['propTypes'];
			totalDataCount = getPropTypesResponse['count'];
		} else {
			ToastService.error($TranslateApiMessage(getPropTypesResponse.message));
		}
	};
	let propCats;
	const getPropCats = async () => {
		let getPropCatsResponse = await RestService.getPropCats(undefined, undefined);
		if (getPropCatsResponse['status']) {
			propCats = getPropCatsResponse['propCats'];
			console.log(propCats, 'propCats');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
	let propStatus;
	let propStatuss;
	const getPropStatuss = async () => {
		let getPropStatussResponse = await RestService.getPropStatuss(undefined, undefined);
		if (getPropStatussResponse['status']) {
			propStatuss = getPropStatussResponse['propStatuss'];
			console.log(propStatuss, 'propStatuss');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
	onMount(() => {
		getPropTypes();
		getPropCats();
		getPropStatuss();
	});

	const deletePropType = async (propTypeId) => {
		if(propTypeId=="644acdf467133dd96468fa5a" || propTypeId=="644adb07532c013f3154e40b" || propTypeId=="644b13ab7f956d455805afbd" || propTypeId=="6451672e80630110791c0cd7") {
			ToastService.error("Bu Emlak Tipi sabit olarak tanımlandı.Maalesef silinemiyor. Ama ismini falan değiştirebilirsiniz sorun yok. Özgür");
			return
		}
		console.log('delete');
		let response = await RestService.deletePropType(propTypeId);
		if (response['status']) {
			ToastService.success('Başarılıyla Silindi');
			getPropTypes();
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const _pages = () => {
		if (totalDataCount > limit) {
			return new Array(Math.ceil(totalDataCount / limit));
		} else {
			return [1];
		}
	};

	const ceilAndCalculate = () => {
		if (Math.ceil(skip / limit) != Math.ceil(totalDataCount / limit) - 1) {
			skip = skip + limit;
			getPropTypes();
		}
	};
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/propType/create');
			}}
		>
			<i class="fa fa-plus" />
			Ekle
		</button>

		<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="flex flex-wrap items-center">
					<div class="relative w-full px-4 max-w-full flex-grow flex-1">
						<h3 class="font-semibold text-lg text-blueGray-700">Emlak Tipi</h3>
					</div>
				</div>
			</div>
			<div class="block w-full overflow-x-auto">
				{#if propTypes}
					<table class="items-center w-full bg-transparent border-collapse">
						<thead>
							<tr>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									{#if propCats}
										<Select
											bind:value={propCat}
											change={() => getPropTypes()}
											values={propCats}
											title={'Kategori seç'}
											valuesKey={'_id'}
											valuesTitleKey={'name'}
											valuesTitleKeySub={'tr'}
											customClass={'w-full border-0 h-9 text-sm'}
										/>
									{/if}
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									{#if propStatuss}
										<Select
											bind:value={propStatus}
											change={() => getPropTypes()}
											values={propStatuss}
											title={'Kategori seç'}
											valuesKey={'_id'}
											valuesTitleKey={'name'}
											valuesTitleKeySub={'tr'}
											customClass={'w-full border-0 h-9 text-sm'}
										/>
									{/if}
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									Sıra
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									Türkçe
								</th>

								<th
									class="px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									İngilizce
								</th>

								<th
									class="px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									Rusça
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									İşlem
								</th>
							</tr>
						</thead>
						<tbody>
							{#if propTypes}
								{#each propTypes as propType}
									<tr>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{propType?.propCat?.name?.tr ? propType?.propCat.name.tr : '-'}
										</td>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{propType?.propStatus?.name?.tr ? propType?.propStatus.name.tr : '-'}
										</td>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{propType?.order ? propType?.order : '-'}
										</td>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{propType?.name?.tr ? propType?.name?.tr : '-'}
										</td>

										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{propType?.name?.en ? propType?.name?.en : '-'}
										</td>

										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{propType?.name?.ru ? propType?.name?.ru : '-'}
										</td>

										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											<button
												class="bg-white text-primary hover:bg-[#6e6e85] hover:text-white border border-primary rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
												type="button"
												on:click={goto(`/panel/propType/update/${propType?._id.toString()}`)}
											>
												Düzenle
											</button>
											<button
												on:click={() => deletePropTypeApprove(propType?._id.toString())}
												class="bg-white text-primary hover:bg-[#6e6e85] hover:text-white border border-primary rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
												type="button"
											>
												Sil
											</button>
										</td>
									</tr>
								{/each}
							{/if}
						</tbody>
					</table>
				{/if}
			</div>
			<hr class="my-4 md:min-w-full" />
			{#if propTypes}
				<div
					class="flex flex-row flex-wrap lg:flex-nowrap w-full gap-1 justify-center lg:justify-end items-center p-3"
				>
					<Select
						bind:value={limit}
						change={() => {
							getPropTypes();
						}}
						values={[{ limit: 10 }, { limit: 20 }, { limit: 50 }, { limit: 100 }]}
						title={'Select page'}
						valuesKey={'limit'}
						valuesTitleKey={'limit'}
						customClass={'border border-primary text-primary py-1 w-full mx-16 lg:mx-0 lg:w-auto'}
					/>

					<button
						class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
						type="button"
						on:click={() => {
							skip != 0 ? (skip = skip - limit) : (skip = skip);
							getPropTypes();
						}}
					>
						Geri
					</button>
					{#each _pages() as page, i}
						<button
							class="border {skip == limit * i
								? 'bg-primary text-white'
								: 'bg-white text-primary border-primary'} font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
							class:hidden={i - skip / limit > 5 || skip / limit - i > 5}
							type="button"
							on:click={() => {
								skip = limit * i;
								getPropTypes();
							}}
						>
							{i + 1}
						</button>
					{/each}

					<button
						onclick={ceilAndCalculate}
						class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none  "
						type="button"
					>
						Sonraki
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
