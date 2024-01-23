<script>
	import { goto } from '$app/navigation';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import RestService from '$services/rest';
	import ToastService from '$services/toast';
	import Image from '$src/lib/components/Form/Image.svelte';
	import Switch from '$src/lib/components/Form/Switch.svelte';
	import TextEditor from '$src/lib/components/Form/TextEditor.svelte';
	import Date from '$src/lib/components/Form/Date.svelte';

	let langs;
	const getLangs = async () => {
		let response = await RestService.getLanguages(undefined, undefined);
		langs = response['languages'];
	};
	let blogCats;
	const getBlogCats = async () => {
		let response = await RestService.getBlogCats(undefined, undefined);
		blogCats = response['blogCats'];
	};
	getBlogCats();
	let treatments;
	const getTreatments = async () => {
		let response = await RestService.getTreatments(undefined, undefined);
		treatments = response['treatments'];
	};
	getTreatments();

	getLangs();
	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'blogCat', customValue: null },
		{ key: 'treatment', customValue: null },
		{ key: 'date', customValue: null },
		{ key: 'order', customValue: null },
		{ key: 'blogHeader', customValue: null },
		{ key: 'blogshortDesc', customValue: null },
		{ key: 'text', customValue: null },
		{ key: 'textId', customValue: null },
		{ key: 'text2', customValue: null },
		{ key: 'text2Id', customValue: null },
		{ key: 'text3', customValue: null },
		{ key: 'text3Id', customValue: null },
		{ key: 'blogThumb', customValue: null },
		{ key: 'blogImage', customValue: null },
		{ key: 'homePage', customValue: null },
		{ key: 'perma', customValue: null },
		{ key: 'blogContactLink', customValue: null }
	];

	const addBlog = async () => {
		let data = {};
		values.map((v) => {
			data[v.key] = blog[v.key]?.value;
		});

		let response = await RestService.addBlog(data);
		if (response['status']) {
			ToastService.success('Başarıyla Kayıt Edildi');
			goto('/panel/blog');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	let blog = {};

	values.map((v) => {
		if (v.defaultValue) {
			blog[v.key] = { value: v.defaultValue };
		} else {
			blog[v.key] = {};
		}
	});
</script>

<div class="flex flex-wrap mt-4 h-screen relative">
	<div class="w-full mb-12 px-2 lg:px-4 ">
		<button
			class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
			type="button"
			on:click={() => {
				goto('/panel/blog');
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
					<h3 class="font-semibold text-lg text-blueGray-700">Blog Ekle</h3>
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
									bind:value={blog.lang.value}
									bind:isValid={blog.lang.isValid}
									values={langs}
									title={'Dil Seçin'}
									valuesKey={'lang'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
								/>
							{/if}
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4">
						<div class="relative w-full mb-3 flex flex-col items-center">
							<label
								class="block pb-1 text-blueGray-600 text-xs font-bold mb-2"
								for="rectangleBanner"
							>
								Anasayfa mı?
							</label>

							<Switch bind:value={blog.homePage.value} />
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Kategorisi
							</label>
							{#if blogCats}
								<Select
									bind:value={blog.blogCat.value}
									bind:isValid={blog.blogCat.isValid}
									values={blogCats}
									title={'Kategori Seçin'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
								/>
							{/if}
						</div>
					</div>

					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Tedavi (Var ise)
							</label>
							{#if treatments}
								<Select
									bind:value={blog.treatment.value}
									bind:isValid={blog.treatment.isValid}
									values={treatments}
									title={'Tedavi Seçin'}
									valuesKey={'_id'}
									valuesTitleKey={'name'}
									customClass={'w-full'}
								/>
							{/if}
						</div>
					</div>

					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Tarih
							</label>
							<Date
								bind:value={blog.date.value}
								bind:isValid={blog.date.isValid}
								placeholder={'Tarih'}
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
								bind:value={blog.perma.value}
								bind:isValid={blog.perma.isValid}
								placeholder={'face-lifting'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-2/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Sıra
							</label>
							<Input
								bind:value={blog.order.value}
								bind:isValid={blog.order.isValid}
								placeholder={'Sıra'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Başlığı Max 50 ({blog?.blogHeader?.value?.length
									? blog?.blogHeader?.value?.length
									: 0})
							</label>
							<Input
								bind:value={blog.blogHeader.value}
								bind:isValid={blog.blogHeader.isValid}
								placeholder={'Blog Başlığı 50 Karakter'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-7/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Kısa Açıklası Max 150 ({blog?.blogshortDesc?.value?.length
									? blog?.blogshortDesc?.value?.length
									: 0})
							</label>
							<Input
								bind:value={blog.blogshortDesc.value}
								bind:isValid={blog.blogshortDesc.isValid}
								placeholder={'Blog Açıklaması 150 Karakter'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Sonu Link Yazısı
							</label>
							<Input
								bind:value={blog.blogContactLink.value}
								bind:isValid={blog.blogContactLink.isValid}
								placeholder={'Blog Sonu Link Yazısı'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-6/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Metin 1 Başlık
							</label>
							<Input
								bind:value={blog.textId.value}
								bind:isValid={blog.textId.isValid}
								placeholder={'Link Başlığı'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Metni 1
							</label>
							<TextEditor
								bind:value={blog.text.value}
								bind:incomingValue={blog.text.value}
								placeholder={'Metin Giriniz'}
							/>
						</div>
					</div>
					<div class="w-full lg:w-6/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Metin 2 Başlık
							</label>
							<Input
								bind:value={blog.text2Id.value}
								bind:isValid={blog.text2Id.isValid}
								placeholder={'Link Başlığı'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Metni 2
							</label>
							<TextEditor
								bind:value={blog.text2.value}
								bind:incomingValue={blog.text2.value}
								placeholder={'Metin Giriniz'}
							/>
						</div>
					</div>
					<div class="w-full lg:w-6/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Metin 2 Başlık
							</label>
							<Input
								bind:value={blog.text3Id.value}
								bind:isValid={blog.text3Id.isValid}
								placeholder={'Link Başlığı'}
								required={false}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 self-center">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Metni 3
							</label>
							<TextEditor
								bind:value={blog.text3.value}
								bind:incomingValue={blog.text3.value}
								placeholder={'Metin Giriniz'}
							/>
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Thumb Resim (678x544)
							</label>
							<Image bind:value={blog.blogThumb.value} bind:isValid={blog.blogThumb.isValid} />
						</div>
					</div>
					<div class="w-full lg:w-3/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Blog Büyük Resim (1024x728)
							</label>
							<Image bind:value={blog.blogImage.value} bind:isValid={blog.blogImage.isValid} />
						</div>
					</div>
				</div>

				<div class="flex flex-wrap justify-right">
					<div class="w-full lg:w-12/12 px-4 text-right mt-2">
						<button
							disabled={!blog.lang.isValid}
							class="bg-green-500 disabled:bg-red-300 text-white active:bg-bred-400 font-bold  text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 "
							type="button"
							on:click={() => addBlog()}
						>
							Kaydet
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
