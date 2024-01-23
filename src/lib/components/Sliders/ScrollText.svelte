<script>
  export let text;
</script>
<div class="text-white/20 w-full text-[8rem]">

<p class="marquee w-full leading-0">
    <span>{text}</span>
  </p>

</div>

<style>
    .marquee {
  margin: 0 auto;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
}

.marquee span {
    line-height: 200px;
  display: inline-block;
  padding-left: 100%;
  animation: marquee 15s linear infinite;

}


@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
</style>