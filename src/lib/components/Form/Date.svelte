<script>
  import { DateInput } from "date-picker-svelte";

  
export let disabled
  import moment from "moment";
  export let value;
  if (value) {
    value = moment(value).second(0).millisecond(0).toDate();
  }
  export let placeholder = "Tarih seçiniz";
</script>

<DateInput
  closeOnSelection={true}
  {placeholder}
  format="dd.MM.yyyy"
{disabled}
  bind:value
  class="input h-8 rounded bg-white h-full border-0 px-2 h- placeholder-blueGray-300 text-blueGray-600  rounded text-sm shadow  focus:outline-1 focus:outline-secondary w-full disabled:bg-slate-100"

/>

<style>
  :global(.date-time-field input) {
    width: 100% !important;
    height: 2.3rem;
    font-weight: 400;
    font-size: 0.9rem;
    border: none !important;
    box-shadow: 0px 1px 3px -1px rgb(0 0 0 / 0.3);
    font-weight:600 !important;

  }
  :global(.date-time-field > input:focus) {
    outline: none !important;

    border: 1px solid #65bdc3 !important;
  }
</style>