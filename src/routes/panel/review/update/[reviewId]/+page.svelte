<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';
	import Textarea from '$src/lib/components/Form/Textarea.svelte';
	import Switch from '$src/lib/components/Form/Switch.svelte';
	let platform = [{ key: 'Google' }, { key: 'TrustPilot' }];

	const deleteReviewApprove = (reviewId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteReview(reviewId);
					}
					modal.set(null);
				}
			})
		);
	};
	let langs;
	const getLangs = async () => {
		let response = await RestService.getLanguages(undefined, undefined);
		langs = response['languages'];
	};
	getLangs();
	export let data;

	let review;

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

	const updateReview = async () => {
		let editedReview = {};
		values.map((v) => {
			editedReview[v.key] = review[v.key].value;
			console.log(editedReview[v.key]);
		});

		let response = await RestService.updateReview(review._id, editedReview);
		if (response['status']) {
			ToastService.success('Kayıt Başarılı');
			goto('/panel/review');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getReview = async () => {
		let response = await RestService.getReview(data.reviewId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['review'][v.key] = {
						value: response['review'][v.key][v.customValue]
					};
				} else {
					response['review'][v.key] = { value: response['review'][v.key] };
				}
			});
			review = {
				...response['review']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getReview();

	const deleteReview = async (reviewId) => {
		let response = await RestService.deleteReview(reviewId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/review');
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
					goto('/panel/review');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteReviewApprove(data.reviewId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Yorum güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if review}
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
								<Image bind:value={review.reviewAvatar.value} />
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
					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateReview()}
								disabled={!review.lang.isValid}
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
