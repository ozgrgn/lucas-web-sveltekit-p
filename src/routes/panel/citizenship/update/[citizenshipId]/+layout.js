/** @type {import('../../$types').PageLoad} */
export function load({ params }) {
	return {
		citizenshipId: params.citizenshipId
	};
}
