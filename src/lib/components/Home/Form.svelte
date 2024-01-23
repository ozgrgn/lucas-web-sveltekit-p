<script>
	import GenericButton from '../Buttons/GenericButton.svelte';
	import RestService from '$services/rest';
	import Input from '../Form/Input.svelte';
	import NumberInput from '../Form/NumberInput.svelte';
	import PhoneInput from '../Form/PhoneInput.svelte';
	import Select from '../Form/Select.svelte';
	import Textarea from '../Form/Textarea.svelte';
	import { lang, translate } from '$services/store';

	export let messageSize;
	let formStatus = false;
	let warn = false;
	let loading = false;
	let fullName;
	let fullNameisValid;
	let phone;
	let phoneIsValid;
	let dialCode;
	let messageIsValid;
	let message;
	const addForm = async () => {
		if (!fullName || !phone) {
			warn = true;
			return;
		}
		loading = true;
		phone = dialCode + phone.replace(/\s/g, '');
		let getMailResponse = await RestService.sendMail($lang, fullName, phone, undefined, message);

		if (getMailResponse['status']) {
			console.log(getMailResponse, 'getMailResponse');
			warn = false;
			formStatus = true;
			loading = false;
		} else {
			console.log(getMailResponse['message']);
			loading = false;
		}
	};
</script>

<div
	class="  relative h-full bg-white/20 rounded-t w-full h-36 text-black border-secondary  shadow border-t border-t-4 p-4 z-20 "
>
	<div class="flex flex-col gap-4 pt-4 w-full z-20">
		<div class="">
			<Input
				bind:value={fullName}
				bind:isValid={fullNameisValid}
				label={$translate?.yourName}
				placeholder={$translate?.yourName}
				customClass={'w-full h-12 bg-white/20 border border-black/30 text-black/50 py-1 lg:mx-0 '}
			/>
		</div>
		<div class="pt-4">
			<PhoneInput
				bind:value={phone}
				bind:isValid={phoneIsValid}
				bind:dialCode
				type="text"
				name="name"
				placeholder={$translate?.yourPhone}
				autocomplete="phone"
				label={$translate?.yourPhone}
				customClass={'w-full h-12 bg-white/20 border border-black/30 text-black/50 py-1 lg:mx-0 '}
			/>
		</div>
		<div class="">
			<Textarea
				bind:value={message}
				bind:isValid={messageIsValid}
				label={$translate?.yourMessage}
				placeholder={$translate?.yourMessage}
				customClass="w-full bg-white/20 border border-black/30 text-black/50 py-1 lg:mx-0 {messageSize
					? messageSize
					: 'h-24'}"
			/>
		</div>
	</div>

	<div class="flex justify-center pt-5 gap-2">
		<GenericButton
			customClass="px-2 py-1 text-sm rounded shadow bg-primary text-white"
			buttonText="Gönder"
			handleClick={() => {
				addForm();
			}}
		/>
	</div>
</div>
