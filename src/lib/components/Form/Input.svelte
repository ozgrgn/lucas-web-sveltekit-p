<script>
	import { emailValidator, requiredValidator, lengthValidator } from '../Validators/validator.js';
	import { createFieldValidator } from '../Validators/validation.js';
	import { TranslateApiMessage } from '$services/language';

	import { onDestroy } from 'svelte';
	export let value = undefined;
	export let isValid = undefined;
	export let required = undefined;
	export let type = undefined;
	export let disabled = undefined;
	export let autocomplete = undefined;
	export let minLength = null;
	export let maxLength;
	export let label;
	export let placeholder = 'Please type something';
	export let customClass = '';
	export let change = () => {};
	export let input = () => {};
	let validate, validity;

	let validations = [];

	if (required) {
		validations = [...validations, requiredValidator()];
	}

	if (type && type == 'email') {
		validations = [...validations, emailValidator()];
	}
	[validity, validate] = createFieldValidator(...validations);

	if (minLength || maxLength) {
		validations = [...validations, lengthValidator(minLength, maxLength)];
	}
	const validityUnsub = validity.subscribe((_validity) => {
		isValid = _validity.valid;
	});

	onDestroy(validityUnsub);
</script>
<div class="relative noButton group h-9">

<input
	class=" px-2 placeholder:text-md  shadow placeholder-blueGray-300 text-blueGray-600 placeholder:font-normal  bg-white rounded text-md shadow group-hover:border-secondary  focus:outline-0 w-full {customClass} {customClass?"":"h-9 text-sm"} disabled:bg-slate-100"
	type="text"
	bind:value
	{placeholder}
	on:change={change(value)}
	on:input={input(value)}
	class:field-danger={!$validity.valid}
	class:field-success={$validity.valid}
	use:validate={value}
	{disabled}
	{autocomplete}
/>
{#if label}
<div class="absolute bottom-7 ml-2 px-1 bg-white text-xs text-black/50 group-hover:text-secondary">
	{label}
</div>
{/if}
</div>

{#if $validity.dirty && !$validity.valid}
	<div class="absolute pt-1 w-full text-center flex justify-center items-end">
		<span class="text-red-600 text-sm text-center">
			{$TranslateApiMessage($validity.message)}
		</span>
	</div>
{/if}
