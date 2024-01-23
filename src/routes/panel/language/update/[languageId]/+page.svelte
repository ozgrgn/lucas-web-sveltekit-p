<script>
	import { goto } from '$app/navigation';
	import RestService from '$services/rest';
	import Input from '$src/lib/components/Form/Input.svelte';
	import Select from '$src/lib/components/Form/Select.svelte';
	import { TranslateApiMessage, Translate } from '$services/language';
	import ToastService from '$services/toast';

	const deleteLanguageApprove = (languageId) => {
		modal.set(
			bind(Alert, {
				message: 'Bu işlemi onaylıyor musunuz ?',
				answer: (message) => {
					if (message) {
						deleteLanguage(languageId);
					}
					modal.set(null);
				}
			})
		);
	};
	  let langs; const getLangs = async () => {
    let response = await RestService.getLanguages(undefined, undefined);
    langs = response["languages"];
  };
  getLangs();	export let data;
	

	let language;

	let values = [
		{ key: 'lang', customValue: null },
		{ key: 'name', customValue: null },
	];


	const updateLanguage = async () => {
		let editedLanguage = {};

		values.map((v) => {
			editedLanguage[v.key] = language[v.key].value;
		});

		let response = await RestService.updateLanguage(language._id, editedLanguage);
		if (response['status']) {
			ToastService.success("Kayıt Başarılı");
			goto('/panel/language');
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	const getLanguage = async () => {
		let response = await RestService.getLanguage(data.languageId);

		if (response['status']) {
			values.map((v) => {
				if (v.customValue) {
					response['language'][v.key] = {
						value: response['language'][v.key][v.customValue]
					};
				} else {
					response['language'][v.key] = { value: response['language'][v.key] };
				}
			});
			language = {
				...response['language']
			};
		} else {
			ToastService.error($TranslateApiMessage(response.message));
		}
	};

	getLanguage();

	const deleteLanguage = async (languageId) => {
		let response = await RestService.deleteLanguage(languageId);
		if (response['status']) {
			ToastService.success('İşlem başarılı');
			navigate('/panel/language');
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
					goto('/panel/language');
				}}
			>
				<i class="fa fa-arrow-left" />
				Geri
			</button>

			<button
				class="bg-white text-primary hover:text-red-700 mb-2 border rounded font-bold text-xs px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 "
				type="button"
				on:click={() => deleteLanguageApprove(data.languageId)}
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
					<h3 class="font-semibold text-lg text-blueGray-700">Dil güncelle</h3>
				</div>
			</div>
			<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
				{#if language}
				<div class="flex flex-wrap my-4">
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								Dil
							</label>
							<Input
								bind:value={language.lang.value}
								bind:isValid={language.lang.isValid}
								placeholder={'Dil kısaltması (en)'}
								required={true}
							/>
						</div>
					</div>
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label class="block text-blueGray-600 text-xs font-bold mb-2" for="grid-name">
								İsim
							</label>
							<Input
								bind:value={language.name.value}
								bind:isValid={language.name.isValid}
								placeholder={'Dil İsmi (English)'}
								required={true}
							/>
						</div>
					</div>

				
				</div>

					<div class="flex flex-wrap">
						<div class="w-full lg:w-12/12 px-4 text-right mt-5">
							<button
								on:click={() => updateLanguage()}
								disabled={!language.lang.isValid ||
									!language.name.isValid}
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
