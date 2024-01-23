import { json } from '@sveltejs/kit';
import CONFIG from '$src/env';
import { Storage } from '@google-cloud/storage';
import axios from "axios";

let requiredFields = { POST: ['email', 'password'] };




  /** @type {import('./$types').RequestHandler} */
export const GET = async ({ request, cookies, url }) => {
	let fileUrl = url.searchParams.get('fileUrl') ?? undefined;
	let type = url.searchParams.get('type') ?? undefined;

	try {
		let image = await axios.get(
			fileUrl,
			{
			  responseType: "arraybuffer",
			}  );

		return  json({status:true,file:`${type};base64,${Buffer.from(image.data).toString("base64")}`})

	} catch (error) {
		console.log(error, 'eroror');
		return json({
			status: false,
			message: error.message
		});
	}
};
