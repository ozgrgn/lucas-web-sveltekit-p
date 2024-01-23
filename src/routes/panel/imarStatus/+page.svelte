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

	const deleteImarStatusApprove = (imarStatusId) => {
		console.log(imarStatusId);
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteImarStatus(imarStatusId);
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

	let imarStatuss;
	const getImarStatuss = async () => {
		let getImarStatussResponse = await RestService.getImarStatuss(limit, skip);
		if (getImarStatussResponse['status']) {
			console.log(getImarStatussResponse, 'getImarStatussResponse');
			imarStatuss = getImarStatussResponse['imarStatuss'];
			totalDataCount = getImarStatussResponse['count'];
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
	onMount(() => {
		getImarStatuss();
	});

	const deleteImarStatus = async (imarStatusId) => {
		console.log('delete');
		let response = await RestService.deleteImarStatus(imarStatusId);
		if (response['status']) {
			ToastService.success('Başarılıyla Silindi');
			getImarStatuss();
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
			getImarStatuss();
		}
	};
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/imarStatus/create');
			}}
		>
			<i class="fa fa-plus" />
			Ekle
		</button>

		<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="flex flex-wrap items-center">
					<div class="relative w-full px-4 max-w-full flex-grow flex-1">
						<h3 class="font-semibold text-lg text-blueGray-700">İskan Durumu</h3>
					</div>
				</div>
			</div>
			<div class="block w-full overflow-x-auto">
				{#if imarStatuss}
					<table class="items-center w-full bg-transparent border-collapse">
						<thead>
							<tr>
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
									class="px-6 align-middle border border-solid py-3 text-sm  border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								/>
							</tr>
						</thead>
						<tbody>
							{#each imarStatuss as imarStatus}
								<tr>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										{imarStatus?.order ? imarStatus?.order : '-'}
									</td>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										{imarStatus?.name?.tr ? imarStatus?.name?.tr : '-'}
									</td>

									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										{imarStatus?.name?.en ? imarStatus?.name?.en : '-'}
									</td>

									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										{imarStatus?.name?.ru ? imarStatus?.name?.ru : '-'}
									</td>

									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
									>
										<button
											class="bg-white text-primary hover:bg-[#6e6e85] hover:text-white border border-primary rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
											on:click={goto(`/panel/imarStatus/update/${imarStatus?._id.toString()}`)}
										>
											Düzenle
										</button>
										<button
											on:click={() => deleteImarStatusApprove(imarStatus?._id.toString())}
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
			{#if imarStatuss}
				<div
					class="flex flex-row flex-wrap lg:flex-nowrap w-full gap-1 justify-center lg:justify-end items-center p-3"
				>
					<Select
						bind:value={limit}
						change={() => {
							getImarStatuss();
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
							getImarStatuss();
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
								getImarStatuss();
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
