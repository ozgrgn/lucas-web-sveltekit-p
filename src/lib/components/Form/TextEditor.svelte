<script>
	import Quill from 'quill';
	import { onMount } from 'svelte';
	import RestService from '$services/rest';

	export let incomingValue;
	export let value;
	export let placeholder;
	let editor;

	let toolbarOptions = [
		[{ header: 1 }, { header: 2 }, 'blockquote', 'link', 'image', 'video'],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ align: [] }],
		['clean']
	];

	onMount(() => {
		// console.log("on mount editorg");
		// Quill.register("modules/imageUploader", ImageUploader);
		// Quill.register("modules/imageResize", ImageResize);
		let quill = new Quill(editor, {
			modules: {
				toolbar: toolbarOptions
				// imageResize: {},
				// imageUploader: {
				//   upload: (file) => {
				//     return new Promise(async (resolve, reject) => {
				//       try {
				//         let uploadedImage = await RestService.uploadImage(file);

				//         resolve(uploadedImage["file"]);
				//       } catch (error) {
				//         ToastService.error("Görsel yükleme sorunu.");
				//         reject(error.message);
				//       }
				//     });
				//   },
				// },
			},
			theme: 'snow',
			placeholder
		});

		quill.on('text-change', function (delta, oldDelta, source) {
			value = editor?.childNodes[0]?.getInnerHTML();
		});
		if (incomingValue) {
			editor?.childNodes[0]?.setHTML(incomingValue);
		}
	});
</script>

<svelte:head>
	<link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
</svelte:head>

<div class="editor" style="min-height: 30rem;" bind:this={editor} />
