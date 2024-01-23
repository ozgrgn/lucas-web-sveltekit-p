import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { propStatusId } = params;

		if (!propStatusId) {
			throw new Error(
				JSON.stringify({
					en: `propStatusId field is required`,
					tr: `propStatusId alanı zorunlu`
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

		let { name, order, group, devir, isActive, propCat } = data;

		const upsertedPropStatus = await Model.PropStatus.findByIdAndUpdate(
			propStatusId,
			{
				name,
				order,
				group,
				devir,
				isActive,
				propCat
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			propStatus: upsertedPropStatus
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
	console.log(params, 'fdfs');
	try {
		let propStatus = await Model.PropStatus.findById(params?.propStatusId);

		return json({
			status: true,
			propStatus
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
		let propStatus = await Model.PropStatus.findByIdAndDelete(params?.propStatusId);

		return json({
			status: true,
			propStatus
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
