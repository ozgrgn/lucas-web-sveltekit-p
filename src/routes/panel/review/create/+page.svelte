<script>
	import { goto } from '$app/navigation';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import RestService from '$services/rest';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';
	import Switch from '$src/lib/components/Form/Switch.svelte';
	import Textarea from '$src/lib/components/Form/Textarea.svelte';
	let treatmentGroups = [{ _id: '63f099457aa8dea2e50618fe' }, { _id: '63f099457aa8dea2e50618f2' }];
	let treatments = [{ _id: '63f099457aa8dea2e50618fe' }, { _id: '63f099457aa8dea2e50618f1' }];
	let platform = [{ key: 'Google' }, { key: 'TrustPilot' }];

	let langs;
	const getLangs = async () => {
		let response = await RestService.getLanguages(undefined, undefined);
		langs = response['languages'];
	};
	getLangs();
	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'reviewName', customValue: null },
		{ key: 'reviewDate', customValue: null },
		{ key: 'reviewPlatform', customValue: null },
		{ key: 'reviewText', customValue: null },
		{ key: 'reviewStars', customValue: null },
		{ key: 'reviewLink', customValue: null },
		{ key: 'reviewAvatar', customValue: null },
		{ key: 'order', customValue: null }
	];

	const addReview = async () => {
		let data = {};
		values.map((v) => {
			data[v.key] = review[v.key]?.value;
		});

		let response = await RestService.addReview(data);
		if (response['status']) {
			ToastService.success('Başarıyla Kayıt Edildi');
			goto('/panel/review');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	let review = {};

	values.map((v) => {
		if (v.defaultValue) {
			review[v.key] = { value: v.defaultValue };
		} else {
			review[v.key] = {};
		}
	});
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/review');
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
					<h3 class="font-semibold text-lg text-blueGray-700">Yorum Ekle</h3>
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
									bind:value={review.lang.value}
									bind:isValid={review.lang.isValid}
									values={langs}
									title={'Dil Seçin'}
									valuesKey={'lang'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
								/>
							{/if}
						</div>
					</div>

					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Sıra
							</label>
							<Input
								bind:value={review.order.value}
								bind:isValid={review.order.isValid}
								placeholder={'Sıra'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Tarih
							</label>
							<Input
								bind:value={review.reviewDate.value}
								bind:isValid={review.reviewDate.isValid}
								placeholder={'Tarih'}
								required={false}
							/>
						</div>
					</div>

					<div class="w-full lg:w-3/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Yorum Platformu
							</label>
							<Select
								bind:value={review.reviewPlatform.value}
								bind:isValid={review.reviewPlatform.isValid}
								values={platform}
								title={'Platform Seçin'}
								valuesKey={'key'}
								valuesTitleKey={'key'}
								customClass={'w-full'}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Puan
							</label>
							<Select
								bind:value={review.reviewStars.value}
								bind:isValid={review.reviewStars.isValid}
								values={[{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }]}
								title={'Yorum Puanı'}
								valuesKey={'key'}
								valuesTitleKey={'key'}
								customClass={'w-full'}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Yorum Yapan Kişi
							</label>
							<Input
								bind:value={review.reviewName.value}
								bind:isValid={review.reviewName.isValid}
								placeholder={'Kişi İsmi'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Yorum Linki
							</label>
							<Input
								bind:value={review.reviewLink.value}
								bind:isValid={review.reviewLink.isValid}
								placeholder={'Yorum Linki'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Avatar (44x44)
							</label>
							<Image
								bind:value={review.reviewAvatar.value}
								
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Yorum Metni
							</label>
							<Textarea
								bind:value={review.reviewText.value}
								bind:isValid={review.reviewText.isValid}
								placeholder={'Yorum Metni'}
								required={false}
							/>
						</div>
					</div>
				</div>

				<div class="flex flex-wrap justify-end">
					<div class="w-full lg:w-2/12 px-4 text-right mt-2">
						<button
							disabled={!review.lang.isValid}
							class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => addReview()}
						>
							Kaydet
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
