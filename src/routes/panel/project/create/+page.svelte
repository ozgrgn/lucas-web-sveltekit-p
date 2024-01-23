<script>
	import { goto } from '$app/navigation';
	import Input from '$src/lib/components/Form/Input.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import { onMount } from 'svelte';
	import RestService from '$services/rest';
	import ToastService from '$services/toast';
	import NumberInput from '$src/lib/components/Form/NumberInput.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import Date from '$src/lib/components/Form/Date.svelte';
	import Switch from '$src/lib/components/Form/Switch.svelte';
	import ImageArray from '$src/lib/components/Form/ImageArray.svelte';
	import Image from '$src/lib/components/Form/Image.svelte';
	import TextEditor from '$src/lib/components/Form/TextEditor.svelte';

	let name = {};
	let description = {};

	let infoHeaderTR;
	let infoNameTR;
	let infoHeaderEN;
	let infoNameEN;
	let infoHeaderRU;
	let infoNameRU;
	let infoDesc = {};
	let infoElementsTR = [];
	let infoElementsEN = [];
	let infoElementsRU = [];

	let generalHeaderTR;
	let generalNameTR;
	let generalHeaderEN;
	let generalNameEN;
	let generalHeaderRU;
	let generalNameRU;
	let generalDesc = {};
	let generalElementsTR = [];
	let generalElementsEN = [];
	let generalElementsRU = [];

	let technicalHeaderTR;
	let technicalNameTR;
	let technicalHeaderEN;
	let technicalNameEN;
	let technicalHeaderRU;
	let technicalNameRU;
	let technicalDesc = {};
	let technicalElementsTR = [];
	let technicalElementsEN = [];
	let technicalElementsRU = [];

	let perma;
	let no;
	let date;
	let order;
	let staff;
	let district;
	let state;
	let city;
	let type;
	let images = [];
	let coverImage;
	let isActive;
	let videoLink;
	let virtualLink;
	let propMap;
	let driveLink;
	let page = 'profile';
	let deleteImage = (index) => {
		images.splice(index, 1);
		images = images;
	};

	let staffs;
	const getStaffs = async () => {
		let getStaffsResponse = await RestService.getStaffs(undefined, undefined);
		if (getStaffsResponse['status']) {
			console.log(getStaffsResponse, 'getStaffsResponse');
			staffs = getStaffsResponse['staffs'];
			console.log(staffs, 'staffs');
		} else {
			ToastService.error($TranslateApiMessage(getStaffsResponse.message));
		}
	};
	let citys;
	const getCitys = async () => {
		let getCitysResponse = await RestService.getCitys(undefined, undefined);
		if (getCitysResponse['status']) {
			console.log(getCitysResponse, 'getCitysResponse');
			citys = getCitysResponse['citys'];
			console.log(citys, 'citys');
		} else {
			ToastService.error($TranslateApiMessage(getCitysResponse.message));
		}
	};
	let states = [];
	const getStates = async () => {
		let getStatesResponse = await RestService.getStates(undefined, undefined);
		if (getStatesResponse['status']) {
			console.log(getStatesResponse, 'getStatesResponse');
			states = getStatesResponse['states'];
			console.log(states, 'states');
		} else {
			ToastService.error($TranslateApiMessage(getStatesResponse.message));
		}
	};
	let districts = [];
	const getDistricts = async () => {
		let getDistrictsResponse = await RestService.getDistricts(undefined, undefined);
		if (getDistrictsResponse['status']) {
			console.log(getDistrictsResponse, 'getDistrictsResponse');
			districts = getDistrictsResponse['districts'];
			console.log(districts, 'districts');
		} else {
			ToastService.error($TranslateApiMessage(getDistrictsResponse.message));
		}
	};

	onMount(() => {
		getCitys();
		getStaffs();
	});

	const addProject = async () => {
		let data = {
			name: name,
			order: order,
			isActive: isActive,
			perma: perma,
			description: description,
			no: no,
			date: date,
			staff: staff,
			district: district,
			state: state,
			city: city,
			images: images,
			coverImage: coverImage,
			videoLink: videoLink,
			virtualLink: virtualLink,
			propMap: propMap,
			driveLink: driveLink,
			infoDesc: infoDesc,
			infoElementsTR: infoElementsTR,
			infoElementsEN: infoElementsEN,
			infoElementsRU: infoElementsRU,
			technicalDesc: technicalDesc,
			technicalElementsTR: technicalElementsTR,
			technicalElementsEN: technicalElementsEN,
			technicalElementsRU: technicalElementsRU,
			generalDesc: generalDesc,
			generalElementsTR: generalElementsTR,
			generalElementsEN: generalElementsEN,
			generalElementsRU: generalElementsRU
		};

		let response = await RestService.addProject(data);
		if (response['status']) {
			ToastService.success('Başarıyla Kayıt Edildi');
			goto('/panel/project');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
	const deleteElements = (topic, i) => {
		if (topic == 'infoElementsTR') {
			infoElementsTR.splice(i, 1);
			infoElementsTR = infoElementsTR;
		}
		if (topic == 'infoElementsEN') {
			infoElementsEN.splice(i, 1);
			infoElementsEN = infoElementsEN;
		}
		if (topic == 'infoElementsRU') {
			infoElementsRU.splice(i, 1);
			infoElementsRU = infoElementsRU;
		}
		if (topic == 'technicalElementsTR') {
			technicalElementsTR.splice(i, 1);
			technicalElementsTR = technicalElementsTR;
		}
		if (topic == 'technicalElementsEN') {
			technicalElementsEN.splice(i, 1);
			technicalElementsEN = technicalElementsEN;
		}
		if (topic == 'technicalElementsRU') {
			technicalElementsRU.splice(i, 1);
			technicalElementsRU = technicalElementsRU;
		}
		if (topic == 'generalElementsTR') {
			generalElementsTR.splice(i, 1);
			generalElementsTR = generalElementsTR;
		}
		if (topic == 'generalElementsEN') {
			generalElementsEN.splice(i, 1);
			generalElementsEN = generalElementsEN;
		}
		if (topic == 'generalElementsRU') {
			generalElementsRU.splice(i, 1);
			generalElementsRU = generalElementsRU;
		}
	};
	const addElements = (topic, header, name) => {
		if (topic == 'infoElementsTR') {
			let e = { header: header, name: name };
			infoElementsTR = [...infoElementsTR, e];
			infoHeaderTR = undefined;
			infoNameTR = undefined;
		}
		if (topic == 'infoElementsEN') {
			let e = { header: header, name: name };
			infoElementsEN = [...infoElementsEN, e];
			infoHeaderEN = undefined;
			infoNameEN = undefined;
		}
		if (topic == 'infoElementsRU') {
			let e = { header: header, name: name };
			infoElementsRU = [...infoElementsRU, e];
			infoHeaderRU = undefined;
			infoNameRU = undefined;
		}

		if (topic == 'technicalElementsTR') {
			let e = { header: header, name: name };
			technicalElementsTR = [...technicalElementsTR, e];
			technicalHeaderTR = undefined;
			technicalNameTR = undefined;
		}
		if (topic == 'technicalElementsEN') {
			let e = { header: header, name: name };
			technicalElementsEN = [...technicalElementsEN, e];
			technicalHeaderEN = undefined;
			technicalNameEN = undefined;
		}
		if (topic == 'technicalElementsRU') {
			let e = { header: header, name: name };
			technicalElementsRU = [...technicalElementsRU, e];
			technicalHeaderRU = undefined;
			technicalNameRU = undefined;
		}

		if (topic == 'generalElementsTR') {
			let e = { header: header, name: name };
			generalElementsTR = [...generalElementsTR, e];
			generalHeaderTR = undefined;
			generalNameTR = undefined;
		}
		if (topic == 'generalElementsEN') {
			let e = { header: header, name: name };
			generalElementsEN = [...generalElementsEN, e];
			generalHeaderEN = undefined;
			generalNameEN = undefined;
		}
		if (topic == 'generalElementsRU') {
			let e = { header: header, name: name };
			generalElementsRU = [...generalElementsRU, e];
			generalHeaderRU = undefined;
			generalNameRU = undefined;
		}
	};
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<div class="flex">
			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => {
					goto('/panel/project');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>
		</div>
		<div
			class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
		>
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="text-center flex justify-between items-center">
					<h3 class="font-semibold text-lg text-blueGray-700">Proje Girişi</h3>
					<div class="flex justify-center">
						<button
							class="lg:w-20 hover:text-white hover:bg-primary {page == 'profile'
								? 'bg-primary text-white'
								: 'bg-white text-primary '} mb-2 border rounded font-medium  text-xs lg:text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => {
								{
									page = 'profile';
								}
							}}
						>
							Profil
						</button>
						<button
							class="lg:w-20 hover:text-white hover:bg-primary {page == 'info'
								? 'bg-primary text-white'
								: 'bg-white text-primary '} mb-2 border rounded font-medium  text-xs lg:text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => {
								{
									page = 'info';
								}
							}}
						>
							Info
						</button>

						<button
							class="lg:w-20 hover:text-white hover:bg-primary {page == 'technical'
								? 'bg-primary text-white'
								: 'bg-white text-primary '} mb-2 border rounded font-medium  text-xs lg:text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => {
								{
									page = 'technical';
								}
							}}
						>
							Teknik Bilgiler
						</button>
						<button
							class="lg:w-20 hover:text-white hover:bg-primary {page == 'features'
								? 'bg-primary text-white'
								: 'bg-white text-primary '} mb-2 border rounded font-medium  text-xs lg:text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => {
								page = 'general';
							}}
						>
							Özellikler
						</button>
						<button
							class="lg:w-20 hover:text-white hover:bg-primary {page == 'media'
								? 'bg-primary text-white'
								: 'bg-white text-primary '} mb-2 border rounded font-medium  text-xs lg:text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => {
								page = 'media';
							}}
						>
							Medya
						</button>
					</div>

					<div class="flex items-center">
						<label class="block text-blueGray-600 text-sm font-bold pr-2" for="grid-name">
							{isActive ? 'Aktif' : 'Pasif'}
						</label>
						<Switch bind:value={isActive} />
					</div>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if page == 'profile'}
					<div class="flex flex-wrap my-4 ">
						<div class="relative w-full mb-3 lg:w-3/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Temsilci
							</label>
							{#if staffs}
								<Select
									bind:value={staff}
									values={staffs}
									title={'Temsilci seç'}
									valuesKey={'_id'}
									valuesTitleKey={'fullName'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>

						<div class="w-full flex self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Şehir
								</label>
								{#if citys}
									<Select
										bind:value={city}
										change={() => getStates()}
										values={citys}
										title={'Şehir seç'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="w-full flex self-center lg:w-2/12 px-4">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Bölge
								</label>
								{#if states}
									<Select
										bind:value={state}
										change={() => getDistricts()}
										values={states}
										title={'Bölge seç'}
										valuesKey={'_id'}
										valuesTitleKey={'name'}
										valuesTitleKeySub={'tr'}
										customClass={'w-full border-0 h-9 text-md'}
									/>
								{/if}
							</div>
						</div>
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Mahalle
							</label>
							{#if districts}
								<Select
									bind:value={district}
									values={districts}
									title={'Mahalle seç'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									valuesTitleKeySub={'tr'}
									customClass={'w-full border-0 h-9 text-md'}
								/>
							{/if}
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Tipi
								</label>
								<Input bind:value={type} placeholder={'Gayrimenkul Tipi '} required={false} />
							</div>
						</div>

						<div class="w-full lg:w-3/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									İlan No
								</label>
								<NumberInput
									bind:value={no}
									placeholder={'İlan No'}
									required={false}
									customClass="h-9 w-full text-md"
								/>
							</div>
						</div>
						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Tarih
								</label>
								<Date bind:value={date} placeholder={'Tarih'} required={false} />
							</div>
						</div>
						<div class="w-full lg:w-4/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Perma
								</label>
								<Input
									bind:value={perma}
									placeholder={'kemerde-satilik-villa'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>

						<div class="w-full lg:w-2/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Sıra
								</label>
								<NumberInput
									bind:value={order}
									placeholder={'Sıra No'}
									required={false}
									customClass="h-9 w-full text-md"
								/>
							</div>
						</div>
					</div>
					<div class="flex flex-wrap my-4 border-b-2 border-2 py-4">
						<div class="w-full lg:w-4/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									İsim Türkçe
								</label>
								<Input
									bind:value={name['tr']}
									placeholder={'İsim Türkçe'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full lg:w-4/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									İsim İngilizce
								</label>
								<Input
									bind:value={name['en']}
									placeholder={'İsim İngilizce'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full lg:w-4/12 px-4 self-center">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									İsim Rusça
								</label>
								<Input
									bind:value={name['ru']}
									placeholder={'İsim Rusça'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
					</div>
					<div class="flex flex-wrap my-4  py-4  ">
						<div class="w-full self-center lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Açıklama Türkçe
								</label>
								<TextEditor
									bind:value={description['tr']}
									bind:incomingValue={description['tr']}
									placeholder={'Açıklama Türkçe'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full self-center lg:w-4/12 px-4">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Açıklama İngilizce
								</label>
								<TextEditor
									bind:value={description['en']}
									bind:incomingValue={description['en']}
									placeholder={'Açıklama İngilizce'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full self-center lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Açıklama Rusça
								</label>
								<TextEditor
									bind:value={description['ru']}
									bind:incomingValue={description['ru']}
									placeholder={'Açıklama Rusça'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
					</div>
				{/if}
				{#if page == 'info'}
					<div class="flex flex-wrap my-4  py-4  ">
						<div class="w-full self-center lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Proje Bilgisi Metin TR
								</label>
								<TextEditor
									bind:value={infoDesc['tr']}
									bind:incomingValue={infoDesc['tr']}
									placeholder={'Açıklama Türkçe'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full self-center lg:w-4/12 px-4">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Proje Bilgisi Metin EN
								</label>
								<TextEditor
									bind:value={infoDesc['en']}
									bind:incomingValue={infoDesc['en']}
									placeholder={'Açıklama İngilizce'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full self-center lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Proje Bilgisi Metin RU
								</label>
								<TextEditor
									bind:value={infoDesc['ru']}
									bind:incomingValue={infoDesc['ru']}
									placeholder={'Açıklama Rusça'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
					</div>
					<label class="block text-blueGray-600 text-sm font-bold mb-2 px-4" for="grid-name">
						Proje Bilgisi Maddeler
					</label>
					<div class="flex flex-wrap">
						<div class="w-full  lg:w-4/12">
							<div class="flex flex-wrap px-4 pl-2">
								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={infoHeaderTR}
											placeholder={'Özellik Başlık TR'}
											required={false}
										/>
									</div>
								</div>

								<div class="w-full lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={infoNameTR}
											placeholder={'Özellik Öğe TR'}
											required={false}
										/>
									</div>
								</div>
								<div class="w-full lg:w-2/12 px-2 mb-3">
									<button
										on:click={() => addElements('infoElementsTR', infoHeaderTR, infoNameTR)}
										class="bg-[#50C878] text-white hover:bg-[#6e6e85] hover:text-white rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
										type="button"
									>
										Ekle
									</button>
								</div>

								{#each infoElementsTR as element, i}
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={infoElementsTR[i].header}
												placeholder={'Özellik Başlık TR'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={infoElementsTR[i].name}
												placeholder={'Özellik Öğe TR'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-2/12 px-2 mb-3">
										<button
											on:click={() => deleteElements('infoElementsTR', i)}
											class="bg-red-500 text-white hover:bg-[#6e6e85] hover:text-white  rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</div>
								{/each}
							</div>
						</div>
						<div class="w-full  lg:w-4/12">
							<div class="flex flex-wrap px-4 pl-2">
								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={infoHeaderEN}
											placeholder={'Özellik Başlık EN'}
											required={false}
										/>
									</div>
								</div>

								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={infoNameEN}
											placeholder={'Özellik Öğe EN'}
											required={false}
										/>
									</div>
								</div>
								<div class="w-full  lg:w-2/12 px-2 mb-3">
									<button
										on:click={() => addElements('infoElementsEN', infoHeaderEN, infoNameEN)}
										class="bg-[#50C878] text-white hover:bg-[#6e6e85] hover:text-white rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
										type="button"
									>
										Ekle
									</button>
								</div>

								{#each infoElementsEN as element, i}
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={infoElementsEN[i].header}
												placeholder={'Özellik Başlık EN'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={infoElementsEN[i].name}
												placeholder={'Özellik Öğe EN'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-2/12 px-2 mb-3">
										<button
											on:click={() => deleteElements('infoElementsEN', i)}
											class="bg-red-500 text-white hover:bg-[#6e6e85] hover:text-white  rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</div>
								{/each}
							</div>
						</div>
						<div class="w-full  lg:w-4/12">
							<div class="flex flex-wrap px-4 pl-2">
								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={infoHeaderRU}
											placeholder={'Özellik Başlık RU'}
											required={false}
										/>
									</div>
								</div>

								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={infoNameRU}
											placeholder={'Özellik Öğe RU'}
											required={false}
										/>
									</div>
								</div>
								<div class="w-full  lg:w-2/12 px-2 mb-3">
									<button
										on:click={() => addElements('infoElementsRU', infoHeaderRU, infoNameRU)}
										class="bg-[#50C878] text-white hover:bg-[#6e6e85] hover:text-white rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
										type="button"
									>
										Ekle
									</button>
								</div>

								{#each infoElementsRU as element, i}
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={infoElementsRU[i].header}
												placeholder={'Özellik Başlık RU'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={infoElementsRU[i].name}
												placeholder={'Özellik Öğe RU'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-2/12 px-2 mb-3">
										<button
											on:click={() => deleteElements('infoElementsRU', i)}
											class="bg-red-500 text-white hover:bg-[#6e6e85] hover:text-white  rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}
				{#if page == 'technical'}
					<div class="flex flex-wrap my-4  py-4  ">
						<div class="w-full  lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Proje Teknik Metin TR
								</label>
								<TextEditor
									bind:value={technicalDesc['tr']}
									bind:incomingValue={technicalDesc['tr']}
									placeholder={'Açıklama Türkçe'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full  lg:w-4/12 px-4">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Proje Teknik Metin EN
								</label>
								<TextEditor
									bind:value={technicalDesc['en']}
									bind:incomingValue={technicalDesc['en']}
									placeholder={'Açıklama İngilizce'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full  lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Proje Teknik Metin RU
								</label>
								<TextEditor
									bind:value={technicalDesc['ru']}
									bind:incomingValue={technicalDesc['ru']}
									placeholder={'Açıklama Rusça'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
					</div>
					<label class="block text-blueGray-600 text-sm font-bold mb-2 px-4" for="grid-name">
						Proje Teknik Maddeler
					</label>
					<div class="flex flex-wrap">
						<div class="w-full  lg:w-4/12">
							<div class="flex flex-wrap px-4 pl-2">
								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={technicalHeaderTR}
											placeholder={'Özellik Başlık TR'}
											required={false}
										/>
									</div>
								</div>

								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={technicalNameTR}
											placeholder={'Özellik Öğe TR'}
											required={false}
										/>
									</div>
								</div>
								<div class="w-full  lg:w-2/12 px-2 mb-3">
									<button
										on:click={() =>
											addElements('technicalElementsTR', technicalHeaderTR, technicalNameTR)}
										class="bg-[#50C878] text-white hover:bg-[#6e6e85] hover:text-white rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
										type="button"
									>
										Ekle
									</button>
								</div>

								{#each technicalElementsTR as element, i}
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={technicalElementsTR[i].header}
												placeholder={'Özellik Başlık TR'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={technicalElementsTR[i].name}
												placeholder={'Özellik Öğe TR'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-2/12 px-2 mb-3">
										<button
											on:click={() => deleteElements('technicalElementsTR', i)}
											class="bg-red-500 text-white hover:bg-[#6e6e85] hover:text-white  rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</div>
								{/each}
							</div>
						</div>
						<div class="w-full  lg:w-4/12">
							<div class="flex flex-wrap px-4 pl-2">
								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={technicalHeaderEN}
											placeholder={'Özellik Başlık EN'}
											required={false}
										/>
									</div>
								</div>

								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={technicalNameEN}
											placeholder={'Özellik Öğe EN'}
											required={false}
										/>
									</div>
								</div>
								<div class="w-full  lg:w-2/12 px-2 mb-3">
									<button
										on:click={() =>
											addElements('technicalElementsEN', technicalHeaderEN, technicalNameEN)}
										class="bg-[#50C878] text-white hover:bg-[#6e6e85] hover:text-white rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
										type="button"
									>
										Ekle
									</button>
								</div>

								{#each technicalElementsEN as element, i}
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={technicalElementsEN[i].header}
												placeholder={'Özellik Başlık EN'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={technicalElementsEN[i].name}
												placeholder={'Özellik Öğe EN'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-2/12 px-2 mb-3">
										<button
											on:click={() => deleteElements('technicalElementsEN', i)}
											class="bg-red-500 text-white hover:bg-[#6e6e85] hover:text-white  rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</div>
								{/each}
							</div>
						</div>
						<div class="w-full  lg:w-4/12">
							<div class="flex flex-wrap px-4 pl-2">
								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={technicalHeaderRU}
											placeholder={'Özellik Başlık RU'}
											required={false}
										/>
									</div>
								</div>

								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={technicalNameRU}
											placeholder={'Özellik Öğe RU'}
											required={false}
										/>
									</div>
								</div>
								<div class="w-full  lg:w-2/12 px-2 mb-3">
									<button
										on:click={() =>
											addElements('technicalElementsRU', technicalHeaderRU, technicalNameRU)}
										class="bg-[#50C878] text-white hover:bg-[#6e6e85] hover:text-white rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
										type="button"
									>
										Ekle
									</button>
								</div>

								{#each technicalElementsRU as element, i}
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={technicalElementsRU[i].header}
												placeholder={'Özellik Başlık RU'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={technicalElementsRU[i].name}
												placeholder={'Özellik Öğe RU'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-2/12 px-2 mb-3">
										<button
											on:click={() => deleteElements('technicalElementsRU', i)}
											class="bg-red-500 text-white hover:bg-[#6e6e85] hover:text-white  rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}
				{#if page == 'general'}
					<div class="flex flex-wrap my-4  py-4  ">
						<div class="w-full  lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Proje Genel Özellikler Metin TR
								</label>
								<TextEditor
									bind:value={generalDesc['tr']}
									bind:incomingValue={generalDesc['tr']}
									placeholder={'Açıklama Türkçe'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full  lg:w-4/12 px-4">
							<div class="relative w-full mb-3 ">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Proje Genel Özellikler Metin EN
								</label>
								<TextEditor
									bind:value={generalDesc['en']}
									bind:incomingValue={generalDesc['en']}
									placeholder={'Açıklama İngilizce'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
						<div class="w-full  lg:w-4/12 px-4">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Proje Genel Özellikler Metin RU
								</label>
								<TextEditor
									bind:value={generalDesc['ru']}
									bind:incomingValue={generalDesc['ru']}
									placeholder={'Açıklama Rusça'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
					</div>
					<label class="block text-blueGray-600 text-sm font-bold mb-2 px-4" for="grid-name">
						Proje Genel Özellik Maddeleri
					</label>
					<div class="flex flex-wrap">
						<div class="w-full  lg:w-4/12">
							<div class="flex flex-wrap px-4 pl-2">
								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={generalHeaderTR}
											placeholder={'Özellik Başlık TR'}
											required={false}
										/>
									</div>
								</div>

								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={generalNameTR}
											placeholder={'Özellik Öğe TR'}
											required={false}
										/>
									</div>
								</div>
								<div class="w-full  lg:w-2/12 px-2 mb-3">
									<button
										on:click={() =>
											addElements('generalElementsTR', generalHeaderTR, generalNameTR)}
										class="bg-[#50C878] text-white hover:bg-[#6e6e85] hover:text-white rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
										type="button"
									>
										Ekle
									</button>
								</div>

								{#each generalElementsTR as element, i}
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={generalElementsTR[i].header}
												placeholder={'Özellik Başlık TR'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={generalElementsTR[i].name}
												placeholder={'Özellik Öğe TR'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-2/12 px-2 mb-3">
										<button
											on:click={() => deleteElements('generalElementsTR', i)}
											class="bg-red-500 text-white hover:bg-[#6e6e85] hover:text-white  rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</div>
								{/each}
							</div>
						</div>
						<div class="w-full  lg:w-4/12">
							<div class="flex flex-wrap px-4 pl-2">
								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={generalHeaderEN}
											placeholder={'Özellik Başlık EN'}
											required={false}
										/>
									</div>
								</div>

								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={generalNameEN}
											placeholder={'Özellik Öğe EN'}
											required={false}
										/>
									</div>
								</div>
								<div class="w-full  lg:w-2/12 px-2 mb-3">
									<button
										on:click={() =>
											addElements('generalElementsEN', generalHeaderEN, generalNameEN)}
										class="bg-[#50C878] text-white hover:bg-[#6e6e85] hover:text-white rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
										type="button"
									>
										Ekle
									</button>
								</div>

								{#each generalElementsEN as element, i}
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={generalElementsEN[i].header}
												placeholder={'Özellik Başlık EN'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={generalElementsEN[i].name}
												placeholder={'Özellik Öğe EN'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-2/12 px-2 mb-3">
										<button
											on:click={() => deleteElements('generalElementsEN', i)}
											class="bg-red-500 text-white hover:bg-[#6e6e85] hover:text-white  rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</div>
								{/each}
							</div>
						</div>
						<div class="w-full  lg:w-4/12">
							<div class="flex flex-wrap px-4 pl-2">
								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={generalHeaderRU}
											placeholder={'Özellik Başlık RU'}
											required={false}
										/>
									</div>
								</div>

								<div class="w-full  lg:w-5/12 px-2">
									<div class="relative w-full mb-3">
										<Input
											bind:value={generalNameRU}
											placeholder={'Özellik Öğe RU'}
											required={false}
										/>
									</div>
								</div>
								<div class="w-full  lg:w-2/12 px-2 mb-3">
									<button
										on:click={() =>
											addElements('generalElementsRU', generalHeaderRU, generalNameRU)}
										class="bg-[#50C878] text-white hover:bg-[#6e6e85] hover:text-white rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
										type="button"
									>
										Ekle
									</button>
								</div>

								{#each generalElementsRU as element, i}
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={generalElementsRU[i].header}
												placeholder={'Özellik Başlık RU'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-5/12 px-2">
										<div class="relative w-full mb-3">
											<Input
												bind:value={generalElementsRU[i].name}
												placeholder={'Özellik Öğe RU'}
												required={false}
											/>
										</div>
									</div>
									<div class="w-full  lg:w-2/12 px-2 mb-3">
										<button
											on:click={() => deleteElements('generalElementsRU', i)}
											class="bg-red-500 text-white hover:bg-[#6e6e85] hover:text-white  rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none "
											type="button"
										>
											Sil
										</button>
									</div>
								{/each}
							</div>
						</div>
					</div>
				{/if}
				{#if page == 'media'}
					<div class="lg:w-6/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Kapak Resmi (1366 × 905)
							</label>
							<Image bind:value={coverImage} placeholder={'Kapak Resmi'} required={false} />
						</div>
						<button
							on:click={() => (images = [...images, { image: null }])}
							class="h-10  bg-red-400 disabled:bg-red-300 text-white active:bg-[#074764] font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
							type="button"
						>
							Emlak Resmi Ekle
						</button>
						<div>
							{#if images[0]}
								{#each images as image, index}
									<div class="border mt-2 p-1 grid grid-cols-4">
										<span
											class="px-2 flex flex-col justify-center text-blueGray-600 text-xs font-bold"
											>{index + 1}.{'Resim'}</span
										>
										<div class="col-span-2">
											<ImageArray bind:value={images[index].image} {index} />
										</div>
										<div class="flex flex-col justify-center items-end">
											<button
												on:click={() => deleteImage(index)}
												class="w-14 bg-red-500 hover:bg-red-600 text-white font-bold text-xs m-2 px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
												type="button"
											>
												SİL
											</button>
										</div>
									</div>
								{/each}
							{/if}
						</div>
					</div>
					<div class="lg:w-6/12 px-4">
						<div class="flex flex-col">
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Video Linki
								</label>
								<Input
									bind:value={videoLink}
									placeholder={'Video Linki'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Sanal Tur Kodu (BAsuVGN6Wat)
								</label>
								<Input
									bind:value={virtualLink}
									placeholder={'Sanal Tur Kodu'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Harita Linki (755x400)
								</label>
								<Input
									bind:value={propMap}
									placeholder={'Harita Linki'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
							<div class="relative w-full mb-3">
								<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
									Drive Linki
								</label>
								<Input
									bind:value={driveLink}
									placeholder={'Drive Linki'}
									required={false}
									customClass="text-md h-9"
								/>
							</div>
						</div>
					</div>
				{/if}
			</div>
			<div class="flex flex-wrap justify-center">
				<div class="w-full lg:w-12/12 px-2 text-right my-4">
					<button
						disabled={!name['tr']}
						class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
						type="button"
						on:click={() => addProject()}
					>
						Kaydet
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
