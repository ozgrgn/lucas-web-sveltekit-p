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

	const deletePropStatusApprove = (propStatusId) => {
		console.log(propStatusId);
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
	let limit = 10;
	let skip = 0;
	let totalDataCount = 0;
	let color = 'light';
	let propCat;
	let propStatuss;
	const getPropStatuss = async () => {
		let getPropStatussResponse = await RestService.getPropStatuss(limit, skip, propCat);
		if (getPropStatussResponse['status']) {
			console.log(getPropStatussResponse, 'getPropStatussResponse');
			propStatuss = getPropStatussResponse['propStatuss'];
			totalDataCount = getPropStatussResponse['count'];
		} else {
			ToastService.error($TranslateApiMessage(getPropStatussResponse.message));
		}
	};
	let propCats;
	const getPropCats = async () => {
		let getPropCatsResponse = await RestService.getPropCats(undefined, undefined);
		if (getPropCatsResponse['status']) {
			console.log(getPropCatsResponse, 'getPropCatsResponse');
			propCats = getPropCatsResponse['propCats'];
			console.log(propCats, 'propCats');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	onMount(() => {
		getPropStatuss();
		getPropCats();
	});

	const deletePropStatus = async (propStatusId) => {
		if(propStatusId=="644ad675532c013f3154e376" || propStatusId=="644ad816532c013f3154e3b1" || propStatusId=="644adaed532c013f3154e3f9"||propStatusId=="645379555a1b413da119d942" ||propStatusId=="6453797a5a1b413da119d94b"||propStatusId=="6453798d5a1b413da119d954"||propStatusId=="645379a35a1b413da119d95d"||propStatusId=="645379c25a1b413da119d966") {
			ToastService.error("Bu Emlak Durumu sabit olarak tanımlandı.Maalesef silinemiyor. Ama ismini falan değiştirebilirsiniz sorun yok. Özgür");
			return
		}
		console.log('delete');
		let response = await RestService.deletePropStatus(propStatusId);
		if (response['status']) {
			ToastService.success('Başarılıyla Silindi');
			getPropStatuss();
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
			getPropStatuss();
		}
	};
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/propStatus/create');
			}}
		>
			<i class="fa fa-plus" />
			Ekle
		</button>

		<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="flex flex-wrap items-center">
					<div class="relative w-full px-4 max-w-full flex-grow flex-1">
						<h3 class="font-semibold text-lg text-blueGray-700">Emlak Statüsü</h3>
					</div>
				</div>
			</div>
			<div class="block w-full overflow-x-auto">
				{#if propStatuss}
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
											change={() => getPropStatuss()}
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
								Satılık/Kiralık
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
							{#each propStatuss as propStatus}
								<tr>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										{propStatus?.propCat?.name?.tr ? propStatus?.propCat?.name?.tr : '-'}
									</td>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										{propStatus?.order ? propStatus?.order : '-'}
									</td>
									<td
									class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
								>
									{propStatus?.group ? propStatus?.group : '-'}
								</td>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										{propStatus?.name?.tr ? propStatus?.name?.tr : '-'}
									</td>

									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										{propStatus?.name?.en ? propStatus?.name?.en : '-'}
									</td>

									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										{propStatus?.name?.ru ? propStatus?.name?.ru : '-'}
									</td>

									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										<button
											class="bg-white text-primary hover:bg-[#6e6e85] hover:text-white border border-primary rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
											on:click={goto(`/panel/propStatus/update/${propStatus?._id.toString()}`)}
										>
											Düzenle
										</button>
										<button
											on:click={() => deletePropStatusApprove(propStatus?._id.toString())}
											class="bg-white text-primary hover:bg-[#6e6e85] hover:text-white border border-primary rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			</div>
			<hr class="my-4 md:min-w-full" />
			{#if propStatuss}
				<div
					class="flex flex-row flex-wrap lg:flex-nowrap w-full gap-1 justify-center lg:justify-end items-center p-3"
				>
					<Select
						bind:value={limit}
						change={() => {
							getPropStatuss();
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
							getPropStatuss();
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
								getPropStatuss();
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
