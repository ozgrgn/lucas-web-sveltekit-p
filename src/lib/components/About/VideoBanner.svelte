<script>
	import { onMount } from 'svelte';




</script>

<section class="showcase" id="home">

		<div class="video-container">
			<video id="so_bgvideo_5df3a8b601042" loop autoplay playsinline muted >
				<source src="/assets/lucas.mp4" type="video/mp4">
			</video>
		</div>
	
	<div class="content content-end text-gray-300">
		<div class=" mt-[28rem] text-center">
		
		</div>
	</div>
</section>

<style>
	.showcase {
		height: 400px;
		position: relative;
	}
	/* TODO, Fallback background here */
	.video-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.video-container video {
		min-width: 100%;
		min-height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		object-fit: cover;
	}
	.video-container:after {
		content: '';
		z-index: 1;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		background: #00000031;
		position: absolute;
	}
	.content {
		box-shadow: inset 50vw 0 70px -7px rgba(0, 0, 0, 0.4);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		/* background-color: rgba(0, 0, 0, 0.5); */
	}
</style>
