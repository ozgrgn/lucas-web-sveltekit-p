/** @type {import('../../$types').PageLoad} */
export function load({ params }) {
	return {
		languageId: params.languageId
	};
}
