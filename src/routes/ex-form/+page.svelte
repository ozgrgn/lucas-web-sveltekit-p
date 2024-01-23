<script>
	import { enhance } from '$app/forms';
</script>

<form action="/api/services/file-upload" method="post" enctype="multipart/form-data" use:enhance>
	<input multiple type="file" name="file" id="file" accept="image/*" />
	<button type="submit">submit</button>
</form>
