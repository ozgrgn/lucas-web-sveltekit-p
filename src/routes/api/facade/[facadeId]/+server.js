import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { facadeId } = params;

		if (!facadeId) {
			throw new Error(
				JSON.stringify({
					en: `facadeId field is required`,
					tr: `facadeId alanı zorunlu`
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

		const upsertedFacade = await Model.Facade.findByIdAndUpdate(
			facadeId,
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
			facade: upsertedFacade
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
		let facade = await Model.Facade.findById(params?.facadeId);

		return json({
			status: true,
			facade
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
		let facade = await Model.Facade.findByIdAndDelete(params?.facadeId);

		return json({
			status: true,
			facade
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
