<script>
	import { goto } from '$app/navigation';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import RestService from '$services/rest';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';
	import TextEditor from '$src/lib/components/Form/TextEditor.svelte';

	let langs;
	const getLangs = async () => {
		let response = await RestService.getLanguages(undefined, undefined);
		
		langs = response['languages'];
	};
	getLangs();
	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'text1', customValue: null },
		{ key: 'text2', customValue: null },
		{ key: 'staffText', customValue: null },
		{ key: 'metaTitle', customValue: null },
		{ key: 'metaDescription', customValue: null },
		{ key: 'image1', customValue: null },
		{ key: 'image2', customValue: null }
	];

	const addAboutUs = async () => {
		let data = {};
		values.map((v) => {
			data[v.key] = aboutUs[v.key]?.value;
		});

		let response = await RestService.addAboutUs(data);
		if (response['status']) {
			ToastService.success('Başarıyla Kayıt Edildi');
			goto('/panel/aboutUs');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	let aboutUs = {};

	values.map((v) => {
		if (v.defaultValue) {
			aboutUs[v.key] = { value: v.defaultValue };
		} else {
			aboutUs[v.key] = {};
		}
	});
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/aboutUs');
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
					<h3 class="font-semibold text-lg text-blueGray-700">Hakkımızda Sayfası Ekle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							{#if langs}
								<Select
									bind:value={aboutUs.lang.value}
									bind:isValid={aboutUs.lang.isValid}
									values={langs}
									title={'Dil Seçin'}
									valuesKey={'lang'}
									valuesTitleKey={'name'}
									customClass={'w-full h-9'}
								/>
							{/if}
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Hakkımızda Text 
							</label>
							<TextEditor placeholder={'Üst Text'} bind:value={aboutUs.text1.value} />
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Ekibimiz Text
							</label>
							<TextEditor
								bind:value={aboutUs.text2.value}
								placeholder={'Alt Text'}
								required={false}
							/>
						</div>
					</div>

					
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Meta Başlığı Max 50 ({aboutUs?.metaTitle?.value?.length
									? aboutUs?.metaTitle?.value?.length
									: 0})
							</label>
							<Input
								bind:value={aboutUs.metaTitle.value}
								bind:isValid={aboutUs.metaTitle.isValid}
								placeholder={'Hakkımızda sayfası Meta Başlığı 50 Karakter'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-8/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Meta Açıklası Max 150 ({aboutUs?.metaDescription?.value?.length
									? aboutUs?.metaDescription?.value?.length
									: 0})
							</label>
							<Input
								bind:value={aboutUs.metaDescription.value}
								bind:isValid={aboutUs.metaDescription.isValid}
								placeholder={'Hakkımızda Sayfası Meta Açıklaması 150 Karakter'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-6/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Hakkımızda Resim  (560x500)
							</label>
							<Image bind:value={aboutUs.image1.value} bind:isValid={aboutUs.image1.isValid} />
						</div>
					</div>
				
				</div>

				<div class="flex flex-wrap">
					<div class="w-full lg:w-12/12 px-4 text-right mt-2">
						<button
							disabled={!aboutUs.lang.isValid}
							class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => addAboutUs()}
						>
							Kaydet
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
