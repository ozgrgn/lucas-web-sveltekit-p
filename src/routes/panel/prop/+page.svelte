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

	const deletePropApprove = (propId) => {
		console.log(propId);
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteProp(propId);
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
	let props;
	const getProps = async () => {
		console.log(propCat);

		let getPropsResponse = await RestService.getProps(
			limit,
			skip,
			undefined,
			undefined,
			propCat,
			propStatus,
			propType
		);
		if (getPropsResponse['status']) {
			console.log(getPropsResponse, 'getPropsResponse');
			props = getPropsResponse['props'];
			totalDataCount = getPropsResponse['count'];
			console.log(getPropsResponse, 'getProps');
		} else {
			ToastService.error($TranslateApiMessage(getPropsResponse.message));
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
			ToastService.error($TranslateApiMessage(getPropCatsResponse.message));
		}
	};
	let propStatus;
	let propStatuss;
	const getPropStatuss = async () => {
		let getPropStatussResponse = await RestService.getPropStatuss(undefined, undefined);
		if (getPropStatussResponse['status']) {
			console.log(getPropStatussResponse, 'getPropStatussResponse');
			propStatuss = getPropStatussResponse['propStatuss'];
			console.log(propStatuss, 'propStatuss');
		} else {
			ToastService.error($TranslateApiMessage(getPropStatussResponse.message));
		}
	};
	let propType;
	let propTypes;
	const getPropTypes = async () => {
		let getPropTypesResponse = await RestService.getPropTypes(undefined, undefined);
		if (getPropTypesResponse['status']) {
			console.log(getPropTypesResponse, 'getPropTypesResponse');
			propTypes = getPropTypesResponse['propTypes'];
			console.log(propTypes, 'propTypes');
		} else {
			ToastService.error($TranslateApiMessage(getPropTypesResponse.message));
		}
	};
	onMount(() => {
		getProps();
		getPropCats();
		getPropStatuss();
		getPropTypes();
	});

	const deleteProp = async (propId) => {
		console.log('delete');
		let response = await RestService.deleteProp(propId);
		if (response['status']) {
			ToastService.success('Başarılıyla Silindi');
			propCat = undefined;
			getProps();
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
			getProps();
		}
	};
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/prop/create');
			}}
		>
			<i class="fa fa-plus" />
			Ekle
		</button>

		<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="flex flex-wrap items-center">
					<div class="relative w-full px-4 max-w-full flex-grow flex-1">
						<h3 class="font-semibold text-lg text-blueGray-700">Emlak</h3>
					</div>
				</div>
			</div>
			<div class="block w-full overflow-x-auto">
				{#if props}
					<table class="items-center w-full bg-transparent border-collapse">
						<thead>
							<tr>
								<th
									class="px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									İlan No
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									{#if propCats}
										<Select
											bind:value={propCat}
											change={() => getProps()}
											values={propCats}
											title={'Emlak Kategorisi'}
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
											change={() => getProps()}
											values={propStatuss}
											title={'Emlak Statüsü'}
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
									{#if propTypes}
										<Select
											bind:value={propType}
											change={() => getProps()}
											values={propTypes}
											title={'Emlak Tipi'}
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
									İsim
								</th>

								<th
									class="px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									Temsilci
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-sm border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									Aktif ?
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
							{#if props}
								{#each props as prop}
									<tr>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{prop?.no ? prop?.no : '-'}
										</td>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{prop?.propCat?.name?.tr ? prop?.propCat.name.tr : '-'}
										</td>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{prop?.propStatus?.name?.tr ? prop?.propStatus.name.tr : '-'}
										</td>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{prop?.propType?.name?.tr ? prop?.propType.name.tr : '-'}
										</td>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{prop?.order ? prop?.order : '-'}
										</td>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{prop?.name?.tr ? prop?.name?.tr : '-'}
										</td>

										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											{prop?.staff?.fullName ? prop?.staff?.fullName : '-'}
										</td>
										<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center {prop?.isActive?"font-semibold text-green-500":"font-semibold text-red-500"}"
									>
										{prop?.isActive ? "EVET" : 'HAYIR'}
									</td>
										<td
											class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-center"
										>
											<button
												class="bg-white text-primary hover:bg-[#6e6e85] hover:text-white border border-primary rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
												type="button"
												on:click={goto(`/panel/prop/update/${prop?._id.toString()}`)}
											>
												Düzenle
											</button>
											<button
												on:click={() => deletePropApprove(prop?._id.toString())}
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
			{#if props}
				<div
					class="flex flex-row flex-wrap lg:flex-nowrap w-full gap-1 justify-center lg:justify-end items-center p-3"
				>
					<Select
						bind:value={limit}
						change={() => {
							getProps();
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
							getProps();
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
								getProps();
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
