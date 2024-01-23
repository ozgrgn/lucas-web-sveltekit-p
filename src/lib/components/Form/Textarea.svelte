<script>
  import { onDestroy } from "svelte";
  import { createFieldValidator } from "../Validators/validation.js";
  import { requiredValidator } from "../Validators/validator.js";
  export let value;
  export let isValid;
  export let required;
  export let customClass;

  export let label;
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

<textarea
class="p-2 pt-4 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow  group-hover:border-secondary  focus:outline-0  w-full {customClass} disabled:bg-slate-100"
bind:value

  class:field-danger={!$validity.valid}
  class:field-success={$validity.valid}
  use:validate={value}
/>

{#if label}
<div class="absolute -top-[0.4rem] ml-2 px-1 bg-white text-xs text-black/50 group-hover:text-secondary">
  {label}
</div>
{/if}
</div>