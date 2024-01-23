<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import { lang, general, translate, desktop } from '$services/store';

	import '@splidejs/svelte-splide/css';
	export let reviews;

	let perPage = 1;
	if ($desktop) {
		perPage = 1;
	}
</script>

<div class="container mx-auto w-full">
	
</div>
<!-- REVIEWS -->
<div class=" rounded-lg mx-5 md:mx-0 hidden-xs ">
	<div class="container">
		<div class="rounded-lg">
			<div class="testimonials">
				{#if reviews}
				<Splide
					aria-label="My Favorite Images"
					options={{
						arrows: false,
						type: 'loop',
						pagination: true,
						interval: 2500,
						perPage: perPage,
						autoplay: true,
						classes: {
							pagination: 'splide__pagination main-slider-pagination',
							page: 'splide__pagination__page main-slider-page'
						}
					}}
				>
				
						{#each reviews as review}
							<SplideSlide>
								<div
									class="review-container h-64 bg-white shadow shadow-2xl md:mx-10 md:mt-10 mb-10 md:mb-20 rounded-md"
								>
									<a class="review-header " rel="external" href={review?.reviewLink}>
										<div class="review-avatar">
											<div class="review-avatar-bg flex flex-col justify-center text-center ">
												{#if review?.reviewAvatar}
													<img
														src={review?.reviewAvatar}
														alt=""
														width="44"
														height="44"
														class="ReviewAvatar__Avatar-sc-1lraoly-2 TOyBs"
													/>
												{:else}
													<div class="font-semibold ">
														{review?.reviewName.charAt(0)}
													</div>
												{/if}
											</div>
										</div>
										<div class="review-info">
											<span class="review-author">{review?.reviewName}</span>
											<div class="review-info2">
												<div class="ratings">
													<div class="empty-stars" />
													<div
														class="full-stars-tp {review?.reviewPlatform == 'Google'
															? 'text-custom-gcolor'
															: review?.reviewPlatform == 'TrustPilot'
															? 'text-custom-tcolor'
															: review?.reviewPlatform == 'Facebook'
															? 'text-custom-fcolor'
															: ''} {review?.reviewStars == 1
															? 'w-1/5'
															: review?.reviewStars == 2
															? 'w-2/5'
															: review?.reviewStars == 3
															? 'w-3/5'
															: review?.reviewStars == 4
															? 'w-4/5'
															: 'w-full'}"
													/>
												</div>
												<div class="review-date hidden xl:block">
													{review?.reviewDate}
												</div>
											</div>
										</div></a
									>
									<div class="review-text">
										<div class="review-text-outer">
											<div class="review-text-inner">
												<div>
													{review?.reviewText}
												</div>
											</div>
										</div>
									</div>
									<a href={review?.reviewLink}>
										<div class="review-readmore">{$translate?.readMore}</div></a
									>
									<a
										class="review-link"
										href={review?.reviewLink}
										target="_blank"
										rel="noopener noreferrer nofollow"
										><div class="review-logo-container">
											<div class="review-postedon">{$translate?.postedOn}</div>
											<div title="Google" class="review-icon w-36">
												<div>
													{#if review?.reviewPlatform == 'Google'}
														<div class="flex justify-center items-center">
															<div class="h-10 flex items-center">
																<img
																	class="h-8"
																	src="/assets/img/reviews/{review?.reviewPlatform}.svg"
																	alt=""
																/>
															</div>
															<p>
																<span
																	class="tracking-widest text-black/80 font-bold h-6 text-md flex items-start"
																	>{$general?.googleRate}</span
																>
															</p>
														</div>
													{/if}
													{#if review?.reviewPlatform == 'TrustPilot'}
														<div class="flex justify-center items-start">
															<div class=" flex items-center h-8">
																<img
																	class="h-12"
																	src="/assets/img/reviews/{review?.reviewPlatform}.svg"
																	alt=""
																/>
															</div>
															<p>
																<span
																	class="tracking-widest text-black/80 font-bold text-md h-10 flex pl-2 items-start pt-[0.59rem]"
																	>{$general?.trustPilotRate}</span
																>
															</p>
														</div>
													{/if}
												</div>
											</div>
										</div></a
									>
								</div>
							</SplideSlide>
						{/each}
					
				</Splide>{/if}
			</div>
		</div>
	</div>
</div>

<style>
	/* REVIEWS */

	.review-container {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 18px;
	}
	.review-header {
		flex-wrap: nowrap !important;
		display: flex !important;
		position: static !important;
		color: inherit !important;
		max-width: 100% !important;
		text-decoration: none !important;
		border: none !important;
	}
	.review-avatar {
		flex: 0 0 auto;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		overflow: hidden;
	}
	.review-avatar-bg {
		width: 100%;
		height: 100%;
		transition: opacity 1s ease-out 0s;
		background-color: rgb(210, 210, 210);
		border-radius: 50%;
		overflow: hidden;
		opacity: 1;
	}
	.review-info {
		margin-left: 16px;
		display: flex;
		flex-direction: column;
		min-width: 0px;
	}
	.review-author {
		font-size: 14px;
		font-weight: 500;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: left;
		color: rgb(17, 17, 17);
	}
	.review-info2 {
		display: flex;
		flex-wrap: wrap;
		-webkit-box-align: center;
		align-items: center;
	}
	.ratings {
		position: relative;
		vertical-align: top;
		display: inline-block;
		color: #b1b1b1;
		overflow: hidden;
	}

	.full-stars-tp {
		position: absolute;
		left: 0;
		top: 0;
		white-space: nowrap;
		overflow: hidden;
	}
	.empty-stars:before,
	.full-stars-tp:before {
		content: '\2605\2605\2605\2605\2605';
		font-size: 12pt;
	}
	.empty-stars:before {
		-webkit-text-stroke: 1px #b1b1b1;
	}

	/* Webkit-text-stroke is not supported on firefox or IE */

	/* Firefox */
	@-moz-document url-prefix() {
		.full-stars {
			color: rgb(252, 191, 2) !important;
		}
	}
	.review-date {
		padding-left: 10px;
		overflow: hidden;
		min-width: 0px;
		font-weight: 400;
		font-size: 12px;
		line-height: 1.17;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: rgba(17, 17, 17, 0.5);
	}
	.review-text {
		font-weight: 400;
		margin-top: 8px;
		width: 100%;
		line-height: 1.3;
		color: rgb(17, 17, 17);
		font-size: 13px;
		text-align: left;
	}
	.review-text-outer {
		position: relative;
		overflow: hidden;
		height: 67px;
		width: 100%;
		line-height: 1.3;
		color: rgb(17, 17, 17);
		font-size: 13px;
		text-align: left;
	}
	.review-link {
		margin-top: 12px;
		display: block !important;
		position: static !important;
		color: inherit !important;
		max-width: 100% !important;
		text-decoration: none !important;
		border: none !important;
	}
	.review-postedon {
		color: rgba(17, 17, 17, 0.5);
		font-family: Montserrat;
		font-weight: 400;
		font-size: 13px;
	}
	.review-icon {
		font-size: 13px !important;
		flex: 0 1 0%;
	}
	.review-readmore {
		display: inline-block;
		cursor: pointer;
		font-size: 14px;
		color: rgba(17, 17, 17, 0.5);
	}

	:global(.testimonials .main-slider-page) {
		background-color: #f2f2f2 !important;
	}
	:global(.testimonials .main-slider-page.is-active) {
		background-color: #65bdc2 !important;
	}
</style>
