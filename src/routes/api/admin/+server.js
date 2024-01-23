import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies }) => {
	try {
		return json({
			status: true
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
