<script>
    export let handleClick = () => {};
  export let disabled;
    export let buttonText;
    export let customClass;
    export let icon;
  </script>
  
  <button
    on:click={() => {
      handleClick();
    }}
    class="{customClass}"
    {disabled}
    >
    <i class="{icon}"></i>
    {buttonText}
    
    
  </button>
  