<script>
  export let message = null;
  export let answer = () => {};
</script>

<div class="text-center">
  {message}
</div>

<div class="w-full flex flex-row justify-center items-center text-center gap-4 mt-4">
  <button
    on:click={answer(true)}
    class="bg-green-500 hover:bg-green-600 text-white font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
    type="button"
  >
    Onayla
  </button>
  <button
    on:click={answer(false)}
    class="bg-red-500 hover:bg-red-600 text-white font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none"
    type="button"
  >
    İptal
  </button>
</div>
