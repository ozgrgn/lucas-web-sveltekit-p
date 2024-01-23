<script>
	import { onMount } from 'svelte';
	import RestService from '$services/rest';

	import { headerLight, lang, desktop,translate } from '$services/store';
	import BreadCrumbs from '$src/lib/components/BreadCrumbs.svelte';
	import HorizontalCard from '$src/lib/components/HorizontalCard.svelte/HorizontalCard.svelte';
	import VerticalCard from '$src/lib/components/VerticalCard/VerticalCard.svelte';
	import CardGroup from '$src/lib/components/VerticalCard/CardGroup.svelte';
	headerLight.set(false);

	let projects;

	const getProjects = async () => {
		let getProjectsResponse = await RestService.getProjects(undefined, undefined, true);
		if (getProjectsResponse['status']) {
			projects = getProjectsResponse['projects'];
			console.log(projects, 'projerfs');
		} else {
		}
	};

	onMount(() => {
		getProjects();
	});
</script>

<div class="bg-neutral h-full pt-5 md:pt-32 min-h-screen">
	<div class="container px-2 md-px-0 mx-auto mt-16 lg:px-20">
		{#if projects && projects[0]}
			<div class="">
				<CardGroup props={projects} project={true} />
			</div>
		
		{/if}
	</div>
</div>
