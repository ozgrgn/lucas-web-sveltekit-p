/** @type {import('../../$types').PageLoad} */
export function load({ params }) {
	return {
		reviewId: params.reviewId
	};
}
