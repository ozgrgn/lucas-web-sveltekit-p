/** @type {import('../../$types').PageLoad} */
export function load({ params }) {
	return {
		kitchenId: params.kitchenId
	};
}
