<script>
    import { onDestroy } from "svelte";
    import { TranslateApiMessage } from "$services/language";
    import { createFieldValidator } from "../Validators/validation.js";
    import { requiredValidator } from "../Validators/validator.js";
    export let value;
    export let values;
    export let valuesKey;
    export let valuesTitleKey;
    export let change = () => {};
    export let customClass = "";
    export let isValid;
    export let required;
  
    let validate, validity;
  
    let validations = [];
  
    if (required) {
      validations = [...validations, requiredValidator()];
    }
  
    [validity, validate] = createFieldValidator(...validations);
  
    const validityUnsub = validity.subscribe((_validity) => {
      if (value && value == "disabled") {
        isValid = false;
      } else {
        isValid = _validity.valid;
      }
    });
  
    onDestroy(validityUnsub);
  </script>
  
  <select
    class="{customClass
      ? ''
      : 'border-0'} rounded shadow ease-linear focus:ring-0  transition-all duration-150 h-9 {customClass} "
    class:field-danger={!$validity.valid}
    class:field-success={$validity.valid}
    use:validate={value}
    bind:value
    on:change={change(value)}
  >
    
    {#each values as _value}
      <option value={_value[valuesKey]}>{_value[valuesTitleKey]}</option>
    {/each}
  </select>
  
  {#if $validity.dirty && !$validity.valid}
    <span class="text-red-500 text-xs">
      {$TranslateApiMessage($validity.message)}
    </span>
  {/if}
  
  <style>
    select {
      background-image: none;
    }
  </style>
  