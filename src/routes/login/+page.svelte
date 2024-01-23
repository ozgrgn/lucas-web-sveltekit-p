<script>
	import '$src/app.css';
	import { goto } from '$app/navigation';
	import Input from '$components/Form/Input.svelte';
	import PasswordInput from '$components/Form/PasswordInput.svelte';

	import RestService from '$services/rest';
	import ToastService from '$services/toast';
	let emailFromInput;
	let password;

	let emailFromInputIsValid;
	let passwordIsValid;

	const login = async () => {
		let response = await RestService.login(emailFromInput, password);
		if (response && response.status) {
			goto('/panel');
			ToastService.success('İşlem başarılı');
		} else {
			console.log('eerrro', response);
			ToastService.error(response.message);
		}
	};
</script>

<div
	class="w-full h-full bg-gray-700 bg-no-repeat bg-full h-screen text-white flex"
	style="background-image: url('/assets/img/register_bg_2.png');"
>
	<div class="container mx-auto px-4 ">
		<div class="flex content-center items-center justify-center h-full ">
			<div class="w-full lg:w-4/12">
				<div
					class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 bg-gray-600"
				>
					<div class="rounded-t mb-0 px-6 py-6">
						<div class="text-center mb-3">
							<h6 class="text-blueGray-500 text-sm font-bold">Giriş yap</h6>
						</div>

						<hr class="mt-6 border-b-1 border-blueGray-300" />
					</div>
					<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
						<div class="relative w-full mb-3">
							<label class="block  text-blueGray-600 text-xs font-bold mb-2" for="grid-email">
								E-posta
							</label>

							<Input
								bind:value={emailFromInput}
								bind:isValid={emailFromInputIsValid}
								placeholder={'E-posta'}
								customClass={'text-black h-9'}
								required={true}
								type={'email'}
							/>
						</div>

						<div class="relative w-full mb-3">
							<label class="block  text-blueGray-600 text-xs font-bold mb-2" for="grid-password">
								Şifre
							</label>

							<PasswordInput
								bind:value={password}
								bind:isValid={passwordIsValid}
								placeholder={'Şifreniz'}
								customClass={'text-black'}
								required={true}
							/>
						</div>
						<div>
							<label class="inline-flex items-center cursor-pointer">
								<input
									id="customCheckLogin"
									type="checkbox"
									class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 "
								/>
								<span class="ml-2 text-sm font-semibold text-blueGray-600"> Beni hatırla </span>
							</label>
						</div>

						<div class="text-center mt-6">
							<button
								on:click|preventDefault={login}
								disabled={!emailFromInputIsValid || !passwordIsValid}
								class="disabled:bg-green-400 bg-green-600 text-white active:bg-blueGray-600 text-sm font-bold  px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full "
								type="button"
							>
								Giriş yap
							</button>
						</div>
					</div>
				</div>
				<div class="flex flex-wrap mt-6 relative">
					<div class="w-1/2">
						<a href="#pablo" on:click={(e) => e.preventDefault()} class="text-blueGray-200">
							<small> Şifremi unuttum</small>
						</a>
					</div>
					<!-- <div class="w-1/2 text-right">
              <a use:link href="/auth/register" class="text-blueGray-200">
                <small>Create new account</small>
              </a>
            </div> -->
				</div>
			</div>
		</div>
	</div>
</div>
