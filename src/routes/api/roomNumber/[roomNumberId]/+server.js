import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { roomNumberId } = params;

		if (!roomNumberId) {
			throw new Error(
				JSON.stringify({
					en: `roomNumberId field is required`,
					tr: `roomNumberId alanı zorunlu`
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

		const upsertedRoomNumber = await Model.RoomNumber.findByIdAndUpdate(
			roomNumberId,
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
			roomNumber: upsertedRoomNumber
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
		let roomNumber = await Model.RoomNumber.findById(params?.roomNumberId);

		return json({
			status: true,
			roomNumber
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
		let roomNumber = await Model.RoomNumber.findByIdAndDelete(params?.roomNumberId);

		return json({
			status: true,
			roomNumber
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
