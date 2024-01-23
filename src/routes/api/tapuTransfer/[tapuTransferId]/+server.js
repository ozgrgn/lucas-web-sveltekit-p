import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { tapuTransferId } = params;

		if (!tapuTransferId) {
			throw new Error(
				JSON.stringify({
					en: `tapuTransferId field is required`,
					tr: `tapuTransferId alanı zorunlu`
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

		let { name, order, isActive } = data;

		const upsertedTapuTransfer = await Model.TapuTransfer.findByIdAndUpdate(
			tapuTransferId,
			{
				name, order, isActive
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			tapuTransfer: upsertedTapuTransfer
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
	console.log(params,"fdfs")
	try {
		let tapuTransfer = await Model.TapuTransfer.findById(params?.tapuTransferId);

		return json({
			status: true,
			tapuTransfer
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
		let tapuTransfer = await Model.TapuTransfer.findByIdAndDelete(params?.tapuTransferId);

		return json({
			status: true,
			tapuTransfer
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
