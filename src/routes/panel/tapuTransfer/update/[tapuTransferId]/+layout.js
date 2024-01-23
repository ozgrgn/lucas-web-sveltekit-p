/** @type {import('../../$types').PageLoad} */
export function load({ params }) {
	return {
		tapuTransferId: params.tapuTransferId
	};
}
