
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	if (!params.lang) {
		params.lang = "tr"
	}
	console.log(params,"params")
	return {
		lang: params.lang,
		property:params.property,
		project:params.project

	
	

	};
}



