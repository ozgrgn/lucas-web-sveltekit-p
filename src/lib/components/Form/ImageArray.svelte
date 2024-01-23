<script>
  import RestService from "$services/rest";
  import Loading from "../Loading.svelte";
  export let value;
  export let isValid;
  let loading;
  let fileinput;

  if (value) {
    isValid = true;
  }
  const onFileSelected = async (e) => {
    let image = e.target.files[0];
    loading = true;
    try {
      let uploadedImage = await RestService.uploadImage(image);

      value = uploadedImage["file"];
      isValid = true;
    } catch (error) {
      isValid = false;
      console.log("image upload error", error.message);
    }
    loading = false;
  };
</script>

<div class="flex w-full justify-between items-center ">
  <img
    class="h-10 object-cover"
    src="/assets/img/625182-200.png"
    alt=""
    on:click={() => {
      fileinput.click();
    }}
  />

  {#if !loading}
    <div class="w-24 flex justify-center">
      <img class="h-12 rounded object-cover" src={value} alt="" />
    </div>
  {/if}

  {#if loading}
    <Loading />
  {/if}

  <input
    style="display:none"
    type="file"
    accept=".jpg, .jpeg, .png"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileinput}
  />
</div>
