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

	const deleteStaffApprove = (staffId) => {
		console.log(staffId);
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteStaff(staffId);
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

	let lang = undefined;
	let langs;

	const getLangs = async () => {
		let response = await RestService.getLanguages(undefined, undefined);
		langs = response['languages'];
	};
	getLangs();

	let staffs;
	const getStaffs = async () => {
		let getStaffsResponse = await RestService.getStaffs(lang, limit, skip);
		if (getStaffsResponse['status']) {
			console.log(getStaffsResponse, 'getStaffsResponse');
			staffs = getStaffsResponse['staffs'];
			totalDataCount = getStaffsResponse['count'];
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
	onMount(() => {
		getStaffs();
	});

	const deleteStaff = async (staffId) => {
		console.log('delete');
		let response = await RestService.deleteStaff(staffId);
		if (response['status']) {
			ToastService.success('Başarılıyla Silindi');
			getStaffs();
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
			getStaffs();
		}
	};
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/staff/create');
			}}
		>
			<i class="fa fa-plus" />
			Ekle
		</button>

		<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="flex flex-wrap items-center">
					<div class="relative w-full px-4 max-w-full flex-grow flex-1">
						<h3 class="font-semibold text-lg text-blueGray-700">Ekip</h3>
					</div>
				</div>
			</div>
			<div class="block w-full overflow-x-auto">
				{#if staffs}
					<table class="items-center w-full bg-transparent border-collapse">
						<thead>
							<tr>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									{#if langs}
										<Select
											bind:value={lang}
											change={() => getStaffs()}
											values={langs}
											title={'Dil Seçin'}
											valuesKey={'lang'}
											valuesTitleKey={'name'}
											customClass={'w-full h-9 text-sm'}
										/>
									{/if}
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									Personel İsmi
								</th>
								<th
									class="px-6 align-middle border border-solid py-3 text-xs border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								>
									Sıra
								</th>
								
								<th
									class="px-6 align-middle border border-solid py-3 text-xs  border-l-0 border-r-0 whitespace-nowrap font-semibold  {color ===
									'light'
										? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
										: 'bg-red-700 text-red-200 border-red-600'}"
								/>
							</tr>
						</thead>
						<tbody>
							{#each staffs as staff}
								<tr>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
									>
										{staff.lang}
									</td>
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
									>
										{staff.fullName ? staff.fullName : '-'}
									</td>
								
									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
									>
										{staff.order}
									</td>

									<td
										class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center"
									>
										<button
											class="bg-white text-primary hover:bg-[#6e6e85] hover:text-white border border-primary rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
											on:click={goto(`/panel/staff/update/${staff._id.toString()}`)}
										>
											Düzenle
										</button>
										<button
											on:click={() => deleteStaffApprove(staff._id.toString())}
											class="bg-white text-primary hover:bg-[#6e6e85] hover:text-white border border-primary rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
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
			{#if staffs}
				<div
					class="flex flex-row flex-wrap lg:flex-nowrap w-full gap-1 justify-center lg:justify-end items-center p-3"
				>
					<Select
						bind:value={limit}
						change={() => {
							getStaffs();
						}}
						values={[{ limit: 10 }, { limit: 20 }, { limit: 50 }, { limit: 100 }]}
						title={'Select page'}
						valuesKey={'limit'}
						valuesTitleKey={'limit'}
						customClass={'border border-primary text-primary py-1 w-full mx-16 lg:mx-0 lg:w-auto'}
					/>

					<button
						class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
						type="button"
						on:click={() => {
							skip != 0 ? (skip = skip - limit) : (skip = skip);
							getStaffs();
						}}
					>
						Geri
					</button>
					{#each _pages() as page, i}
						<button
							class="border {skip == limit * i
								? 'bg-primary text-white'
								: 'bg-white text-primary border-primary'} font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
							class:hidden={i - skip / limit > 5 || skip / limit - i > 5}
							type="button"
							on:click={() => {
								skip = limit * i;
								getStaffs();
							}}
						>
							{i + 1}
						</button>
					{/each}

					<button
						onclick={ceilAndCalculate}
						class="bg-[#6e6e85] text-white active:bg-orange-500 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none  "
						type="button"
					>
						Sonraki
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
