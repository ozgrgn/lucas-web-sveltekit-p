import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { staffId } = params;

		if (!staffId) {
			throw new Error(
				JSON.stringify({
					en: `staffId field is required`,
					tr: `staffId alanı zorunlu`
				})
			);
		}

		if (requiredFieldsForPatch) {
			requiredFieldsForPatch.map((value) => {
				if (!data[value]) {
					throw new Error(
						JSON.stringify({
							en: `${value} field is required`,
							tr: `${value} alanı zorunlu`
						})
					);
				}
			});
		}

		let { lang, fullName, title, image, text, order, email, phone, whatsapp, perma } = data;

		const upsertedStaff = await Model.Staff.findByIdAndUpdate(
			staffId,
			{
				lang,
				fullName,
				title,
				image,
				text,
				order,
				email,
				phone,
				whatsapp,
				perma
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			staff: upsertedStaff
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ params }) => {
	try {
		let staff = await Model.Staff.findById(params?.staffId);

		return json({
			status: true,
			staff
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};

/** @type {import('./$types').RequestHandler} */
export const DELETE = async ({ params }) => {
	try {
		let staff = await Model.Staff.findByIdAndDelete(params?.staffId);

		return json({
			status: true,
			staff
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
