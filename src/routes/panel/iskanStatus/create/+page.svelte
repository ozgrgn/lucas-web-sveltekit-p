<script>
	import { goto } from '$app/navigation';
	import Input from '$src/lib/components/Form/Input.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import RestService from '$services/rest';
	import ToastService from '$services/toast';
	import NumberInput from '$src/lib/components/Form/NumberInput.svelte';

	let name = { tr: {}, en: {}, ru: {} };
	let order;
	let isActive;

	const addIskanStatus = async () => {
		let data = {
			name: { tr: name['tr'].value, en: name['en'].value, ru: name['ru'].value },
			order: order,
			isActive: isActive
		};

		let response = await RestService.addIskanStatus(data);
		if (response['status']) {
			ToastService.success('Başarıyla Kayıt Edildi');
			goto('/panel/iskanStatus');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/iskanStatus');
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
					<h3 class="font-semibold text-lg text-blueGray-700">İskan Durumu Ekle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-12/12 self-center">
						<div class="relative w-full mb-3 lg:w-2/12 px-4">
							<label class="block text-blueGray-600 text-sm font-bold mb-2" for="grid-name">
								Sıra
							</label>
							<NumberInput
								bind:value={order}
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
								bind:value={name['tr'].value}
								bind:isValid={name['tr'].isValid}
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
								bind:value={name['en'].value}
								bind:isValid={name['en'].isValid}
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
								bind:value={name['ru'].value}
								bind:isValid={name['ru'].isValid}
								placeholder={'İsim Rusça'}
								required={false}
							/>
						</div>
					</div>
				</div>
				<div class="flex flex-wrap">
					<div class="w-full lg:w-12/12 px-4 text-right mt-2">
						<button
							disabled={!name['tr'].isValid}
							class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-sm px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => addIskanStatus()}
						>
							Kaydet
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
