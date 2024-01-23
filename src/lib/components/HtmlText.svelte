<script>
	export let text;
</script>

<div class="text">
	{@html text}
</div>

<style>
	:global(.text) {
		color: rgb(0 0 0 / 0.8);
		-webkit-font-smoothing: antialiased;
	}
	:global(.text h1) {
		color:#ff6716 !important;
		line-height: 2rem;
		font-weight: 600;
		font-size: 1.8rem;
		padding-bottom: 0.5rem;

	}
	:global(.text h2) {
		color:#ff6716 !important;
		padding-top: 1rem;
		line-height: 2rem;
		font-weight: 600;
		font-size: 1.5rem;
		padding-bottom: 0.2rem;
	}
	:global(.text h3) {
		color:#ff6716 !important;
		padding-top: 1rem;
		line-height: 2rem;
		font-weight: 600;
		font-size: 1.3rem;
		padding-bottom: 0.5rem;
	}
	:global(.text p) {
		padding-top:0.2rem;
		line-height: 1.5rem;
		font-size: 0.875rem;
	}
	:global(.text ul) {
		list-style-position: inside;
		list-style-type: disc;
	}
	:global(.text a) {
		color:#ff6716 !important;
	}
	:global(.text p) {
		line-height: 1.5;
	}
</style>
