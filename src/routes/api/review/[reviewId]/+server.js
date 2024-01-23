import { json } from '@sveltejs/kit';
import Model from '../Model';

let requiredFieldsForPatch = [];
/** @type {import('./$types').RequestHandler} */
export const PATCH = async ({ request, params }) => {
	try {
		let data = await request.json();

		let { reviewId } = params;

		if (!reviewId) {
			throw new Error(
				JSON.stringify({
					en: `reviewId field is required`,
					tr: `reviewId alanı zorunlu`
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

		let {
			lang,
			reviewName,
			reviewDate,
			reviewLink,
			reviewPlatform,
			reviewText,
			reviewStars,
			reviewAvatar,
			order
		} = data;

		const upsertedReview = await Model.Review.findByIdAndUpdate(
			reviewId,
			{
				lang,
				reviewName,
				reviewDate,
				reviewLink,
				reviewPlatform,
				reviewText,
				reviewStars,
				reviewAvatar,
				order
			},
			{
				upsert: true,
				new: true
			}
		);

		return json({
			status: true,
			review: upsertedReview
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
		let review = await Model.Review.findById(params?.reviewId);

		return json({
			status: true,
			review
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
		let review = await Model.Review.findByIdAndDelete(params?.reviewId);

		return json({
			status: true,
			review
		});
	} catch (error) {
		return json({
			status: false,
			message: error.message
		});
	}
};
