<script>
      import { panelDrawer } from "$services/store";
      let innerWidth;
  let oldInnerWidth;
  export let icon=undefined;
  export let title=undefined;
  export let href=undefined;
  export let closePanel = undefined;
</script>

<a
on:click={() => (closePanel || innerWidth<=820 ? panelDrawer.set(false) : "")}

  {href}
  class="bg-base-100 h-[1.3rem] rounded text-sm text-black flex items-center px-1 gap-2 cursor-pointer"
>
  <i class="text-md  {icon}"></i>
  {title}
</a>
