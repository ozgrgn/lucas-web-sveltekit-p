import { redirect } from '@sveltejs/kit';
/** @type {import('./$types').LayoutServerLoad} */
export function load({ url, locals }) {
	if (
		url?.pathname &&
		url?.pathname.indexOf('panel') != -1 &&
		url?.pathname.indexOf('/login') == -1 &&
		!locals.user
	) {
		throw redirect(301, '/login');
	}

	return { user: locals.user };
}
