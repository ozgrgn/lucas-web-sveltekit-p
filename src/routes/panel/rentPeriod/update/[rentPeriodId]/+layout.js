/** @type {import('../../$types').PageLoad} */
export function load({ params }) {
	return {
		rentPeriodId: params.rentPeriodId
	};
}
