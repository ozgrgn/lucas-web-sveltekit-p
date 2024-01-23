<script>
	import { onDestroy } from 'svelte';
	import { createFieldValidator } from '../Validators/validation.js';
	import { requiredValidator } from '../Validators/validator.js';
	export let value = 0;
	export let isValid = undefined;
	export let required = undefined;
	export let disabled = undefined;
	export let placeholder = 'Please type something';
	export let customClass = '';
	export let label = undefined;
	export let change = () => {};
	export let input = () => {};
	if (value == 0) {
		value = undefined;
	}
	let validate, validity;

	let validations = [];

	if (required) {
		validations = [...validations, requiredValidator()];
	}

	[validity, validate] = createFieldValidator(...validations);

	const validityUnsub = validity.subscribe((_validity) => {
		isValid = _validity.valid;
	});

	onDestroy(validityUnsub);
</script>

<div class="relative noButton group">
	<input
		class="appearance-none text-black/90  placeholder:blueGray-200 placeholder:font-normal px-3  bg-white rounded text-md shadow  group-hover:border-secondary  focus:outline-0    {customClass} disabled:bg-slate-100"
		type="number"
		bind:value
		{placeholder}
		class:field-danger={!$validity.valid}
		class:field-success={$validity.valid}
		use:validate={value}
		on:change={change(value)}
		on:input={input(value)}
		min="0"
		{disabled}
	/>

	{#if label}
		<div class="absolute bottom-8 ml-2 px-1 bg-white text-xs text-black/50 group-hover:text-secondary">
			{label}
		</div>
	{/if}
</div>

<style>
	:global(.noButton > input::-webkit-outer-spin-button, input::-webkit-inner-spin-button) {
		-webkit-appearance: none !important;
		-moz-appearance: none !important;
		appearance: none !important;
	}
</style>
