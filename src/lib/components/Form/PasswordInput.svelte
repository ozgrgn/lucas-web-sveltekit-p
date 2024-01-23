<script>
  import { requiredValidator } from "../Validators/validator.js";
  import { TranslateApiMessage } from "$services/language";
  import { createFieldValidator } from "../Validators/validation.js";
  import { onDestroy } from "svelte";
  export let value;
  export let isValid;
  export let required;
  export let customClass = '';
  export let placeholder = "Please type something";
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

<input
  class="border-0 px-2 h-9 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full  {customClass}"
  type="password"
  bind:value
  {placeholder}
  class:field-danger={!$validity.valid}
  class:field-success={$validity.valid}
  use:validate={value}
/>

{#if $validity.dirty && !$validity.valid}
  <span class="text-red-600 text-xs">
    {$TranslateApiMessage($validity.message)}
  </span>
{/if}
