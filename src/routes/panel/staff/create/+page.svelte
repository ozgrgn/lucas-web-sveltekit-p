<script>
	import { goto } from '$app/navigation';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import RestService from '$services/rest';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';

	let langs;
	const getLangs = async () => {
		let response = await RestService.getLanguages(undefined, undefined);
		langs = response['languages'];
	};
	getLangs();
	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'fullName', customValue: null },
		{ key: 'title', customValue: null },
		{ key: 'image', customValue: null },
		{ key: 'text', customValue: null },
		{ key: 'order', customValue: null },
		{ key: 'phone', customValue: null },
		{ key: 'email', customValue: null },
		{ key: 'whatsapp', customValue: null },
		{ key: 'perma', customValue: null },
	];
	

	const addStaff = async () => {
		let data = {};
		values.map((v) => {
			data[v.key] = staff[v.key]?.value;
		});

		let response = await RestService.addStaff(data);
		if (response['status']) {
			ToastService.success('Başarıyla Kayıt Edildi');
			goto('/panel/staff');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	let staff = {};

	values.map((v) => {
		if (v.defaultValue) {
			staff[v.key] = { value: v.defaultValue };
		} else {
			staff[v.key] = {};
		}
	});
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/staff');
			}}
		>
			<i class="fa fa-arrow-left" />
			Geri
		</button>
		<div
			class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-100"
		>
			<div class="rounded-t mb-0 px-4 py-3 border-0">
				<div class="text-center flex justify-between">
					<h3 class="font-semibold text-lg text-blueGray-700">Personel Ekle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							{#if langs}
								<Select
									bind:value={staff.lang.value}
									bind:isValid={staff.lang.isValid}
									values={langs}
									title={'Dil Seçin'}
									valuesKey={'lang'}
									valuesTitleKey={'name'}
									customClass={'w-full h-9'}
								/>
							{/if}
						</div>
					</div>

					<div class="w-full lg:w-1/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Sıra
							</label>
							<Input
								bind:value={staff.order.value}
								bind:isValid={staff.order.isValid}
								placeholder={'Sıra'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								 İsmi
							</label>
							<Input
								bind:value={staff.fullName.value}
								bind:isValid={staff.fullName.isValid}
								placeholder={'İsmi'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Title
							</label>
							<Input
								bind:value={staff.title.value}
								bind:isValid={staff.title.isValid}
								placeholder={'Broker'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								 Perma
							</label>
							<Input
								bind:value={staff.perma.value}
								bind:isValid={staff.perma.isValid}
								placeholder={'ozlem-halici-lucas'}
								required={false}
							/>
						</div>
					</div>
					
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Personel Resmi (128x128)
							</label>
							<Image bind:value={staff.image.value} />
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								 Email
							</label>
							<Input
								bind:value={staff.email.value}
								bind:isValid={staff.email.isValid}
								placeholder={'E-mail'}
								required={false}
							/>
						</div>
					</div><div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								 Telefon
							</label>
							<Input
								bind:value={staff.phone.value}
								bind:isValid={staff.phone.isValid}
								placeholder={'Telefon'}
								required={false}
							/>
						</div>
					</div><div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								 Whatsapp
							</label>
							<Input
								bind:value={staff.whatsapp.value}
								bind:isValid={staff.whatsapp.isValid}
								placeholder={'Whatsapp'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Kısa Tanım Max 120 ({staff?.text?.value?.length ? staff?.text?.value?.length : 0})
							</label>
							<Input
								bind:value={staff.text.value}
								bind:isValid={staff.text.isValid}
								placeholder={'Personel Tanımı'}
								required={false}
							/>
						</div>
					</div>
				</div>

				<div class="flex flex-wrap justify-end">
					<div class="w-full lg:w-2/12 px-4 text-right mt-2">
						<button
							disabled={!staff.lang.isValid}
							class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => addStaff()}
						>
							Kaydet
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
