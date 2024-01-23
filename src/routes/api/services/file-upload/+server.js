import { json } from '@sveltejs/kit';
import CONFIG from '$src/env';
import { Storage } from '@google-cloud/storage';
let requiredFields = { POST: ['email', 'password'] };

const storage = new Storage({
	keyFilename: 'lucas-keyfile.json',
	projectId: CONFIG.GCP.PROJECT_ID
});

const bucket = storage.bucket(CONFIG.GCP.BUCKET_NAME);
/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request, cookies }) => {
	try {
		let data = await request.formData();
		let file = data.get('file');

		const blob = bucket.file(data.get('file').name);

		const blobStream = blob.createWriteStream();

		blobStream.on('error', (err) => {
			console.log(err, '----error blob');
			return json({ status: false, message: err.message });
		});

		let publicUrl = await new Promise(async (resolve) => {
			blobStream.on('finish', () => {
				resolve(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
			});

			blobStream.end(Buffer.from(await file.arrayBuffer()));
		});

		return json({ status: true, file: publicUrl });
	} catch (error) {
		console.log(error, 'eroror');
		return json({
			status: false,
			message: error.message
		});
	}
};
