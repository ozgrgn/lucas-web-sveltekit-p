<script>
	import RestService from '$services/rest';
	export let images;
	export let name;
    console.log(name)
	let file = [];
	console.log(images, 'images');

	const downloadImage = async (fileUrl, i) => {
		let afile = await RestService.downloadImage(fileUrl, 'data:image/jpeg');

		file[i] = afile['file'];
		console.log(file);
	};
	images.map((imageUrl, i) => {
		downloadImage(imageUrl.image, i);
	});
</script>
<div class="pt-10 flex flex-col gap-5"> 
{#each images as image, i}
	<a href={file[i]} download={`${name}${i+1}.jpeg`}>
		<div class=" py-1">
			<img src={image.image} alt="" />
		</div></a
	>
{/each}
</div>