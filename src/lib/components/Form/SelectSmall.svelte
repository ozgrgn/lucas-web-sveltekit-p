<script>
	import { onDestroy } from 'svelte';
	import { TranslateApiMessage } from '$services/language';
	import { createFieldValidator } from '../Validators/validation.js';
	import { requiredValidator } from '../Validators/validator.js';
	export let value = null;
	export let isUnit = false;
	export let values = undefined;
	export let valuesKey = undefined;
	export let valuesTitleKey = undefined;
	export let valuesTitleKeySub = undefined;
	export let secondTitleKey = undefined;
	export let title = '';
	export let change = () => {};
	export let customClass = '';
	export let isValid = undefined;
	export let required = undefined;
	export let disabled = undefined;
	export let label = undefined;
	let validate, validity;

	let validations = [];

	if (required) {
		validations = [...validations, requiredValidator()];
	}

	[validity, validate] = createFieldValidator(...validations);

	const validityUnsub = validity.subscribe((_validity) => {
		if (value && value == null) {
			isValid = false;
		} else {
			isValid = _validity.valid;
		}
	});

	onDestroy(validityUnsub);
</script>

<div class="relative group">
	<select
		class=" px-2 h-10 placeholder-black/50 disabled:bg-white disabled: placeholder-black/20 text-black {value !=
		undefined
			? 'font-normal'
			: 'font-normal text-black/40'} customPanel  rounded  shadow group-hover:border-secondary  focus:outline-0  {customClass}  disabled:bg-slate-100"
		class:field-danger={!$validity.valid}
		class:field-success={$validity.valid}
		use:validate={value}
		bind:value
		{disabled}
		on:change={change(value)}
	>
		<option value={null}>{title}</option>
		{#each values as _value}
			<option value={_value[valuesKey]}>
				{#if valuesTitleKeySub}
					{_value[valuesTitleKey][valuesTitleKeySub]}
				{:else if isUnit && _value['number']}
					{_value[valuesTitleKey] + ' (' + _value['number'] + ')'}
				{:else}{_value[valuesTitleKey]}
					{#if secondTitleKey}
						- {_value[secondTitleKey]}
					{/if}
				{/if}
			</option>
		{/each}
	</select>
	{#if label}
		<div
			class="absolute bottom-8 md:bottom-8 z-30 ml-2 px-1 bg-white text-xs text-black/50 group-hover:text-secondary {value?"text-secondary":""}"
		>
			{label}
		</div>
	{/if}
	{#if $validity.dirty && !$validity.valid}
		<span class="text-primary text-xs">
			{$TranslateApiMessage($validity.message)}
		</span>
	{/if}
</div>

<style>
	:global(.panel .customPanel) {
		font-weight: 600 !important;
	}
</style>
