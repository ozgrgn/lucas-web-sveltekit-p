import { json } from '@sveltejs/kit';
import Model from './Model';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies }) => {
	await Model.Ping.findOneAndUpdate({ ping: 'ping' }, { ping: 'ping' }, { upsert: true });
	return json({
		status: true
	});
};
