/** @type {import('../../$types').PageLoad} */
export function load({ params }) {
	return {
		treatmentId: params.treatmentId
	};
}
