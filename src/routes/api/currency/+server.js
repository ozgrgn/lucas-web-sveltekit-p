import RestService from '$services/rest.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	try {
		let currencies = await RestService.getCurrency();

		return json({
			status: true,
			currencies
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
