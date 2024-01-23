<script>
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import RestService from '$services/rest';
	import { headerLight, lang } from '$services/store';
	import BreadCrumbs from '$src/lib/components/BreadCrumbs.svelte';
	import GenericButton from '$src/lib/components/Buttons/GenericButton.svelte';
	import CardGroup from '$src/lib/components/VerticalCard/CardGroup.svelte';
	import VerticalCard from '$src/lib/components/VerticalCard/VerticalCard.svelte';
	import Description from '$src/lib/components/Project/Description.svelte';
	import Features from '$src/lib/components/Project/Features.svelte';
	import Gallery from '$src/lib/components/Project/Gallery.svelte';
	import Overview from '$src/lib/components/Project/Overview.svelte';
	import ProjectSide from '$src/lib/components/Project/ProjectSide.svelte';
	import Video from '$src/lib/components/Project/Video.svelte';
	import VirtualTour from '$src/lib/components/Project/VirtualTour.svelte';
	import ProjectMap from '$src/lib/components/Project/ProjectMap.svelte';
	import Technical from '$src/lib/components/Project/Technical.svelte';
	import General from '$src/lib/components/Project/General.svelte';
	import Info from '$src/lib/components/Project/Info.svelte';
	export let data;
	let project;
	console.log("ıııı")
	const getProject = async (projectPerma) => {
		console.log("hooop")
		let getProjectResponse = await RestService.getUserProject(projectPerma);
		if (getProjectResponse && getProjectResponse['status']) {
			project = getProjectResponse['project'];
		} else {
			console.log(getProjectResponse.message);
		}
	};
	$: getProject(data.project);
	console.log(data, 'project');
	headerLight.set(false);
	let filteredProject;
</script>

<SvelteToast />

<div class="bg-neutral h-full p-4 pt-20 md:pt-28 z-20">
	<div class="container mx-auto lg:px-20 text-sm text-black/80 ">
		<BreadCrumbs
			prop={project}
			project={true}
		/>
		<div class="pt-2 md:pt-5 ">
			{#if project}
				<h1 class="text-lg md:text-2xl ">{project?.name ? project?.name[$lang] : ''}</h1>
			{/if}
		</div>
		<div class="">
		
		<div class="flex items-center justify-start gap-2 pt-2">
	

			<h4 class="text-sm md:text-lg font-light text-[#636363]  ">
				{project?.city?.name && project?.city?.name[$lang] ? project?.city?.name[$lang] : '-'}/{project?.state
					?.name && project?.state?.name[$lang]
					? project?.state?.name[$lang]
					: '-'}/{project?.district?.name && project?.district?.name[$lang]
					? project?.district?.name[$lang]
					: '-'}
			</h4>
		</div>
	</div>
</div>
	<div class="container mx-auto px-2 lg:px-20 mt-4">
		<div class="lg:flex gap-10">
			<div class="w-full lg:w-2/3 flex flex-col gap-10">
				<div id="gallery" class="">
					<Gallery prop={project} />
				</div>
				<div id="overview" class="">
					<Overview prop={project} {project} />
				</div>
				{#if project?.projectMap}
				<div id="map" class="">
					<ProjectMap prop={project} />
				</div>
				{/if}
				<div id="description" class="">
					<Description prop={project} />
				</div>
				<div id="info" class="">
					<Info prop={project} />
				</div>
				<div id="general" class="">
					<General prop={project} />
				</div>
				<div id="technical" class="">
					<Technical prop={project} />
				</div>
			
				{#if project?.videoLink}
					<div id="video" class="">
						<Video videoLink={project?.videoLink} />
					</div>
				{/if}
				{#if project?.virtualLink}
				<div id="virtual" class="">
					<VirtualTour virtualLink={project?.virtualLink} />
				</div>
				{/if}
				<div id="similar" class="">
					{#if filteredProject}
						{#each filteredProject as project}
							<VerticalCard />
						{/each}
					{/if}
				</div>
			</div>
			<div class="w-full mb-10 lg:w-1/3 bg-white z-20">
				<ProjectSide prop={project} />
			</div>
		</div>
	</div>
</div>
